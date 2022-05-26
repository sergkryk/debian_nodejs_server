const express = require('express');
const router = express.Router();
const tokenVerification = require('../middleware/tokenVerification');
const { userDetailsController } = require('../controllers/user.js');

router.get('/', tokenVerification, userDetailsController);

module.exports = router;