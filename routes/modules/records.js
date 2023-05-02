const express = require("express")
const router = express.Router()
const Record = require('../../models/record')

// create new record data
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const record = req.body
  Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit restaurant data
router.get('/edit', (req, res) => {
  res.render('edit')
})

module.exports = router