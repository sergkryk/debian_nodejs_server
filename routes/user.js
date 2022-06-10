const express = require('express');
const router = express.Router();
const tokenVerification = require('../middleware/tokenVerification');
const { userDetailsController } = require('../controllers/user.js');

const CidController = require('../controllers/cid');
const PassController = require('../controllers/password');
const StatsController = require('../controllers/stats');

router.use(tokenVerification)

router.route('/')
  .get(userDetailsController)
  .post()
  .put()
  .delete()

router.route('/cid')
  .get(CidController.getById)
  .put(CidController.reset)

  router.route('/password')
  .get(PassController.getById)
  .post(PassController.update)

  router.route('/stats')
  .get(StatsController.getById)
  .post(StatsController.getByDates)

module.exports = router;