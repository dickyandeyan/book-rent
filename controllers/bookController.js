const { Book, BookUser } = require('../models')

class BookController {
  static showBook(req, res) {
    Book.findAll()
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addBook(req, res) {
    const dataAddBook = {
      title: req.body.title,
      author: req.body.author,
      released_year: req.body.released_year
    }
    Book.create(dataAddBook)
      .then(data => {
        res.redirect('/')
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
    Book.update(dataUpdateBook, { where: { id } })
      .then(data => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static deleteBook(req, res) {
    const id = +req.params.id
    Book.destroy({ where: { id } })
      .then(data => {
        res.redirect('/')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = BookController