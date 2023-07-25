const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')

const SEED_RECORD = require('./record.json') // record raw data in json
const SEED_USER = require('./user.json') // user raw data in json
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('running recordSeeder script...')

  // gen seed user info in db
  const createUsers = SEED_USER.map(user => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash =>
        User.create({
          name: user.name,
          email: user.email,
          password: hash
        })
      )
  })

  // gen seed user's record data in db
  Promise.all(createUsers)
    .then(users => {
      const createRecords = []
      users.forEach((user, index) => {
        const { _id } = user
        SEED_USER[index].userRecords.forEach(item => {
          const record = SEED_RECORD[item - 1]
          record.userId = _id
          createRecords.push(Record.create(record));
        })
      })
      return Promise.all(createRecords);
    })
    .catch(error => {
      console.error(error)
    })
    .then(() => {
      console.log('recordSeeder done.')
      process.exit()
    })
})