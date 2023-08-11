const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error.js');
const User = require('../models/user.js');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }
  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again.', 500));
  }

  if (existingUser) {
    return next(new HttpError('User exists already, please login instead.', 500));
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again.', 500));
  }
  res.status(201).json({ user: createdUser.toObject({ getters: true}) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(user => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('Could not identify user, credentials seem to be wrong.', 401);
  }

  res.json({ message: 'Login successful' });
};

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
