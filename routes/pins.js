var express = require('express');
var router = express.Router();

var Area = require('../models/area');
var Device = require('../models/device');
var Pin = require('../models/pin');

router.get('/', function(req, res, next) {
	if(req.query.device){
		Pin.find({device: req.query.device}).populate('device').exec(function(err, pins){
			if(err){
				res.send({status: 1, message: 'pins could not be retrieved', error: err});
				return;
			}

			res.send({status: 0, pins: pins});
		});
	} else {
		Pin.find().populate('device').exec(function(err, pins){
			if(err){
				res.send({status: 1, message: 'pins could not be retrieved', error: err});
				return;
			}

			/*
			Pin.populate(docs, {path: 'device.area', model: 'Area'}, function(err, pins){
				if(err){
					res.send({status: 1, message: 'pins could not be retrieved', error: err});
					return;
				}

				res.send({status: 0, pins: pins});
			});
			*/

			res.send({status: 0, pins: pins});
		});
	}	
});

router.post('/', function(req, res, next){	
	var pin = new Pin(req.body);

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
