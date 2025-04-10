'use strict'

var express = require('express');
var userController = require('../controllers/users')
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/user', userController.createUser);
routes.post('/api/login', userController.loginUser);
routes.put('/api/userEdit/:_id', token.validateToken, userController.editUser);
routes.delete('/api/admin/Delete/:_id', token.validateToken, userController.deleteUserByAdmin);

module.exports = routes;
