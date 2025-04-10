'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var routesUser = require('./routes/users');
var routesProduct = require('./routes/products');
var routesCitation = require('./routes/citations');
var routesCommentary = require('./routes/commentaries');
var routesPrivateCommentary = require('./routes/privatecommentaries');
var routesShoppingcart = require('./routes/shoppingcart');

var application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({'extended': false}));
application.use(routesUser);
application.use(routesProduct);
application.use(routesCitation);
application.use(routesCommentary);
application.use(routesPrivateCommentary);
application.use(routesShoppingcart);

module.exports = application;