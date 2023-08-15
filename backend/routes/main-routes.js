const express = require('express');

const leaguesControllers = require('../controllers/leagues-controllers.js');
const clubControllers = require('../controllers/clubs-controllers.js');

const router = express.Router();

router.get('/', leaguesControllers.getAllLeagues);
router.get('/', clubControllers.getClubsByLeagueTitle);

router.get('/leagues', leaguesControllers.getAllLeagues);
router.get('/league', clubControllers.getClubsByLeagueTitle);

module.exports = router;
