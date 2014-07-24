/**
 * Created by Alex on 7/23/2014.
 */

/**
 * This class exists solely to make node mysql make sense.
 */
var config = require('../../config');
var mysql = require('mysql');

module.exports = (function(){
    return function MySqlDAO(){
        function createConnection(){
            return mysql.createConnection({
                host : config.mysqlHost,
                port : config.mysqlPort,
                user : config.mysqlUser,
                password : config.mysqlPass,
                database : config.mysqlDB
            });
        }

        this.connection = function connection(callback){
            // Create connection with configured settings.
            var connection = createConnection();

            // Connect to mysql.
            connection.connect();

            callback(connection);

            // Close connection.
            connection.end();
        };
    };
}());
