const express = require('express');
const bodyParser = require('body-parser');

const leaguesRoutes = require('./routes/leagues-routes');
const clubsRoutes = require('./routes/clubs-routes');

const app = express();

app.use('/', leaguesRoutes);
app.use('/', clubsRoutes);

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
