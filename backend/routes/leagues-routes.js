const express = require('express');

const leaguesControllers = require('../controllers/leagues-controller.js');

const router = express.Router();

router.get('/', leaguesControllers.getAllLeagues);

router.get('/leagues', leaguesControllers.getAllLeagues);

router.get('/:lname/:ltitle/', leaguesControllers.getLeague);

router.get('/search', function (req, res, next) {
  res.json({ message: 'Welcome to the search route' });
});

module.exports = router;
