import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import { NotAuthError } from './errors.js';
import dotenv from 'dotenv';

dotenv.config();

const KEY = process.env.KEY;

function createJSONToken(email) {
  return sign({ email }, KEY, { expiresIn: '1h' });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

function isValidPassword(password, storedPassword) {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  if (!req.headers.authorization) {
    console.log('NOT AUTH. AUTH HEADER MISSING.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authFragments = req.headers.authorization.split(' ');

  if (authFragments.length !== 2) {
    console.log('NOT AUTH. AUTH HEADER INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log('NOT AUTH. TOKEN INVALID.');
    return next(new NotAuthError('Not authenticated.'));
  }
  next();
}

const _createJSONToken = createJSONToken;
export { _createJSONToken as createJSONToken };
const _validateJSONToken = validateJSONToken;
export { _validateJSONToken as validateJSONToken };
const _isValidPassword = isValidPassword;
export { _isValidPassword as isValidPassword };
export const checkAuth = checkAuthMiddleware;
