# what-js
```
An event-driven JavaScript framework using Twitter's Flight JS, ArcGIS JavaScript API, JQuery and Node.js
Consists of application containers, modules, and extensions. 
``` 
![ScreenShot](https://github.com/DobrinGanev/what-js/blob/master/maphtml.png)

```
 "applications": [
                {
                    "appConfig": {
                        "appId": "ef85f647-bdc4-4a49-b54b-313122a42d7e",
                        "name": "US Wells",
                        "appTile": "<div id =\"ef85f647-bdc4-4a49-b54b-313122a42d7e\"  class=\"tile\"><div class=\"tile-content image\"><i class=\"fa fa-pencil-square-o\"></i></div></div>",
                        "appParentContainer": "#appContainer"
                    },
                    "modules": [
                        {
                            "moduleConfig": {
                                "name": "US Wells Map Services",
                                "moduleId": "3ddffc34-a540-4e47-8727-50edaecbd230",
                                "moduleHost": "http://localhost:1337/Modules/mapModule/",
                                "moduleLocation": "http://localhost:1337/Modules/mapModule/main.js",
                                "moduleMainPath": "Modules/mapModule/main.js",
                                "mapServices": [
                                    {
                                        "id": "US_Wells",
                                        "url": "http://examplemapservice/0"
                                    }],
                                "extensions": [
                                    {
                                        "extensionConfig": {
                                            "name": "Selection Tool Extension",
                                            "moduleId": "f4dcf5a7-12ef-428c-889c-685d294c52f0",
                                            "moduleHost": "http://localhost:1337/Modules/selectionToolModule/",
                                            "moduleLocation": "http://localhost:1337/Modules/selectionToolModule/main.js",
                                            "moduleMainPath": "Modules/selectionToolModule/main.js"
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
 
How it Works
1.Application configuration data is requested by the client.
 Configuration data consists of application containers (UI), location and path to modules.    
 Each module can have multiple executable (JavaScript) client applications.
2. Application modules and extensions are downloaded and build on the client.  

All the JavaScript files are defined as dojo modules and loaded asynchronously with require(). 
FlightJS components are wrapped in dojo modules.

All module components have and unique Id defined in the database. 
They can call other modules and receive a response based on their unique ID.

Example
(3ddffc34-a540-4e47-8727-50edaecbd230)Module.js <---->SomeBaseModule.js<----->Module.js(7601e658-1e8f-4db2-a81e-fee7af32448b)
Where both Module.js files are the same.
To guarantee the uniqueness of the id attribute of an HTML element, all id attributes are prefixed with module id.

Example of template
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

