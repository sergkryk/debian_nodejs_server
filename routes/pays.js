const express = require('express');
const router = express.Router();

const paysController = require('../controllers/pays')

router.get('/', paysController.allPaysController);
router.get('/:userId', paysController.userPaysController);

module.exports = router;