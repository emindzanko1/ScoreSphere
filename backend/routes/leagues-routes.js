const express = require('express');

const leaguesControllers = require('../controllers/leagues-controller.js');

const router = express.Router();

router.get('/', leaguesControllers.getAllLeagues);

router.get('/leagues', leaguesControllers.getAllLeagues);

router.get('/:lname/:ltitle/:lid/', leaguesControllers.getLeague);

router.get('/search', function (req, res, next) {
  res.json({ message: 'Welcome to the search route' });
});

router.get('/login', function (req, res, next) {
  res.json({ message: 'Welcome to  the login route' });
});

module.exports = router;
