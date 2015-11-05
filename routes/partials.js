var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  res.render('partial_index');
});

router.get('/start', function(req, res, next) {
  res.render('partial_start');
});

module.exports = router;
