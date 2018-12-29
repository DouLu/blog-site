const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.render('login');
});
router.get('/home', function (req, res) {
  res.locals.serverError = false;
  res.render('home');
});

module.exports = router;