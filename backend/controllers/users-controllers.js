const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error.js');
const User = require('../models/user.js');

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, '-password');
  } catch (error) {
    return next(new HttpError('Fetching users failed, please try again later.', 500));
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) });
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
    return next(new HttpError('User exists already, please login instead.', 422));
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new HttpError('Could not create user, please try again.', 500));
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again.', 500));
  }

  let token;
  try {
    jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.SECRET_URI, { expiresIn: '1h' });
  } catch (error) {
    return next(new HttpError('Signing up failed, please try again.', 500));
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError('Logging in failed, please try again.', 500));
  }

  if (!existingUser) {
    return next(new HttpError('Invalid credentials, could not logged you in.', 401));
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(new HttpError('Could not log you in, please check your credentials and try again', 500));
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, could not logged you in.', 401));
  }

  let token;
  try {
    jwt.sign({ userId: createdUser.id, email: createdUser.email }, 'supersecret', { expiresIn: '1h' });
  } catch (error) {
    return next(new HttpError('Logging in failed, please try again.', 500));
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token
  });
};

exports.getUsers = getUsers;
exports.register = register;
exports.login = login;
