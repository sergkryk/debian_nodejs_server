const express = require('express');
const router = express.Router();

const feesController = require('../controllers/fees')

router.get('/', feesController.allFeesController);
router.get('/:userId', feesController.userFeesController);

module.exports = router;