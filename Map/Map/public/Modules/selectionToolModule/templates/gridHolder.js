define(function () {
    'use strict';
    return {
        init: function (appId) {
            var grid = appId + "_grid";
            var gridPanel = appId + "_gridPanel";
            var strVar = "<div id=" + gridPanel + " style='width:100%;height: 320px;position: fixed; bottom: 0; right:1px; background-color: white;border: none;visibility: hidden;  '>";
            strVar += "<div id=" + grid + " style=\"height: 320px\"><\/div>";
            strVar += "<\/div>";
            return strVar;
        }
    }
});
