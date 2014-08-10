/**
 * Created by Alex on 8/10/2014.
 */

rpgApp.addChatDirective = function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/chat.html',
        controller: function($scope, WebSocketService){

            $scope.message = 'TEST';
            $scope.messages = [];

            $scope.rolls = [{
                num : 1,
                val : 20,
                bonus : 0
            }];

            WebSocketService.subscribe(function(message){
                $scope.messages.push(message);
                $scope.$apply();
                $scope.scrollToBottom();
            });

            $scope.addRoll = function(){
                $scope.rolls.push({
                    num : 1,
                    val : 20,
                    bonus : 0
                });
            };

            $scope.sendMessage = function(){
                if($scope.message===''){
                    return;
                }
                var msg = {
                    'type' : 'message',
                    'data' : $scope.message,
                    'users': 'all'
                };
                WebSocketService.send(msg);
                $scope.message='';
            };

            $scope.sendRoll = function(roll){
                if(roll.num === 0 && roll.val === 0){
                    return ;
                }
                var msg = {
                    'action' : 'roll',
                    'type' : 'roll',
                    'number' : roll.num,
                    'value' : roll.val,
                    'bonus' : roll.bonus
                };
                WebSocketService.send(msg);
            };

            $scope.scrollToBottom = function(){
                var elem = document.getElementById('rpg-chat-area');
                elem.scrollTop = elem.scrollHeight;
            }
        }
    }
};

rpgApp.$ng.directive('chat', [rpgApp.addChatDirective]);