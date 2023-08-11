const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error.js');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'John Smith',
        email: 'john@example.com',
        password: 'password'
    }
]

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS});
}

const register = (req, res, next) => {
    const { name, email, password } = req.body;

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser});
}

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(user => user.email === email);

    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
    }

    res.json({ message: 'Login successful'});
}

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;