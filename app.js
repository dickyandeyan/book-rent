const express = require('express');
const app = express();
const router = require('./routes/index');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: false
}));

app.use('/', router);

app.listen(port, () => {
  console.log(`Connected to http://localhost:${port}`);
})