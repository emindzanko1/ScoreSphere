const express = require('express');

const clubsControllers = require('../controllers/clubs-controllers.js');

const router = express.Router();

router.get('/:cname/:cid', clubsControllers.getClubs);

module.exports = router;
