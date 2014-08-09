/**
 * Created by Alex on 7/23/2014.
 */
var MySqlDAO = require('./MySqlDAO.js');
var mysql = new MySqlDAO();
var crypto = require('crypto');

module.exports = function () {
    return function UserDAO(User) {
        function createUser(row) {
            return new User(row.PK, row.username, row.email, row.FirstName, row.LastName);
        }

        /**
         * Get a User from the database using the User's PK.
         *
         * @param id the PK of the User.
         * @param callback callback function to handle the User.
         */
        this.getUserFromId = function getUserFromId(id, callback) {
            // Select statement callback
            function getAllIdUserSelect(connection) {
                connection.query(
                    "SELECT * FROM users WHERE PK = ? ;",
                    [ id ],
                    function (err, rows) {
                        if (err) {
                            console.error(err.stack);
                            callback(false);
                        } else if (rows.length > 1) {
                            console.error(new Error("Retrieved more than one user with a id.").stack);
                            callback(false);
                        }  else if (rows.length < 1) {
                            console.error("Could not retrieve user with a id.");
                            callback(false);
                        } else {
                            callback(createUser(rows[0]));
                        }
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
        this.getAllUsers = function getAllUsers(callback) {
            // Select statement callback
            function getAllUsersSelect(connection) {
                connection.query(
                    "SELECT * FROM users;",
                    function (err, rows) {
                        var out = [];
                        if (err) {
                            console.error(err.stack);
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
        };

        /**
         * Creates a user in the database based on a user object.
         *
         * @param user
         * @param callback
         */
        this.createUser = function createUser(user, callback) {
            var salt = crypto.randomBytes(6).toString('base64');
            var hashpass = crypto.createHmac('md5', salt)
                .update(user.password)
                .digest('base64');

            function createUser(connection) {
                connection.query(
                        "INSERT INTO users ( username, password, email, salt ) " +
                        "VALUES ( :username, :password, :email, :salt )",
                    {
                        username: user.username,
                        password: hashpass,
                        email: user.email,
                        salt: salt
                    },
                    function (err, rows) {
                        if (err) {
                            console.error(err.stack);
                        }
                        callback(rows);
                    }
                );
            }

            // Open a mysql connection.
            mysql.connection(createUser);
        };

        /**
         * Tests whether a username/password combination passes validation.
         *
         * @param user object containing username/password.
         * @param callback the callback object for after the password validation succeeds.
         */
        this.login = function checkLogin(user, callback) {
            function checkLogin(connection) {
                connection.query(
                    "SELECT salt, password FROM users WHERE username = ?",
                    [ user.username ],
                    function (err, rows) {
                        if (err) {
                            console.error(err.stack);
                            callback(false);
                        } else if (rows.length > 1) {
                            console.error(new Error("Retrieved more than one user with a username.").stack);
                            callback(false);
                        } else {
                            var salt = rows[0].salt;
                            var hashPass = rows[0].password;
                            var testPass = crypto.createHmac('md5', salt)
                                .update(user.password)
                                .digest('base64');
                            callback(hashPass === testPass);
                        }
                    }
                );
            }

            // Open a mysql connection.
            mysql.connection(checkLogin);
        }
    };
}();
