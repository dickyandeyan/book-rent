const {
  Book,
  BookUser
} = require('../models')

class BookController {
  static showBook(req, res) {
    Book.findAll()
      .then(data => {
        res.render('book', {
          data
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addBookForm(req, res) {
    res.render('addBook')
  }

  static addBook(req, res) {
    const dataAddBook = {
      title: req.body.title,
      author: req.body.author,
      released_year: req.body.released_year
    }
    Book.create(dataAddBook)
      .then(data => {
        res.redirect('/book')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editBookForm(req, res) {
    const id = +req.params.id
    Book.findAll({
      where: {
        id
      }
    })
      .then(data => {
        res.render(`editBook`, {
          data
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editBook(req, res) {
    const id = +req.params.id
    const dataUpdateBook = {
      title: req.body.title,
      author: req.body.author,
      released_year: req.body.released_year
    }
    Book.update(dataUpdateBook, {
      where: {
        id
      }
    })
      .then(data => {
        res.redirect('/book')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static deleteBook(req, res) {
    const id = +req.params.id
    Book.destroy({
      where: {
        id
      }
    })
      .then(data => {
        res.redirect('/book')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static checkoutForm(req, res) {
    const books = {
      title: req.body.title,
      author: req.body.author,
      released_year: req.body.released_year
    }
    console.log(req)
    Book.findAll()
      .then(data => {
        res.render('checkout', { data })
      })
      .catch(err => {
        res.send(err)
      })

  }

  static checkout(req, res) {
    const data = {
      rent_date: req.body.date,
      BookId: req.body.id
    }
    BookUser.create()
  }

  static rent(req, res) {

  }
}

module.exports = BookController