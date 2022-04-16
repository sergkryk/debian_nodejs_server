const express = require('express');
const router = express.Router();

const getUserInfo = require('../controllers/user.js')

router.get('/', (req, res) => {
  res.json({
    message: 'Handling GET requests to users list'
  })
});
router.post('/', (req, res) => {
  res.json({
    message: 'Handling POST requests to users list'
  })
});
router.get('/:userId', (req, res) => {
  const id = req.params.userId;
  getUserInfo(id, (err, results, fields) => {
    res.json(results)
  }); 
})

module.exports = router;