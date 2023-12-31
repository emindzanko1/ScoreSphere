const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); 
  next();
});

const mainRoutes = require('./routes/main-routes');
const leaguesRoutes = require('./routes/leagues-routes');
const clubsRoutes = require('./routes/clubs-routes');
const usersRoutes = require('./routes/users-routes');

app.use('/', mainRoutes);
app.use('/tournament', leaguesRoutes);
app.use('/team', clubsRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
  throw next(new HttpError('Could not find this route.', 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred' });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('Listening on port 5000');
    });
  })
  .catch(error => {
    console.log(error);
  });
