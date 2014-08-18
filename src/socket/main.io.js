/**
 * Created by Alex on 8/10/2014.
 */

var message = require('./messageHandler');
var PermissionsDAO = require('../daos/PermissionsDAO.js');
var User = require('../models/User.js');

function createHandlers(socket, io){
    message.handleMessages(socket, io);
}

module.exports = function() {
    return {
        getSocketIoServer : function getSocketIoServer(server, socketIO){
            var io = socketIO(server);

            io.on('connection', function(socket){
                console.log('Client Connected');

                socket.on('login', function(data) {
                    var permissionsDAO = new PermissionsDAO(User);

                    permissionsDAO.isLoggedIn(data)
                        .then(function renderIndex(loginObj) {
                            var msg = {};
                            if (loginObj.loggedIn) {
                                msg = {
                                    'name' : 'REMOTE',
                                    'color' : '#CF2020',
                                    'data' : 'Connected!'
                                };
                                socket.user = loginObj;
                                socket.emit('message', msg);
                                createHandlers(socket, io);
                            } else {
                                msg = {
                                    'name' : 'REMOTE',
                                    'color' : '#CF2020',
                                    'data' : 'Authentication failed! Sorry!'
                                };
                                socket.emit('message', msg);
                                socket.disconnect('unauthorized');
                            }
                        });
                });


                socket.on('disconnect', function(){
                    console.log('Client Disconnected.');
                });
            });

            return io;
        }
    }
}();