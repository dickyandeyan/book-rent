const express = require('express');
const app = express();
const router = require('./routes/index');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const {
  default: Swal
} = require('sweetalert2');

app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: false
}));

app.use(session({
  secret: 'random',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}));

app.use('/', router);
app.use
app.listen(PORT, () => {
  console.log(`Connected to http://localhost:${PORT}`);
})