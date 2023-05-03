const express = require("express")
const router = express.Router()
const Record = require('../../models/record')
const { formattedDate } = require('../../models/formattedRecord')

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

// edit record data
router.get('/edit/:id', (req, res) => {
  const { id } = req.params
  Record.findById(id)
    .lean()
    .then((record_raw) => {
      const record = formattedDate(record_raw)
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  Record.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// delete record data
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Record.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router