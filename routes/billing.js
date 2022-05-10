const express = require('express');
const router = express.Router();

const { billingController, prevFeeController, prevPayController } = require('../controllers/billing')

router.get('/:userId', billingController)
router.get('/:userId/fees/prev', prevFeeController)
router.get('/:userId/pays/prev', prevPayController)

module.exports = router;