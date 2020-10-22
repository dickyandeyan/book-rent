const router = require('express').Router()
const BookController = require('../controllers/bookController')

router.get('/', BookController.showBook)
router.get('/add', BookController.addBookForm)
router.post('/add', BookController.addBook)
router.get('/edit/:id', BookController.editBookForm)
router.post('/edit/:id', BookController.editBook)
router.get('/delete/:id', BookController.deleteBook)
router.get('/checkout', BookController.checkout)
router.get('/checkout/cart/:id', BookController.cart)
router.get('/checkout/buy', BookController.buy)

module.exports = router