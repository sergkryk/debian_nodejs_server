const express = require('express');
const router = express.Router();
const tokenVerification = require('../middleware/tokenVerification');
const { userDetailsController, userCidController } = require('../controllers/user.js');

router.use(tokenVerification)

router.route('/')
  .get(userDetailsController)
  .post()
  .put()
  .delete()

router.route('/cid')
  .get(userCidController)
  .post()
  .put()
  .delete()

module.exports = router;