const express = require("express")
const router = express.Router()

// view user's restaurants
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router