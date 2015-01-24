define(function () {
    'use strict';
    return {
        init: function (module) {
            
            // map may not be available when this module is initialized  
            var mapReceived = false;
            
            var addLayersDataComponent = flight.component(function () {
                var onMapRequestEvent = module.moduleConfig.moduleId + "_onMapRequested";
                this.addLayers = function (event, map) {
                    
                    event.stopPropagation();
                    require(["esri/layers/FeatureLayer", "dojo/parser"
                    ], function (FeatureLayer, parser) {
                        parser.parse();
                        $.each(module.moduleConfig.mapServices, function (key, mapService) {
                            var featureLayer = new FeatureLayer(mapService.url,
                           {
                                mode: FeatureLayer.MODE_ONDEMAND,
                                outFields: ["*"],
                                id: mapService.id,
                                opacity: 0.6
                            });
                            console.log(mapService.url);
                            map.addLayer(featureLayer);
                        });
                    });
                };
                
                var addLayers = this.addLayers;
                this.onMapReceived = function (event, map) {
                    mapReceived = true;
                    addLayers(event, map);
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
            addLayersDataComponent.attachTo(document);
        }
    }
});