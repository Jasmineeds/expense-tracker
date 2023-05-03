const express = require("express")
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!email || !password || !confirmPassword) {
    console.log('請輸入所需欄位')
    errors.push({ message: '請輸入所需欄位' })
  }
  if (password !== confirmPassword) {
    console.log('兩次密碼不相符．')
    errors.push({ message: '兩次密碼不相符．' })
  }
  if (errors.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword
    })
  }
  // check whether email registered
  User.findOne({ email }).then(user => {
    // email registered：back to register page
    if (user) {
      console.log('Email 已被註冊．')
      errors.push({ message: 'Email 已被註冊．' })
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    // email not registered：write in db
    User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
})

module.exports = router