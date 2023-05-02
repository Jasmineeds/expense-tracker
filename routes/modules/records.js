const express = require("express")
const router = express.Router()

// create new record data
router.get('/new', (req, res) => {
  res.render('new')
})

// edit restaurant data
router.get('/edit', (req, res) => {
  res.render('edit')
})

module.exports = router