var express = require('express');
var router = express.Router();

router.get('/index', function(req, res, next) {
  res.render('partial_index');
});

router.get('/areas', function(req, res, next) {
  res.render('partial_areas');
});

router.get('/devices', function(req, res, next) {
  res.render('partial_devices');
});

module.exports = router;
