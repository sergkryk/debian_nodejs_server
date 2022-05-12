const express = require('express');
const router = express.Router();

const { allTariffController, userTariffController } = require('../controllers/tariff')

router.get('/', allTariffController)
router.get('/:userId', userTariffController)

module.exports = router;