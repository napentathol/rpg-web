/**
 * Created by Alex on 7/22/2014.
 */

config = {
    port : process.env.WEB_PORT || 19900,

    mysqlHost : "localhost",
    mysqlPort : 3306,
    mysqlUser : "test",
    mysqlPass : "",
    mysqlDB : "rpg_test",

    cookieName : "rpg_cookie"
};

module.exports = config;
