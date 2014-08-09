/**
 * Created by Alex on 8/7/2014.
 */

var MySqlDAO = require('./MySqlDAO.js');
var mysql = new MySqlDAO();
var crypto = require('crypto');

module.exports = function () {
    return function CookiesDAO(){
        this.getNewCookie = function getNewCookie(username, ip, callback){

            var cookie = crypto.pseudoRandomBytes(96).toString('base64');

            function insertNewCookie(connection){
                connection.query(
                    "INSERT INTO cookies (USERS_PK, cookie, ip) " +
                    "VALUES ( (SELECT PK FROM users WHERE username = ?), ?, ? )",
                    [ username, cookie, ip ],
                    function(err, rows){
                        if (err) {
                            console.error(err.stack);
                            callback('');
                        } else {
                            callback(cookie);
                        }
                    }
                );
            }

            // Open a mysql connection.
            mysql.connection(insertNewCookie);
        };

        this.getUserPKFromCookie = function getUserPKFromCookie(cookie, callback) {
            function getUserPK(connection){
                connection.query(
                    "SELECT USERS_PK FROM cookies WHERE cookie = ?",
                    [ cookie ],
                    function (err, rows) {
                        if (err) {
                            console.error(err.stack);
                            callback(false);
                        } else if (rows.length > 1){
                            console.error(JSON.stringify(rows));
                            console.error(new Error("Retrieved more than one cookie. UH OH.").stack);
                            callback(false);
                        } else if (rows.length < 1){
                            console.error("Retrieved no cookies.");
                            callback(false);
                        } else {
                            callback(rows[0].USERS_PK);
                        }
                    }
                );
            }

            // Open a mysql connection.
            mysql.connection(getUserPK);
        };
    }
}();