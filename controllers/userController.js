const {
  User
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
      .then(() => {
        res.redirect('/login')
      })
      .catch(err => {
        if (err.name = "SequelizeValidationError") {
          let errors = [];

          err.errors.forEach(error => {
            errors.push(error.message);
          })

          req.app.locals.message = errors.join(', ');
          console.log(req.app.locals.message);
          res.redirect(`/register?error=${errors}`);

        } else {
          res.send(err);
        }
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
        where: {
          email: emails
        }
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
        res.send(err.message);
      })
  }

  static getLogout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login')
    })
  }
}

module.exports = UserController