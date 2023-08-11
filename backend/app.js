const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

const leaguesRoutes = require('./routes/leagues-routes');
const clubsRoutes = require('./routes/clubs-routes');
const usersRoutes = require('./routes/users-routes');

app.use('/', leaguesRoutes);
app.use('/', clubsRoutes);
app.use('/', usersRoutes);
app.use((req, res, next) => {
   throw next(new HttpError('Could not find this route.',404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred' });
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
