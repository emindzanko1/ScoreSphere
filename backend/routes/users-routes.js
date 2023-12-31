const express = require('express');
const {check} = require('express-validator');

const usersControllers = require('../controllers/users-controllers.js');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post('/register', [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})
], usersControllers.register);

router.post('/login', usersControllers.login);

module.exports = router;
