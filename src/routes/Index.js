var express = require('express');
var router = express.Router();
var PermissionsDAO = require('../daos/PermissionsDAO.js');
var User = require('../models/User.js');

/* GET home page. */
router.get('/', function(req, res) {
    var permissionsDAO = new PermissionsDAO(User);

    permissionsDAO.isLoggedIn(req.cookies[config.cookieName])
    .then(function renderIndex(loginObj){
        if(loginObj.loggedIn) {
            res.render('index', { title: 'Express', username : loginObj.user.username })
        } else {
            res.render('index', { title: 'Express', username : 'Not logged in!' })
        }
    });
});

/* GET home page. */
router.get('/chat', function(req, res) {
    var permissionsDAO = new PermissionsDAO(User);

    permissionsDAO.isLoggedIn(req.cookies[config.cookieName])
        .then(function renderIndex(loginObj){
            if(loginObj.loggedIn) {
                res.render('partials/chat', {});
            } else {
                res.json({ status : 'Not logged in!' });
            }
        });
});

module.exports = router;
