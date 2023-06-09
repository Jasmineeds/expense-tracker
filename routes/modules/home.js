const express = require("express")
const router = express.Router()
const Record = require('../../models/record')
const { formattedRecords } = require('../../models/formattedRecord')
const { calAmount } = require('../../models/calAmount')

// view user's records
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      records = formattedRecords(records)
      let totalAmount = calAmount(records)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

// view records in category
router.get(`/category/:id`, (req, res) => {
  const categoryId = req.params.id
  const userId = req.user._id
  Record.find({ userId, categoryId })
    .lean()
    .sort({ _id: 'asc' })
    .then(records => {
      console.log(records)
      records = formattedRecords(records)
      let totalAmount = calAmount(records)
      res.render('index', { records, totalAmount })
    })
    .catch(error => console.error(error))
})

module.exports = router