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