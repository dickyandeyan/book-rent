const express = require('express');
const MemberController = require('../controllers/memberController');
const BookController = require('../controllers/bookController');
const router = express.Router();


router.get('/register', MemberController.registerForm)
router.post('/register', MemberController.postRegister)
router.get('/login', MemberController.loginForm)
router.post('/login', MemberController.postLogin)

router.use(function(req, res, next) {
  if (!req.session.userId) {
    const error = 'Login First!!'
    res.redirect(`/login?error=${error}`);
  } else {
    next()
  }
})

router.get('/', BookController.homePage);
router.get('/books', BookController.homePage);


module.exports = router;