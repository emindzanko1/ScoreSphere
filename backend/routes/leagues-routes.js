const express = require('express');
const {check} = require('express-validator');

const leaguesControllers = require('../controllers/leagues-controllers.js');

const router = express.Router();

router.post('/leagues', [
  check('name').not().isEmpty(),
  check('title').not().isEmpty(),
], leaguesControllers.createLeague);

router.get('/', leaguesControllers.getAllLeagues);

router.get('/leagues', leaguesControllers.getAllLeagues);

router.get('/:lname/:ltitle/', leaguesControllers.getLeagueByTitle);

router.get('/search', function (req, res, next) {
  res.json({ message: 'Welcome to the search route' });
});

router.get('/login', function (req, res, next) {
  res.json({ message: 'Welcome to the login route' });
});

router.get('/register', function (req, res, next) {
  res.json({ message: 'Welcome to the register route' });
});

module.exports = router;
