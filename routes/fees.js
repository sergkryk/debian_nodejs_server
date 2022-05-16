const express = require('express');
const router = express.Router();

const { allFeesController, userFeesController, nextFeeController } = require('../controllers/fees')

router.get('/', allFeesController);
router.get('/:userId', userFeesController);
router.get('/:userId/next', nextFeeController);

module.exports = router;