// schema for users
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now }
})
module.exports = mongoose.model('User', UserSchema)