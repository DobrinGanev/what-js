'use strict';
define(function () {
    var logData = flight.component(function () {

        this.dataReceived = function (event, data) {
            event.stopPropagation();
            console.log("Item clicked: currentTarget=", event.currentTarget);
            console.log("data received=", data);
        };
        var dataReceived = this.dataReceived;
        this.after("initialize", function () {
            this.on("log", dataReceived);
        });
    });
    logData.attachTo(document);
});


