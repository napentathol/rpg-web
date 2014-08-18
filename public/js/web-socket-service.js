/**
 * Created by Alex on 8/10/2014.
 */

rpgApp.addWebSocketService = function(){
    var service = {
        callback : []
    };

    service.connect = function(){
        rpgApp.socket = io.connect();

        rpgApp.socket.emit('login',rpgApp.getCookie());

        rpgApp.socket.on('message', function(data){
            service.runCallBacks(data);
        });
    };

    service.send = function(message){
        console.log(JSON.stringify(message));
        rpgApp.socket.emit('message',message);
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

    service.getCookie = rpgApp.getCookie ;

    service.connect();

    return service;
};

rpgApp.getCookie = function(){
    var name = rpgApp.cookieName + "=";
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