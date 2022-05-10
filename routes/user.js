const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.js');
const personalController = require('../controllers/personal.js');

router.get('/:userId', userController)
router.get('/:userId/pi', personalController)

module.exports = router;