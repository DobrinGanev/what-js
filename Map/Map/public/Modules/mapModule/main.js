define(function (require) {
    'use strict';
    return {
        init: function (module) {
            // load module Scripts
            var mapModulePath = module.moduleConfig.moduleHost + '/component_data/map.js';
            require([mapModulePath], function (mapModule) {
                mapModule.init(module);
            });
        },
        moduleMain: function () {
            var mainLocation = 'Modules/mapModule/main.js';
            return mainLocation;
        }
    }
});


