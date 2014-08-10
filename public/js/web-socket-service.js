/**
 * Created by Alex on 8/10/2014.
 */

rpgApp.addWebSocketService = function(){
    var service = {
        callback : []
    };

    service.connect = function(){
        if(service.ws){ return; }

        service.ws = new WebSocket('ws://www.sodiumlabs.us:19902/','rpg-protocol');

        service.ws.onopen=function(){
            var msg = {
                'name': 'LOCAL',
                'color': '#A00000',
                'data': 'Connected!'
            };
            service.runCallBacks(msg);
            service.validate();
        };

        service.ws.onclose=function(){
            var msg = {
                'name': 'LOCAL',
                'color': '#A00000',
                'data': 'Connection Closed!'
            };
            service.runCallBacks(msg);
        };

        service.ws.onerror=function(){
            var msg = {
                'name': 'LOCAL',
                'color': '#A00000',
                'data': 'Connection Error!'
            };
            service.runCallBacks(msg);
        };

        service.ws.onmessage=function(message){
            console.log(message.data);
            service.runCallBacks( JSON.parse(message.data) );
        };
    };

    service.send = function(message){
        rpgApp.socket(message);
    };

    service.runCallBacks = function(message) {
        for( var i in service.callback) {
            if (service.callback.hasOwnProperty(i)) {
                service.callback[i](message);
            }
        }
    };

    service.subscribe = function(callback){
        service.callback.push(callback);
    };

    service.validate = function(){
        var validate = {
            'type' : 'validate',
            'data' : service.getCookie()
        };
        service.send(validate);
    };

    service.getCookie = rpgApp.getCookie ;

    service.connect();

    return service;
};

rpgApp.getCookie = function(){
    var name = "nal_auth=";
    var ca = document.cookie.split(';');
    //noinspection LoopStatementThatDoesntLoopJS
    for(var i in ca){
        //noinspection JSUnfilteredForInLoop
        var c=ca[i].trim();
        if (c.indexOf(name)==0){
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return null;
};

rpgApp.$ng.factory('WebSocketService', rpgApp.addWebSocketService);