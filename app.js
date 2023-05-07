if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  console.log('dot env required')
}

// node modules
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const usePassport = require('./config/passport')

// my modules
const routes = require('./routes')
require('./config/mongoose')

// app
const app = express()
const PORT = process.env.PORT || 3000

// app engine
app.engine('hbs', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// app use middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
// use flash to show messages
app.use(flash())
// authenticator
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})