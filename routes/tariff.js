const express = require('express');
const router = express.Router();

const { allTariffController, userTariffController } = require('../controllers/tariff')

router.get('/', allTariffController)
router.get('/:tariffId', userTariffController)

module.exports = router;