define(function (require) {
    'use strict';
    return {
        init: function (module) {
            // load module Scripts
            var mapLayersModulePath = module.moduleConfig.moduleHost + '/component_data/mapLayers.js';
                require([mapLayersModulePath], function (mapLayers) {
                mapLayers.init(module);
                });
        },
        moduleMain: function () {
            var mainLocation = 'Modules/mapLayersModule/main.js';
            return mainLocation;
        }
    }
});


