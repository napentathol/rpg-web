/* Author: YOUR NAME HERE
*/

var rpgApp ={
    $ng : angular.module('rpgApp', [ 'ngRoute', 'ngAnimate' ]),
    socket : {}
};

rpgApp.$ng.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/chat', {
            templateUrl : 'chat'
        }).otherwise({
            redirectTo : 'chat'
        });
    }
]);

$(document).ready(function() {
    rpgApp.socket = io.connect();

    $('#sender').bind('click', function() {
        rpgApp.socket.emit('message', 'Message Sent on ' + new Date());
    });

    rpgApp.socket.on('server_message', function(data){
        $('#receiver').append('<li>' + data + '</li>');
    });
});