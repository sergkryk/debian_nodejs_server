const express = require('express');
const router = express.Router();

const { allFeesController, userFeesController } = require('../controllers/fees')

router.get('/', allFeesController);
router.get('/:userId', userFeesController);

module.exports = router;