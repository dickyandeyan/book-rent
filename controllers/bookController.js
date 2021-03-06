const {
  Book,
  BookUser,
  User
} = require('../models')

const {
  createInvoice
} = require('../helpers/createInvoice');

class BookController {
  static showBook(req, res) {
    Book.findAll()
      .then(data => {
        // console.log(data);
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
      released_year: req.body.released_year,
      stock: +req.body.stock,
      price: +req.body.price
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
      released_year: req.body.released_year,
      stock: +req.body.stock,
      price: +req.body.price
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
          id,
          stock: 0
        }
      })
      .then(data => {
        res.redirect('/book')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static checkout(req, res) {
    Book.findAll()
      .then(data => {
        res.render('checkout', {
          data
        })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static cart(req, res) {
    const dataCheckout = {
      BookId: +req.params.id,
      UserId: +req.session.userId
    }
    BookUser.create(dataCheckout)
      .then(data => {
        return Book.decrement('stock', {
          where: {
            id: +req.params.id
          }
        })
      })
      .then(data => {
        res.redirect('/book/checkout')
      })
      .catch(err => {
        res.send(err.message)
      })
  }

  static buy(req, res) {
    const id = +req.session.userId
    BookUser.findAll({
        where: {
          UserId: id
        }
      })
      .then(data => {
        data.forEach(el => {
          Book.findAll({
              where: {
                id: el.BookId
              }
            })
            .then(data => {
              let invoice = data[0].dataValues
              return invoice
            })
        })
        res.redirect('/book')
      })
      .catch(err => {
        res.send(err)
      })
  }
}

module.exports = BookController