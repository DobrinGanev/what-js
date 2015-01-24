'use strict';
define(function () {
    var users = [
        {
            "user": {
                "userName": "Dobrin Ganev"
            },
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
                                        "url": "http://maps2.petroweb.com/MAPS2ArcGISServer/rest/services/US_Wells/MapServer/0"
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
                }, {
                    "appConfig": {
                        "appId": "6e7946ce-2100-42d6-b731-ef41a27f0661",
                        "name": "Colorado Layers",
                        "appTile": "<div id =\"6e7946ce-2100-42d6-b731-ef41a27f0661\"  class=\"tile\"><div class=\"tile-content image\"><i class=\"fa fa-bullseye\"></i></div></div>",
                        "appParentContainer": "#appContainer"
                    },
                    "modules": [
                        {
                            "moduleConfig": {
                                "name": "Colorado Feature Service",
                                "moduleId": "7601e658-1e8f-4db2-a81e-fee7af32448b",
                                "moduleHost": "http://localhost:1337/Modules/mapModule/",
                                "moduleLocation": "http://localhost:1337/Modules/mapModule/main.js",
                                "moduleMainPath": "Modules/mapModule/main.js",
                                "mapServices": [
                                    {
                                        "id": "coloradoFeatureService_0",
                                        "url": "http://maps2.petroweb.com/MAPS2ArcGISServer/rest/services/coloradoFeatureService/FeatureServer/0"
                                    }, {
                                        "id": "coloradoFeatureService_1",
                                        "url": "http://maps2.petroweb.com/MAPS2ArcGISServer/rest/services/coloradoFeatureService/FeatureServer/1"
                                    }, {
                                        "id": "coloradoFeatureService_2",
                                        "url": "http://maps2.petroweb.com/MAPS2ArcGISServer/rest/services/coloradoFeatureService/FeatureServer/2"
                                    }]
                            }
                        }
                    ]
                }, {
                    "appConfig": {
                        "appId": "f7bb659d-0bd5-4b75-bce8-8752becac32b",
                        "name": "Census Block Points",
                        "appTile": "<div id =\"f7bb659d-0bd5-4b75-bce8-8752becac32b\"  class=\"tile\"><div class=\"tile-content image\"><i class=\"fa fa-globe\"></i></div></div>",
                        "appParentContainer": "#appContainer"
                    },
                    "modules": [
                        {
                            "moduleConfig": {
                                "name": "Census Block Points",
                                "moduleId": "b754f929-1b86-4cb4-9aa7-dd3f6b6544c3",
                                "moduleHost": "http://localhost:1337/Modules/mapModule/",
                                "moduleLocation": "http://localhost:1337/Modules/mapModule/main.js",
                                "moduleMainPath": "Modules/mapModule/main.js",
                                "mapServices": [
                                    {
                                        "id": "STATE_FIPS",
                                        "url": "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/0"
                                    },
                                    {
                                        "id": "BLKGRP",
                                        "url": "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/1"
                                    }]
                            }
                        }
                    ]
                }, {
                    "appConfig": {
                        "appId": "9e2fd44d-94a3-4ac0-a57c-958d4d821f08",
                        "name": "Detailed Counties",
                        "appTile": "<div id =\"9e2fd44d-94a3-4ac0-a57c-958d4d821f08\"  class=\"tile\"><div class=\"tile-content image\"><i class=\"fa fa-compass\"></i></div></div>",
                        "appParentContainer": "#appContainer"
                    },
                    "modules": [
                        {
                            "moduleConfig": {
                                "name": "Census Block Points",
                                "moduleId": "7b5523bc-9312-4d72-b0bd-d6c009005cf6",
                                "moduleHost": "http://localhost:1337/Modules/mapModule/",
                                "moduleLocation": "http://localhost:1337/Modules/mapModule/main.js",
                                "moduleMainPath": "Modules/mapModule/main.js",
                                "mapServices": [
                                    {
                                        "id": "CensusBlockPoints_2",
                                        "url": "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/2"
                                    }]
                            }
                        }
                    ]
                }, {
                    "appConfig": {
                        "appId": "c0f1a40d-c02a-498d-a862-904d7e9b3a18",
                        "name": "Detailed States",
                        "appTile": "<div id =\"c0f1a40d-c02a-498d-a862-904d7e9b3a18\"  class=\"tile\"><div class=\"tile-content image\"><i class=\"fa fa-random\"></i></div></div>",
                        "appParentContainer": "#appContainer"
                    },
                    "modules": [
                        {
                            "moduleConfig": {
                                "name": "Detailed States",
                                "moduleId": "b81a5250-9ac1-490c-9b50-0766e75af1a5",
                                "moduleHost": "http://localhost:1337/Modules/mapModule/",
                                "moduleLocation": "http://localhost:1337/Modules/mapModule/main.js",
                                "moduleMainPath": "Modules/mapModule/main.js",
                                "mapServices": [
                                    {
                                        "id": "DetailedStates_3",
                                        "url": "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3"
                                    }]
                            }
                        }
                    ]
                }, {
                    "appConfig": {
                        "appId": "f1cb8eae-ff93-47fc-b6cc-b1f045df9178",
                        "name": "Map Layers",
                        "appTile": "<div id =\"f1cb8eae-ff93-47fc-b6cc-b1f045df9178\"  class=\"tile\"><div class=\"tile-content image\"><i class=\"fa fa fa-bars\"></i></div></div>",
                        "appParentContainer": "#appContainer"
                    },
                    "modules": [
                        {
                            "moduleConfig": {
                                "name": "Map Layers",
                                "moduleId": "a41d8e2e-539d-46b0-9137-242783601120",
                                "moduleHost": "http://localhost:1337/Modules/mapLayersModule/",
                                "moduleLocation": "http://localhost:1337/Modules/mapLayersModule/main.js",
                                "moduleMainPath": "Modules/mapLayersModule/main.js"
                            }
                        }
                    ]
                }
            ]
        }
    ];
    return users;
});


