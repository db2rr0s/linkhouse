var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  res.render('partial_index', { title: 'TESTE Express' });
});

router.get('/start', function(req, res, next) {
  res.render('partial_start', { title: 'TESTE Express' });
});

module.exports = router;
