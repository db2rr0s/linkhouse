var express = require('express');
var router = express.Router();

var Device = require('../models/device');
var Pin = require('../models/pin');

router.get('/', function(req, res, next) {
	Pin.find({device: req.query.device}).exec(function(err, pins){
		if(err){
			res.send({status: 1, message: 'pins could not be retrieved', error: err});
			return;
		}

		res.send({status: 0, pins: pins});
	});
});

router.post('/', function(req, res, next){	
	var pin = new Pin(req.body);	
	pin.created_at = new Date();

	pin.save(function(err){
		if(err){
			res.send({status: 1, message: 'error whiling save object', error: err});
			return;
		}

		res.send({status: 0, message: 'Pin added.'});
	});
});

router.delete('/:id', function(req, res, next){
	Pin.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send({status: 1, message: 'error whiling delete object', error: err});
			return;
		}

		res.send({status: 0, message: 'Pin deleted.'});
	});
});

module.exports = router;
