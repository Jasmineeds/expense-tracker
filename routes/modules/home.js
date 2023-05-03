const express = require("express")
const router = express.Router()
const Record = require('../../models/record')
const { formattedDates } = require('../../models/formattedDate')

// view user's restaurants
router.get('/', (req, res) => {
  Record.find({})
    .lean()
    // .sort({ _id: 'asc' })
    .then(records => {
      records = formattedDates(records)
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router