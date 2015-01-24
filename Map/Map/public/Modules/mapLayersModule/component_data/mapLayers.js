define(function () {
    'use strict';
    return {
        init: function (module) {
            
            // map may not be available when this module is initialized  
            var mapReceived = false;
            
            var mapLayersDataComponent = flight.component(function () {

                var onMapRequestEvent = module.moduleConfig.moduleId + "_onMapRequested";
                var checkBoxLayerClass = module.moduleConfig.moduleId + "_layersCheckBoxes";
                var layerArray = [];
                this.loadLayers = function (event, map) {
                    
                    event.stopPropagation();
                    require(["esri/layers/FeatureLayer", "dojo/parser"
                    ], function (FeatureLayer, parser) {
                        parser.parse();
                        
                        initLayerArray();
                        function initLayerArray() {
                            layerArray = [];
                            for (var dataIndex = 0; dataIndex < map.graphicsLayerIds.length; dataIndex++) {
                                map.getLayer(map.graphicsLayerIds[dataIndex]).show();
                                layerArray[dataIndex] = {
                                    featureLayer: map.getLayer(map.graphicsLayerIds[dataIndex]),
                                    layerUrl: map.getLayer(map.graphicsLayerIds[dataIndex]).url,
                                    layerId: map.graphicsLayerIds[dataIndex]
                                };
                                var layerInfo = '<div  class=\"checkbox\" ><label><input id="' + map.graphicsLayerIds[dataIndex] + '" class="' + checkBoxLayerClass + '" checked="checked" type=\"checkbox\" value=\"\">' + map.graphicsLayerIds[dataIndex] + '<\/label><\/div>';
                                
                                $("#mapLayers").append(layerInfo);
                            }
                            console.log("layers in the map:" + layerArray.length);
                        }
                        $('#mapLayersAccordion').collapse('show');
                      
                    });
                    
                    $('.' + checkBoxLayerClass).change(function (e) {
                        e.preventDefault();
                        var item = $(this);
                        var layerId = item.attr("id");
                        if ($('#' + layerId).is(':checked')) {
                            map.getLayer(layerId).show();
                        } else {
                            map.getLayer(layerId).hide();
                        }
                    });
                };
                
                $("#refreshMapLayers").on("click", function () {
                    $("#mapLayers").empty();
                    currentNode.trigger('onMapRequested', onMapRequestEvent);
                });
                
                var loadLayers = this.loadLayers;
                this.onMapReceived = function (event, map) {
                    mapReceived = true;
                    loadLayers(event, map);
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
                        currentNode.trigger('onMapRequested', onMapRequestEvent);
                    }
                    return mapReceived;
                }
                
                var currentNode;
                // initialize
                var onMapReceived = this.onMapReceived;
                this.after('initialize', function () {
                    currentNode = $(this.$node);
                    this.on(document, onMapRequestEvent, onMapReceived);
                    
                    waitfor(isMapLoaded, true, _TIMEOUT, 0, 'map initilized', function () {
                        console.log("map loaded");
                    });
                 
                });
            });
            mapLayersDataComponent.attachTo(document);
        }
    }
});