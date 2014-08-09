/**
 * Created by Alex on 7/23/2014.
 */

var express = require('express');
var UserDAO = require('../daos/UserDAO');
var CookiesDAO = require('../daos/CookiesDAO');
var User = require('../models/User');
var router = express.Router();
var config = require('../../config.js');

function getUsers(req, res){
    /**
     * Sends a JSON list of users.
     */
    function callback(users){
        res.json(users);
    }

    var userDAO = new UserDAO(User);

    userDAO.getAllUsers(callback);
}

function createUser(req,res){
    function callback(payload){
        res.json(payload);
    }

    if(typeof req.body === 'undefined' ||
        typeof req.body.username === 'undefined' ||
        typeof req.body.password === 'undefined' ||
        typeof req.body.email === 'undefined')
    {
        res.json({
            'error' : 'Required properties undefined.'
        });
        return;
    }

    var userDAO = new UserDAO(User);

    userDAO.createUser(req.body, callback);
}

function login(req,res){
    function cookieCallback(cookie) {
        if (cookie) {
            res.cookie(config.cookieName, cookie, { maxAge: 900000 });
            res.json({
                'success': 'Login succeeded!'
            });
        } else {
            res.json({
                'error' : 'Login failed!'
            });
        }
    }

    function callback(isLoggedIn){
        if(isLoggedIn){
            var cookieDAO = new CookiesDAO();
            cookieDAO.getNewCookie(req.body.username, req.ip, cookieCallback);
        } else {
            res.json({
                'error' : 'Login failed!'
            });
        }
    }

    var userDAO = new UserDAO(User);
    userDAO.login(req.body, callback);
}

router.get('/users', getUsers);

router.post('/createUser', createUser);

router.post('/login', login);

module.exports = router;
