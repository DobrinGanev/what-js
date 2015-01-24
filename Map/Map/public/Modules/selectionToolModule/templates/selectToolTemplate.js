define(function () {
    'use strict';
    return {
        init: function (config) {
            var template = "<div id=\"" + config.moduleId + "_selectToolBoxForm\" style=\"height: 70px; position: absolute; width: 250px; z-Index: 999;\">\n";
            template += "<div class=\"compose-box modal\" style=\"display: block; width:240px;height:80px;\">\n";
            template += "<div class=\"modal-header\">\n";
            template += "<a id=\"" + config.moduleId + "_closeToolBoxForm\" class=\"close\" data-dismiss=\"modal\">×</a>\n";
            template += "<button id=\"" + config.moduleId + "_selectFeatureBtn\" type=\"button\" class=\"btn btn-success\"><span class=\"fa fa-pencil-square-o fa-2x\"></span></button>\n";
            template += "<button id=\"" + config.moduleId + "_clearFeatureBtn\" type=\"button\" class=\"btn btn-danger\"><span class=\"fa fa-eraser fa-2x\"></span></button>\n";
            template += "</div>";
            template += "</div>";
            template += "</div>";
            return template;
        }
    }
});
