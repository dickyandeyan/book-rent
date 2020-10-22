const express = require('express');
const router = express.Router();
const book = require('./book')

router.get('/', (req, res) => {
  res.send(`Connected`)
})
router.use('/book', book)

module.exports = router;