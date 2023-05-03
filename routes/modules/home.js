const express = require("express")
const router = express.Router()
const Record = require('../../models/record')
const { formattedRecords } = require('../../models/formattedRecord')

// view user's records
router.get('/', (req, res) => {
  Record.find({})
    .lean()
    // .sort({ _id: 'asc' })
    .then(records => {
      records = formattedRecords(records)
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

// view records in category
router.get(`/category/:id`, (req, res) => {
  const categoryId = req.params.id
  Record.find({ categoryId })
    .lean()
    // .sort({ _id: 'asc' })
    .then(records => {
      records = formattedRecords(records)
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router