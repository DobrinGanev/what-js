define(function (require) {
    'use strict';
    var mainEntry = '/component_ui/selectionTool.js';
    return {
        init: function (extension) {
            // load module Scripts
            var selectionToolPath = extension.extensionConfig.moduleHost + mainEntry;
            if ($('script[src*="' + selectionToolPath + '"]').length < 1) {
                require([selectionToolPath], function (selectionTool) {
                    selectionTool.init(extension);
                });
            }
        },
        moduleMain: function () {
            var mainLocation = 'Modules/selectionToolModule/main.js';
            return mainLocation;
        }
    }
});


