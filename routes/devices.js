var express = require('express');
var router = express.Router();

var Area = require('../models/area');
var Device = require('../models/device');

router.get('/', function(req, res, next) {
	if(req.query.area){
		Device.find({area: req.query.area}).populate('area').exec(function(err, devices){
			if(err){
				res.send({status: 1, message: 'devices could not be retrieved', error: err});
				return;
			}

			res.send({status: 0, devices: devices});
		});
	} else {
		Device.find().populate('area').exec(function(err, devices){
			if(err){
				res.send({status: 1, message: 'devices could not be retrieved', error: err});
				return;
			}

			res.send({status: 0, devices: devices});
		});
	}	
});

router.post('/', function(req, res, next){
	var device = new Device(req.body);
	device.area = JSON.parse(req.body.area)._id;
	device.created_at = new Date();	

	device.save(function(err){
		if(err){
			res.send({status: 1, message: 'error whiling save object', error: err});
			return;
		}

		res.send({status: 0, message: 'Device added.'});
	});
});

router.delete('/:id', function(req, res, next){
	Device.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send({status: 1, message: 'error whiling delete object', error: err});
			return;
		}

		res.send({status: 0, message: 'Device deleted.'});
	});
});

module.exports = router;
