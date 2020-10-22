const express = require('express');
const MemberController = require('../controllers/memberController');
const router = express.Router();


router.get('/', (req, res) => {
  res.send(`Connected`)
})

router.get('/register', MemberController.registerForm)
router.post('/register', MemberController.postRegister)
router.get('/login', MemberController.loginForm)
router.post('/login', MemberController.postLogin)


module.exports = router;