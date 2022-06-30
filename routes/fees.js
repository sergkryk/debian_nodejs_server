const express = require('express');
const router = express.Router();

const FeesController = require('../controllers/fees')

router.get('/', FeesController.getAll);

module.exports = router;