const express = require('express');
const router = express.Router();
const tokenVerification = require('../middleware/tokenVerification');
const { userDetailsController, userCidController, userResetCidController } = require('../controllers/user.js');

const CidController = require('../controllers/cid');

router.use(tokenVerification)

router.route('/')
  .get(userDetailsController)
  .post()
  .put()
  .delete()

router.route('/cid')
  .get(CidController.getById)
  .put(CidController.reset)

module.exports = router;