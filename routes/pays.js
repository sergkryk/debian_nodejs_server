const express = require('express');
const router = express.Router();

const { allPaysController, userPaysController } = require('../controllers/pays')

router.get('/', allPaysController);
router.get('/:userId', userPaysController);

module.exports = router;