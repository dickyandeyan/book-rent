const {
  Member
} = require('../models')

const bcrypt = require('bcryptjs')

class MemberController {
  static registerForm(req, res) {
    res.render('./login/registerForm')
  }

  static postRegister(req, res) {

    const newMember = {
      username: req.body.username,
      password: req.body.password
    }

    Member.create(newMember)
      .then(user => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err)
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
    const {
      username,
      password
    } = req.body

    Member.findOne({
        where: {
          username
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
        res.send(err)
      })
  }

}

module.exports = MemberController;