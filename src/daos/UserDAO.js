/**
 * Created by Alex on 7/23/2014.
 */
var MySqlDAO = require('./MySqlDAO.js');
var mysql = new MySqlDAO();

module.exports = (function(){
    return function UserDAO(User){
        function createUser(row){
            console.log(row);
            return new User(row.PK, row.username, row.email, row.FirstName, row.LastName);
        }

        /**
         * Get a User from the database using the User's PK.
         *
         * @param id the PK of the User.
         * @param callback callback function to handle the User.
         */
        this.getUserFromId = function getUserFromId(id, callback){
            // Select statement callback
            function getAllIdUserSelect(connection) {
                connection.query(
                    "SELECT * FROM users WHERE PK = :id ;",
                    { id: id },
                    function (err, rows) {
                        if (err) {
                            throw err;
                        }
                        if (rows.length > 1) {
                            throw new Error("Retrieved more than one user with a user id.");
                        }
                        callback(createUser(rows[0]));
                    }
                );
            }

            // Open a mysql connection.
            mysql.connection(getAllIdUserSelect);
        };

        /**
         * Gets an Array of all users.
         *
         * @param callback callback function to handle the Array.
         */
        this.getAllUsers = function getAllUsers(callback){
            // Select statement callback
            function getAllUsersSelect(connection) {
                connection.query(
                    "SELECT * FROM users;",
                    function (err, rows) {
                        var out = [];
                        if (err) {
                            throw err;
                        }
                        for (var i in rows) {
                            if (rows.hasOwnProperty(i)) {
                                out.push(createUser(rows[i]));
                            }
                        }
                        callback(out);
                    }
                )
            }

            // Open a mysql connection.
            mysql.connection(getAllUsersSelect);
        }
    }
}());
