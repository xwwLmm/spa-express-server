var express = require('express');
var router = express.Router();
var userDao = require('../dao/eqlDao');

/* GET users listing. */
router.get('/addUser', function(req, res, next) {
  res.render('home');
});
module.exports = router;
