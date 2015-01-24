jQuery(function ($) {
    'use strict';
    var pathRx = new RegExp(/\/[^\/]+$/), locationPath = location.pathname.replace(pathRx, '');
    
    require({
        async: true,
        aliases: [['text', 'dojo/text']],
        packages: [{
                name: 'js',
                location: locationPath + '/js'
            }, {
                name: 'component_data',
                location: locationPath + '/js/component_data'
            }, {
                name: 'component_ui',
                location: locationPath + '/js/component_ui'
            }]
    });
    
    var mapComponent = flight.component(function () {
        var map;
        this.onMapClick = function (event) {
            event.stopPropagation();
            var data = "onMapClick fired";
            $(this.$node).trigger('log', data);
        };
        
        this.onMapRequested = function (event, eventNameRequester) {
            event.stopPropagation();
            var data = map;
            $(this.$node).trigger(eventNameRequester, data);
        };
        
        // initialize
        var onMapClick = this.onMapClick;
        var onMapRequested = this.onMapRequested;
        this.after('initialize', function () {
            
            this.on('click', onMapClick);
            this.on(document, 'onMapRequested', onMapRequested);
            
            require(["esri/map", "dojo/domReady!", "js/component_data/log.js"],

                function (Map) {
                map = new Map("map", {
                    center: [0.0, 0.0],
                    zoom: 3,
                    basemap: "topo",
                    sliderPosition: "bottom-right",
                });
            });
        });
    });
    mapComponent.attachTo('#map');
});
