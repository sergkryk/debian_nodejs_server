const express = require('express');
const router = express.Router();

const { userFeesController } = require('../controllers/fees')

router.get('/:userId', userFeesController)

module.exports = router;