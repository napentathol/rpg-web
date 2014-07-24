/**
 * Created by Alex on 7/23/2014.
 */

var express = require('express');
var UserDAO = require('../daos/UserDAO');
var User = require('../models/User');
var router = express.Router();

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
    // TODO y'know, actually implement this.
    res.json(req.body);
}

router.get('/users',getUsers);

router.get('/createUser', createUser);

router.post('/createUser', createUser);

module.exports = router;
