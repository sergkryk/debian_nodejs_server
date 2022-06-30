const express = require('express');
const router = express.Router();

const PaysController = require('../controllers/pays')

router.get('/', PaysController.getAll);

module.exports = router;