const express = require('express');
const router = express.Router();

const { userDetailsController } = require('../controllers/user.js');
const { userAddressController } = require('../controllers/address');

router.get('/address/:userId', userAddressController)
router.get('/:userId', userDetailsController)

module.exports = router;