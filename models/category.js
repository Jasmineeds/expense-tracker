// schema for category
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
})
module.exports = mongoose.model('Category', CategorySchema)