const express = require('express');
const router = express.Router();

const { loginController } = require('../controllers/login.js');

router.post('/', loginController);

module.exports = router;