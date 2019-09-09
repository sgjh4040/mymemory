const express = require('express'),
      routes = express.Router();
const userController = require('./controller/user-controller');
var cgvController = require('./controller/cgv-controller');

routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);

routes.get('/cgvinfo', cgvController.findmovies);
routes.get('/cgvdetail/:url', cgvController.detailmovie);