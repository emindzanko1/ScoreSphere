const express = require('express');
const {check} = require('express-validator');


const clubsControllers = require('../controllers/clubs-controllers.js');

const router = express.Router();

router.post('/clubs', [check('name').not().isEmpty()], clubsControllers.createClub);

router.get('/clubs', clubsControllers.getAllClubs);

router.get('/:cname', clubsControllers.getClubByName);

router.get('/clubs/:ltitle', clubsControllers.getClubsByLeagueTitle);

module.exports = router;
