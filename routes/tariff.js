const express = require('express');
const router = express.Router();

const tariffController = require('../controllers/tariff.js')

router.get('/:userId', tariffController)

module.exports = router;