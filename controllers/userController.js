const {
  User,
  Book,
  BookUser
} = require('../models')

const bcrypt = require('bcryptjs')

class UserController {
  static registerForm(req, res) {
    res.render('./login/registerForm')
  }

  static postRegister(req, res) {

    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
      .then(user => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static loginForm(req, res) {
    const {
      error
    } = req.query
    res.render('./login/loginForm', {
      error
    })
  }

  static postLogin(req, res) {
    const emails = req.body.email
    const password = req.body.password

    User.findOne({
      where: { email: emails }
    })
      .then(user => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password)
          if (isValidPassword) {
            req.session.userId = user.id
            return res.redirect('/')
          } else {
            const error = "Invalid password/username"
            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = "Invalid password/username"
          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch(err => {
        res.send(err);
      })
  }
}

module.exports = UserController