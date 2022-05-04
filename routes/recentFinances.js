const express = require('express');
const router = express.Router();

const { recentFinancesController } = require('../controllers/recentFinances')

router.get('/:userId', recentFinancesController)

module.exports = router;