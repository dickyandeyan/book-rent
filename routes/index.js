const express = require('express');
const UserController = require('../controllers/userController');
const BookController = require('../controllers/bookController');
const router = express.Router();
const book = require('./book')


router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.loginForm)
router.post('/login', UserController.postLogin)
router.get('/', BookController.showBook);

router.use(function (req, res, next) {
  if (!req.session.userId) {
    const error = 'Login First!!'
    res.redirect(`/login?error=${error}`);
  } else {
    next()
  }
})

router.use('/book', book);


module.exports = router;