const express = require('express');

const usersControllers = require('../controllers/users-controller.js');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.get('/login', usersControllers.login);

router.get('/register', usersControllers.register);

module.exports = router;
