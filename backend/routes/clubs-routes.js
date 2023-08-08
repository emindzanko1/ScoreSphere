const express = require('express');

const clubsControllers = require('../controllers/clubs-controller.js');

const router = express.Router();

router.get('/:cname/:cid', clubsControllers.getClubs);

module.exports = router;
