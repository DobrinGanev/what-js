#<a id="what-js" class="anchor" href="#what-js" aria-hidden="true"><span class="octicon octicon-link"></span></a>what-js</h1>

An event-driven JavaScript framework using Twitter's Flight JS, ArcGIS JavaScript API, JQuery, Node.js. Consists of application containers, modules, and extensions.
<p><img src="https://raw.githubusercontent.com/DobrinGanev/what-js/master/maphtml.png" alt="ScreenShot"></p>



<pre><code>"applications": [
            {
                "appConfig": {
                    "appId": "ef85f647-bdc4-4a49-b54b-313122a42d7e",
                    "name": "US Wells",
                    "appTile": "&lt;div id =\"ef85f647-bdc4-4a49-b54b-313122a42d7e\"  class=\"tile\"&gt;&lt;div class=\"tile-content image\"&gt;&lt;i class=\"fa fa-pencil-square-o\"&gt;&lt;/i&gt;&lt;/div&gt;&lt;/div&gt;",
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
</code></pre>
<h3>
<a id="how-it-works" class="anchor" href="#how-it-works" aria-hidden="true"><span class="octicon octicon-link"></span></a>How it Works</h3>

<p>Application configuration data is requested by the client.Configuration data consists of application containers (UI), location and path to modules. Each module can have multiple executable (JavaScript) client applications. Application modules and extensions are loaded and build on the client side. </p>

<p>All the JavaScript files are defined as dojo modules and loaded asynchronously with <b>require</b> module loader. FlightJS components are wrapped in dojo modules.</p>

<p>Module components have an unique Id defined in the database.They can call other modules and receive a response based on their unique Id.</p>

<h3>
<a id="example" class="anchor" href="#example" aria-hidden="true"><span class="octicon octicon-link"></span></a>Example</h3>

<p><img src="https://raw.githubusercontent.com/DobrinGanev/what-js/master/modules.png" alt="">
Where both Module.js files are the same.</p>
<h3>Id attributes of HTML elements</h3>
<p>
To guarantee the uniqueness of the id attribute of an HTML element, all id attributes are prefixed with module id.
</p>

<p>Example of template with prefixed module id.</p>

<pre><code>define(function () {
    'use strict'; 
    return {
        init: function (config) {
            var template = "&lt;div id=\"" + config.moduleId + "_selectToolBoxForm\" style=\"height: 70px; position: absolute; width: 250px; z-Index: 999;\"&gt;\n";
            template += "&lt;div class=\"compose-box modal\" style=\"display: block; width:240px;height:80px;\"&gt;\n";
            template += "&lt;div class=\"modal-header\"&gt;\n";
            template += "&lt;a id=\"" + config.moduleId + "_closeToolBoxForm\" class=\"close\" data-dismiss=\"modal\"&gt;×&lt;/a&gt;\n";
            template += "&lt;button id=\"" + config.moduleId + "_selectFeatureBtn\" type=\"button\" class=\"btn btn-success\"&gt;&lt;span class=\"fa fa-pencil-square-o fa-2x\"&gt;&lt;/span&gt;&lt;/button&gt;\n";
            template += "&lt;button id=\"" + config.moduleId + "_clearFeatureBtn\" type=\"button\" class=\"btn btn-danger\"&gt;&lt;span class=\"fa fa-eraser fa-2x\"&gt;&lt;/span&gt;&lt;/button&gt;\n";
            template += "&lt;/div&gt;";
            template += "&lt;/div&gt;";
            template += "&lt;/div&gt;";
            return template;
        }
    }
});
