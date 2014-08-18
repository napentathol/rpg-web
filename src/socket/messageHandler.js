/**
 * Created by Alex on 8/10/2014.
 */

module.exports = function(){
    return {
        handleMessages : function(socket, io){
            socket.on('message', function(data){
                io.sockets.emit('message',data);
            });
        }
    }
}();
