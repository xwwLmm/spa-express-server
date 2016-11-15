var express = require('express');
var router = express.Router();

/* GET home page. */
/**
 * 渲染出一个首页
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello ,Express world!' });
});

module.exports = router;
