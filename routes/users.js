const express = require('express');
const router = express.Router();

const { getUser } = require('../controllers/user.js')

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
  
  function handleResolve(response) {
    res.json(response);
  };
  
  function handleReject(err) {
    res.json(err);
  };

  getUser(id).then(handleResolve, handleReject);
})

module.exports = router;