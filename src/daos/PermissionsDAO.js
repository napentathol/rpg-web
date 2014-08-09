/**
 * Created by Alex on 8/8/2014.
 */

var UserDAO = require('./UserDAO.js');
var CookiesDAO = require('./CookiesDAO.js');

module.exports = function () {
    return function PermissionsDAO(User) {
        this.isLoggedIn = function isLoggedIn(cookie){
            var action,
                retval = {
                    loggedIn : false,
                    user : {}
                },
                userDAO = new UserDAO(User),
                cookiesDAO = new CookiesDAO();

            function userPKCallback(user){
                if(user !== false){
                    retval.loggedIn = true;
                    retval.user = user;
                }
                action(retval);
            }

            function cookieCallback(pk){
                if(pk !== false) {
                    userDAO.getUserFromId(pk, userPKCallback);
                } else {
                    action(retval);
                }
            }

            cookiesDAO.getUserPKFromCookie(cookie, cookieCallback);

            return {
                then : function(callback){
                    action = callback;
                }
            };
        }
    }
}();