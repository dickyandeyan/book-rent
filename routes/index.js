const express = require('express');
const isLoggedIn = require('../middleware/mw')
const UserController = require('../controllers/userController');
const BookController = require('../controllers/bookController');
const router = express.Router();
const book = require('./book')


router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)
router.get('/logout', UserController.getLogout)

router.get('/', BookController.showBook);

router.use(isLoggedIn);

router.use('/book', book);


module.exports = router;