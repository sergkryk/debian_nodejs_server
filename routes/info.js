const express = require('express');
const router = express.Router();

const { userInfoController } = require('../controllers/info.js')

router.get('/:userId', userInfoController)

module.exports = router;