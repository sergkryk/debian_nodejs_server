const express = require("express");
const router = express.Router();

const controller = require("../controllers/citypay");
const reqVerification = require("../middleware/citypayVerification.js");
const setProvider = require("../middleware/providerId.js");

router.use(reqVerification);
router.use(setProvider.psb);

router.use((req, res, next) => {
  if (req.query?.Account === "1116") {
    next();
  } else {
    res.status(401).send();
  }
});

router.get("/", controller);

module.exports = router;
