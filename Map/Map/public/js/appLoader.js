define(function () {
    'use strict';
    var appLoaderComponent = flight.component(function () {
        
        this.after('initialize', function () {
            
            var db = 'http://localhost:1337/db/users.js';
            
            require([db], function (apps) {
                var data = apps;
                
                //append all applications ui to their container only the first user(data[0])
                for (var index = 0; index < data[0].applications.length; index++) {
                    var application = data[0].applications[index];
                    var appContainer = data[0].applications[index].appConfig.appParentContainer;
                    $(appContainer).append(application.appConfig.appTile);
                }
                
                var colors = ['bg-violet', 'bg-steel', 'bg-darkRed', 'bg-lightBlue', 'bg-darkOrange', 'bg-blue', 'bg-green'];
                // animation when appending tiles
                $('.tile').each(function (i) {
                    var time = 200 + (100 * i);
                    var color = Math.floor((Math.random() * 7));
                    $(this).css({
                        'top': '-200px',
                        'left': '-200px',
                    }).delay(time).animate({
                            'opacity': '1',
                            'top': '0',
                            'left': '0'
                        }, 700).addClass(colors[color]);
                });
                
                // when click on application's ui load all  modules
                $(".tile").click(function (e) {
                    e.preventDefault();
                    var item = $(this);
                    var id = item.attr("id");
                    if ($(this).hasClass("selected") == false) {
                        
                        for (var app = 0; app < data[0].applications.length; app++) {
                            if (id == data[0].applications[app].appConfig.appId) {
                                loadModules(data[0].applications[app]);
                                break;
                            }
                        }
                        $(this).addClass("selected");
                    }
                    
                    function loadModules(selectedApp) {
                        // load all modules for this application
                        for (var module = 0; module < selectedApp.modules.length; module++) {
                            var moduleConfig = selectedApp.modules[module].moduleConfig;
                            
                            // request the module
                            require([moduleConfig.moduleLocation], function (selectedModule) {
                                var path = selectedModule.moduleMain();
                                initModule(path, selectedApp.modules, selectedModule);
                            });
                        }
                        // initilize module based on mapped config
                        function initModule(path, modules, selectedModule) {
                            for (var i = 0; i < modules.length; i++) {
                                if (path == modules[i].moduleConfig.moduleMainPath) {
                                    selectedModule.init(modules[i]);
                                    loadModuleExtensions(modules[i]);
                                    break;
                                }
                            }
                        }
                    }
                    function loadModuleExtensions(selectedModule) {
                        //check if module have any extensions 
                        if (typeof selectedModule.moduleConfig.extensions === 'undefined') {
                            return;
                        }                        ;
                        // load all modules for this application
                        for (var extension = 0; extension < selectedModule.moduleConfig.extensions.length; extension++) {
                            var extensionConfig = selectedModule.moduleConfig.extensions[extension].extensionConfig;
                            
                            // request the module
                            require([extensionConfig.moduleLocation], function (selectedExtension) {
                                var path = selectedExtension.moduleMain();
                                initModule(path, selectedModule.moduleConfig.extensions, selectedExtension);
                            });
                        }
                        // mapp the module and initlize it
                        function initModule(path, extensions, selectedExtension) {
                            for (var i = 0; i < extensions.length; i++) {
                                if (path == extensions[i].extensionConfig.moduleMainPath) {
                                    selectedExtension.init(extensions[i]);
                                    break;
                                }
                            }
                        }
                    }
                });
            });
        });
    });
    appLoaderComponent.attachTo(document);
});

