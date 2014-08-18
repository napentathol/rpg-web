/**
 * Created by Alex on 7/22/2014.
 */
var MySqlDAO = require('./src/daos/MySqlDAO.js');
var mysql = new MySqlDAO();
var crypto = require('crypto');

module.exports = (function(){
    // Initialize all tables.
    function initTables(connection) {
        // Create users table.
        connection.query("CREATE TABLE IF NOT EXISTS users " +
            "(" +
                "PK INT NOT NULL AUTO_INCREMENT," +
                "PRIMARY KEY(PK)," +
                "username VARCHAR(120) NOT NULL," +
                "UNIQUE KEY (username)," +
                "password VARCHAR(120) NOT NULL," +
                "email VARCHAR(255) NOT NULL," +
                "FirstName CHAR(15) NOT NULL default ''," +
                "LastName CHAR(15) NOT NULL default ''," +
                "salt VARCHAR(8) NOT NULL, " +
                "campaign INT NOT NULL default 1" +
            ");",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('USERS TABLE LOADED!');
            }
        );

        // Create admin user.
        var salt = crypto.randomBytes(6).toString('base64');
        var hashpass = crypto.createHmac('md5', salt)
            .update('pass')
            .digest('base64');
        connection.query("INSERT INTO users (username, password, email, salt) " +
            "SELECT * FROM (SELECT 'admin', '" + hashpass + "', 'admin@email.com', '" + salt + "') AS tmp " +
            "WHERE NOT EXISTS (" +
                "SELECT username FROM users WHERE username = 'admin'" +
            ") LIMIT 1;",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('ADMIN USER LOADED!');
            }
        );

        // Create roles table.
        connection.query("CREATE TABLE IF NOT EXISTS roles " +
            "(" +
                "PK INT NOT NULL AUTO_INCREMENT," +
                "PRIMARY KEY(PK)," +
                "USERS_PK INT NOT NULL," +
                "FOREIGN KEY (USERS_PK) REFERENCES users (PK)," +
                "roles VARCHAR(63) NOT NULL" +
            ");",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('ROLES TABLE LOADED!');
            }
        );

        // Create admin user role.
        connection.query("INSERT INTO roles (USERS_PK, roles) " +
            "SELECT * FROM (SELECT (SELECT PK FROM users WHERE username = 'admin'), 'admin') AS tmp " +
            "WHERE NOT EXISTS (" +
                "SELECT USERS_PK FROM roles WHERE USERS_PK = (SELECT PK FROM users WHERE username = 'admin')" +
            ") LIMIT 1;",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('ADMIN USER ROLE LOADED!');
            }
        );

        connection.query("CREATE TABLE IF NOT EXISTS campaigns" +
            "(" +
                "PK INT NOT NULL AUTO_INCREMENT," +
                "PRIMARY KEY(PK)," +
                "ADMIN_PK INT NOT NULL," +
                "FOREIGN KEY (ADMIN_PK) REFERENCES users (PK)," +
                "campaign_name VARCHAR(255) NOT NULL DEFAULT 'Default Campaign'" +
            ");",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('CAMPAIGNS TABLE LOADED!');
            }
        );

        // Create admin user role.
        connection.query("INSERT INTO campaigns (ADMIN_PK) " +
                "SELECT * FROM (SELECT (SELECT PK FROM users WHERE username = 'admin')) AS tmp " +
                "WHERE NOT EXISTS (" +
                    "SELECT PK FROM campaigns WHERE PK = 0" +
                ") LIMIT 1;",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('DEFAULT CAMPAIGN LOADED!');
            }
        );

        // Create cookies table.
        connection.query("CREATE TABLE IF NOT EXISTS characters " +
            "(" +
                "PK INT NOT NULL AUTO_INCREMENT," +
                "PRIMARY KEY(PK)," +
                "USERS_PK INT NOT NULL," +
                "FOREIGN KEY (USERS_PK) REFERENCES users (PK)," +
                "CAMPAIGNS_PK INT NOT NULL," +
                "FOREIGN KEY (CAMPAIGNS_PK) REFERENCES campaigns (PK)," +
                "char_name VARCHAR(255) NOT NULL DEFAULT 'Herpen Derpenstein'," +
                "chat_color VARCHAR(7) NOT NULL DEFAULT '#FFFFFF'," +
                "XP INT NOT NULL DEFAULT '0'," +
                "lvl INT NOT NULL DEFAULT '1'," +
                "char_init_base INT NOT NULL DEFAULT '0'," +
                "char_init_cur  INT NOT NULL DEFAULT '0'," +
                "char_size_base VARCHAR(31) NOT NULL DEFAULT 'Medium'," +
                "char_size_cur  VARCHAR(31) NOT NULL DEFAULT 'Medium'," +
                "hp_base INT NOT NULL DEFAULT '6'," +
                "hp_cur  INT NOT NULL DEFAULT '6'," +
                "hd_base INT NOT NULL DEFAULT '1'," +
                "hd_cur  INT NOT NULL DEFAULT '1'," +
                "ac_base INT NOT NULL DEFAULT '10'," +
                "ac_cur  INT NOT NULL DEFAULT '10'," +
                "spd_base INT NOT NULL DEFAULT '30'," +
                "spd_cur  INT NOT NULL DEFAULT '30'," +
                "abil_str_base INT NOT NULL DEFAULT '10'," +
                "abil_str_cur  INT NOT NULL DEFAULT '10'," +
                "abil_dex_base INT NOT NULL DEFAULT '10'," +
                "abil_dex_cur  INT NOT NULL DEFAULT '10'," +
                "abil_con_base INT NOT NULL DEFAULT '10'," +
                "abil_con_cur  INT NOT NULL DEFAULT '10'," +
                "abil_int_base INT NOT NULL DEFAULT '10'," +
                "abil_int_cur  INT NOT NULL DEFAULT '10'," +
                "abil_wis_base INT NOT NULL DEFAULT '10'," +
                "abil_wis_cur  INT NOT NULL DEFAULT '10'," +
                "abil_cha_base INT NOT NULL DEFAULT '10'," +
                "abil_cha_cur  INT NOT NULL DEFAULT '10'" +
            ");",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('CHARACTERS TABLE LOADED!');
            }
        );

        // Create admin user role.
        connection.query("INSERT INTO characters (USERS_PK, CAMPAIGNS_PK, char_name) " +
                "SELECT * FROM (SELECT (SELECT PK FROM users WHERE username = 'admin'), 1, 'ADMIN') AS tmp " +
                "WHERE NOT EXISTS (" +
                "SELECT PK FROM campaigns WHERE PK = 0" +
                ") LIMIT 1;",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('ADMIN CHARACTER CREATED!');
            }
        );

        // Create rolls table.
        connection.query("CREATE TABLE IF NOT EXISTS rolls " +
            "(" +
                "PK INT NOT NULL AUTO_INCREMENT," +
                "PRIMARY KEY(PK)," +
                "CHAR_PK INT NOT NULL," +
                "FOREIGN KEY (CHAR_PK) REFERENCES characters (PK)," +
                "roll VARCHAR(128) NOT NULL" +
            ");",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('ROLLS TABLE LOADED!');
            }
        );

        // Create rolls table.
        connection.query("CREATE TABLE IF NOT EXISTS information " +
            "(" +
                "PK INT NOT NULL AUTO_INCREMENT," +
                "PRIMARY KEY(PK)," +
                "CHAR_PK INT NOT NULL," +
                "FOREIGN KEY (CHAR_PK) REFERENCES characters (PK)," +
                "title VARCHAR(128) NOT NULL," +
                "payload MEDIUMTEXT NOT NULL" +
            ");",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('INFORMATION TABLE LOADED!');
            }
        );

        // Create characters table.
        connection.query("CREATE TABLE IF NOT EXISTS cookies " +
            "(" +
                "PK INT NOT NULL AUTO_INCREMENT," +
                "PRIMARY KEY(PK)," +
                "USERS_PK INT NOT NULL," +
                "FOREIGN KEY (USERS_PK) REFERENCES users (PK)," +
                "cookie VARCHAR(128) NOT NULL," +
                "ip VARCHAR(63) NOT NULL" +
            ");",
            function (err) {
                if (err) {
                    throw err;
                }
                console.log('COOKIES TABLE LOADED!');
            }
        );
    }

    // Open a mysql connection.
    mysql.connection(initTables);
}());