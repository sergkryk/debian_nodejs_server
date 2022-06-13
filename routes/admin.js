const express = require('express');
const router = express.Router();
// const tokenVerification = require('../middleware/tokenVerification');


const CidController = require('../controllers/cid');

// router.use(tokenVerification)

router.route('/')
  .get()
  .post()
  .put()
  .delete()

router.route('/cids')
  .get(CidController.getAll)

  router.route('/addresses')
  .get(CidController.getAddresses)

module.exports = router;