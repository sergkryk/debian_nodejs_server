const express = require('express');
const router = express.Router();

const { userPaymentsController } = require('../controllers/payments.js')

router.get('/:userId', userPaymentsController)

module.exports = router;