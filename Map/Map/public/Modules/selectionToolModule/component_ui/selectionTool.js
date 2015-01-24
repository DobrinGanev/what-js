define(function () {
    'use strict';
    return {
        init: function (extension) {
            
            // map may not be available when this module is initialized  
            var mapReceived = false;
            
            var selectToolId = '#' + extension.extensionConfig.moduleId + "_selectToolBoxForm";
            var eventName = extension.extensionConfig.moduleId + "_onSelectionToolMapRequested";
            var selectFeatureBtnId = '#' + extension.extensionConfig.moduleId + "_selectFeatureBtn";
            var clearFeatureBtn = '#' + extension.extensionConfig.moduleId + "_clearFeatureBtn";
            var closeToolBoxFormButtonId = '#' + extension.extensionConfig.moduleId + "_closeToolBoxForm";
            var gridId = '#' + extension.extensionConfig.moduleId + "_gridPanel";
            var onGridInitilized = extension.extensionConfig.moduleId + '_onGridInitilized';
            
            var template = extension.extensionConfig.moduleHost + '/templates/selectToolTemplate.js';
            var jsGridTemplate = extension.extensionConfig.moduleHost + '/templates/gridHolder.js';
            require([template, jsGridTemplate, "dojo/domReady"],
                  function (templateDiv, gridTemplate, domReady) {
                domReady(function () {
                    var selectToolTemplate = templateDiv.init(extension.extensionConfig);
                    var gridTemplateHolder = gridTemplate.init(extension.extensionConfig.moduleId);
                    
                    $("body").append(selectToolTemplate);
                    $("body").append(gridTemplateHolder);
                    var docWidth = $(document).width();
                    var componentLeft = docWidth - 275;
                    $(selectToolId).show();
                    $(selectToolId).draggable();
                    $(selectToolId).css({
                        'top': '-200px',
                        'left': '-200px',
                    }).delay(1).animate({
                            'opacity': '1',
                            'top': '1%',
                            'left': componentLeft + "px"
                        }, 700);

                    //define component
                    var selectToolBoxFormComponent = flight.component(function () {
                        var dataView;
                        var grid;
                        var selectionToolbar;
                        var featureLayer;
                        this.onMapReceived = function (event, map) {
                            mapReceived = true;
                            event.stopPropagation();
                            map.sliderPosition = "top-right";
                            require(['dojo/ready', 'js/jquery.event.drag-2.2.js', 'js/slick.core.js',
                                  'js/slick.dataview.js', 'js/slick.rowselectionmodel.js'], function (ready) {
                                ready(function () {
                                    require([
                                        "esri/InfoTemplate",
                                        "esri/layers/FeatureLayer",
                                        "esri/symbols/SimpleFillSymbol",
                                        "esri/symbols/SimpleLineSymbol",
                                        "esri/tasks/query",
                                        "esri/tasks/QueryTask",
                                        "esri/toolbars/draw",
                                        "dojo/dom",
                                        "dojo/on",
                                        "dojo/_base/connect",
                                        "dojo/parser",
                                        "dojo/_base/array",
                                        "esri/Color",
                                        "esri/urlUtils", "esri/graphicsUtils", "esri/request", "dojo/_base/json", "dojo/_base/array", "dojo/string",
                                        'js/slick.grid.js', "dojo/domReady!"
                                    ], function (InfoTemplate, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol,
                                        Query, QueryTask, Draw, dom, on, connect, parser, arrayUtil, Color, urlUtils, graphicsUtils, esriRequest, dojoJson, array, dojoString) {
                                        parser.parse();
                                        var selectedIndexLayer;
                                        var featureLayerQuery;
                                        initSelectToolbar();
                                        var chunksCount;
                                        var infoTemplate;
                                        var layerArray = [];
                                        var data = [];
                                        var columns = [];
                                        var dataIndex;
                                        var loadingIndicator = null;
                                        
                                        function initLayerArray() {
                                            layerArray = [];
                                            for (dataIndex = 0; dataIndex < map.graphicsLayerIds.length; dataIndex++) {
                                                map.getLayer(map.graphicsLayerIds[dataIndex]).show();
                                                layerArray[dataIndex] = {
                                                    featureLayer: map.getLayer(map.graphicsLayerIds[dataIndex]),
                                                    layerUrl: map.getLayer(map.graphicsLayerIds[dataIndex]).url,
                                                    layerId: map.graphicsLayerIds[dataIndex]
                                                };
                                            }
                                            console.log("layers in the map:" + layerArray.length);
                                        }
                                        
                                        function getContent(url) {
                                            
                                            //get the url and setup a proxy 
                                            var requestHandle = esriRequest({
                                                "url": url,
                                                "content": {
                                                    "f": "json"
                                                },
                                                "callbackParamName": "callback"
                                            });
                                            requestHandle.then(requestSucceeded);
                                        }
                                        
                                        function formatter(row, cell, value) {
                                            return value;
                                        }
                                        
                                        function requestSucceeded(response) {
                                            columns = [];
                                            dojoJson.toJsonIndentStr = "  ";
                                            //show field names and aliases
                                            if (response.hasOwnProperty("fields")) {
                                                array.map(response.fields, function (f) {
                                                    var col = { id: f.name, name: f.name, field: f.name, minWidth: 50, width: 194, maxWidth: 194, cssClass: "cell-title", formatter: formatter };
                                                    columns.push(col);
                                                });
                                                // set info template of the layer
                                                infoTemplate = new InfoTemplate(layerArray[selectedIndexLayer].layerId, "${*}");
                                                layerArray[selectedIndexLayer].featureLayer.infoTemplate = infoTemplate;
                                                initGrid();
                                            }
                                        }
                                        
                                        function initGrid() {
                                            var options = {
                                                editable: true,
                                                enableAddRow: true,
                                                enableCellNavigation: true,
                                                asyncEditorLoading: true,
                                                topPanelHeight: 50,
                                                headerRowHeight: 40,
                                                explicitInitialization: true,
                                                showHeaderRow: true,
                                                enableColumnReorder: false,
                                            };
                                            
                                            dataView = new Slick.Data.DataView();
                                            grid = new Slick.Grid(gridId, dataView, columns, options);
                                            $(gridId).css("visibility", "visible");
                                            dataView.onRowCountChanged.subscribe(function (e, args) {
                                                grid.updateRowCount();
                                                grid.render();
                                            });
                                            dataView.onRowsChanged.subscribe(function (e, args) {
                                                grid.invalidateRows(args.rows);
                                                grid.render();
                                            });
                                            
                                            $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
                                                var columnId = $(this).data("columnId");
                                                if (columnId != null) {
                                                    columnFilters[columnId] = $.trim($(this).val());
                                                    dataView.refresh();
                                                }
                                            });
                                            
                                            grid.onHeaderRowCellRendered.subscribe(function (e, args) {
                                                $(args.node).empty();
                                                $("<input type='text'>")
                                                    .data("columnId", args.column.id)
                                                    .val(columnFilters[args.column.id])
                                                    .appendTo(args.node);
                                            });
                                            
                                            grid.onClick.subscribe(function (e, args) {
                                                var row_values = dataView.getItem(args.row);
                                                zoomRow(row_values.OBJECTID);
                                            });
                                            grid.init();
                                            $(document).trigger(onGridInitilized);
                                        }
                                        
                                        $(selectFeatureBtnId).on("click", function () {
                                            selectionToolbar.activate(Draw.EXTENT);
                                            initLayerArray();
                                        });
                                        
                                        $(clearFeatureBtn).on("click", function () {
                                            data = [];
                                            dataView.setItems(data);
                                            grid.render();
                                            map.infoWindow.hide();
                                        });
                                        
                                        $(closeToolBoxFormButtonId).on("click", function () {
                                            data = [];
                                            $(gridId).css("visibility", "hidden");
                                        });
                                        
                                        $(document).on(onGridInitilized, function (e) {
                                            map.infoWindow.hide();
                                            loadingIndicator.hide();
                                            dataView.beginUpdate();
                                            dataView.setItems(data, "OBJECTID");
                                            dataView.setFilter(filter);
                                            dataView.endUpdate();
                                        });
                                        
                                        function initSelectToolbar() {
                                            selectionToolbar = new Draw(map);
                                            on(selectionToolbar, "DrawEnd", function (geometry) {
                                                var selectQuery = new Query();
                                                $('#mapSelectionAccordion').collapse('show');
                                                $('#appAccordion').collapse('hide');
                                                $("#mapSelection").empty();
                                                selectionToolbar.deactivate();
                                                selectQuery.geometry = geometry;
                                                featureLayerQuery = selectQuery;
                                                console.log(featureLayerQuery);
                                                
                                                syncLoop(layerArray.length, function (loop) {
                                                    var i = loop.iteration();
                                                    var queryTask = new QueryTask(layerArray[i].layerUrl);
                                                    queryTask.executeForIds(featureLayerQuery, function (results) {
                                                        
                                                        var res = "<a id=" + layerArray[i].layerId + " style='cursor: pointer;'>" + layerArray[i].layerId + "     " + results.length + "</a>";
                                                        $("#mapSelection").append(res);
                                                        $("#mapSelection").append("</br>");
                                                        
                                                        var id = '#' + layerArray[i].layerId;
                                                        $(id).click(function (e) {
                                                            
                                                            if (!loadingIndicator) {
                                                                loadingIndicator = $("<span class='loading-indicator'><label>Loading...</label></span>").appendTo(document.body);
                                                                var $g = $(gridId);
                                                                
                                                                loadingIndicator.css("position", "absolute")
                                                                    .css("top", $g.position().top + $g.height() / 2 - loadingIndicator.height() / 2)
                                                                    .css("left", $g.position().left + $g.width() / 2 - loadingIndicator.width() / 2);
                                                            }
                                                            
                                                            loadingIndicator.show();
                                                            if (e.target.id == layerArray[i].layerId) {
                                                                selectedIndexLayer = i;
                                                                loadFeatures(results.length, featureLayerQuery, results, layerArray[i], queryTask);
                                                            }
                                                        });
                                                    });
                                                    loop.next();

                                                }, function () {
                                                    console.log('done');
                                                });
                                            });
                                        }
                                        
                                        function syncLoop(iterations, process, exit) {
                                            var index = 0;
                                            var done = false;
                                            var shouldExit = false;
                                            var loop = {
                                                next: function () {
                                                    if (done) {
                                                        if (shouldExit && exit) {
                                                            return exit(); // Exit if we're done
                                                        }
                                                    }
                                                    // If we're not finished
                                                    if (index < iterations) {
                                                        index++; // Increment our index
                                                        process(loop); // Run our process, pass in the loop
                                                    // Otherwise we're done
                                                    } else {
                                                        done = true; // Make sure we say we're done
                                                        if (exit) exit(); // Call the callback on exit
                                                    }
                                                },  
                                                iteration: function () {
                                                    return index - 1; // Return the loop number we're on
                                                },
                                                breakLoop : function (end) {
                                                    done = true; // End the loop
                                                    shouldExit = end; // Passing end as true means we still call the exit callback
                                                }
                                            };
                                            loop.next();
                                            return loop;
                                        }
                                        
                                        function loadFeatures(totalRecords, geometrySelection, results, layer, queryTask) {
                                            var temparray;
                                            chunksCount = 0;
                                            var fullQueries = [];
                                            var i, j, chunk = 1000;
                                            for (i = 0, j = results.length; i < j; i += chunk) {
                                                temparray = results.slice(i, i + chunk);
                                                
                                                var q = {
                                                    where: "OBJECTID >= " + temparray[0] + " AND OBJECTID <= " + temparray[temparray.length - 1] + ""
                                                };
                                                fullQueries.push(q);
                                            }
                                            data = [];
                                            
                                            for (var v = 0; v < fullQueries.length; v++) {
                                                results = [];
                                                
                                                console.log(results.length);
                                                geometrySelection.where = fullQueries[v].where;
                                                geometrySelection.outFields = ["*"];
                                                queryTask.execute(geometrySelection, function (r) {
                                                    for (var feat = 0; feat < r.features.length; feat++) {
                                                        data.push(r.features[feat].attributes);
                                                        if (totalRecords == data.length) {
                                                            getContent(layer.layerUrl);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                        
                                        var columnFilters = {};
                                        function filter(item) {
                                            for (var columnId in columnFilters) {
                                                if (columnId !== 'undefined' && columnFilters[columnId] !== "") {
                                                    var c = grid.getColumns()[grid.getColumnIndex(columnId)];
                                                    if (item[c.field] != columnFilters[columnId]) {
                                                        return false;
                                                    }
                                                }
                                            }
                                            return true;
                                        }
                                        
                                        window.onpopstate = function (e) {
                                            var OBJECTID = getObjectidFromUrl(document.location.href);
                                            if (OBJECTID) {
                                                zoomRow(OBJECTID);
                                            } else {
                                                featureLayer.clearSelection();
                                                map.infoWindow.hide();
                                            }
                                        };
                                        
                                        //extract the object id from the url
                                        function getObjectidFromUrl(url) {
                                            var urlObject = urlUtils.urlToObject(url);
                                            if (urlObject.query && urlObject.query.OBJECTID) {
                                                return urlObject.query.OBJECTID;
                                            } else {
                                                return null;
                                            }
                                        }
                                        
                                        function zoomRow(id) {
                                            if (typeof history.pushState !== "undefined") {
                                                window.history.pushState(null, null, "?OBJECTID=" + id);
                                            }
                                            var queryToNew = new esri.tasks.Query();
                                            queryToNew.objectIds = [id];
                                            layerArray[selectedIndexLayer].featureLayer.selectFeatures(queryToNew, window.esri.layers.FeatureLayer.SELECTION_NEW, function (selection) {
                                                var center = graphicsUtils.graphicsExtent(selection).getCenter();
                                                var extHandler = map.on("extent-change", function () {
                                                    extHandler.remove();
                                                    //zoom to the center then display the popup 
                                                    map.infoWindow.setFeatures(selection);
                                                    map.infoWindow.show(center);
                                                });
                                                map.centerAt(center);
                                            });
                                        }
                                    });
                                });
                            });
                        };
                        function waitfor(loaded, expectedValue, msec, count, source, callback) {
                            // Check if condition met. If not, re-check later (msec).
                            while (loaded() !== expectedValue) {
                                count++;
                                setTimeout(function () {
                                    waitfor(loaded, expectedValue, msec, count, source, callback);
                                }, msec);
                                return;
                            }
                            // Condition finally met. callback() can be executed.
                            console.log(source + ': ' + loaded() + ', expected: ' + expectedValue + ', ' + count + ' loops.');
                            callback();
                        }
                        
                        var _TIMEOUT = 1000; // waitfor test rate [msec]
                        function isMapLoaded() {
                            if (!mapReceived) {
                                currentNode.trigger('onMapRequested', eventName);
                            }
                            return mapReceived;
                        }
                        var currentNode;

                        // initialize
                        var onMapReceived = this.onMapReceived;
                        this.after('initialize', function () {
                            this.on(document, eventName, onMapReceived);
                            currentNode = $(this.$node);
                            // request the map untill is received
                            waitfor(isMapLoaded, true, _TIMEOUT, 0, 'map initilized', function () {
                                console.log("map loaded");
                            });
                        });
                    });
                    //attach component to div
                    selectToolBoxFormComponent.attachTo(selectToolId);
                });
            });
        }
    }
});