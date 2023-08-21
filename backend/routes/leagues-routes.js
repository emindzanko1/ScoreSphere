const express = require('express');
const { check } = require('express-validator');

const leaguesControllers = require('../controllers/leagues-controllers.js');
const checkAuth = require('../middleware/check-auth.js');

const router = express.Router();

router.get('/:lname/:ltitle/', leaguesControllers.getLeagueByTitle);

// router.use(checkAuth);

router.post(
  '/leagues',
  [check('name').not().isEmpty(), check('title').not().isEmpty()],
  leaguesControllers.createLeague
);

router.get('/search', function (req, res, next) {
  res.json({ message: 'Welcome to the search route' });
});


module.exports = router;
