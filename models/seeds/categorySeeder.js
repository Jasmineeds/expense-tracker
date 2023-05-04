const db = require('../../config/mongoose')
const Category = require('../category')
const SEED_CATEGORY = require('../../category.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('running categorySeeder script...')

  // gen seed category info in db
  SEED_CATEGORY.map(category => {
    Category.create({
      id: category.id,
      name: category.name,
    })
      .catch(error => {
        console.error(error)
      })
      .then(() => {
        console.log('categorySeeder done.')
        process.exit()
      })
  })
})