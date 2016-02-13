var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Device = require('../models/device');

router.get('/', function(req, res, next) {
	Device.find(function(err, devices){
		if(err){
			res.send({status: 1, message: 'devices could not be retrieved', error: err});
			return;
		}

		res.send({status: 0, devices: devices});
	});
});

router.post('/', function(req, res, next){
	User.findOne(function(err, user){
		if(err){
			res.send({status: 1, message: 'user not found', error: err});
			return;
		}

		var device = new Device(req.body);
		device.created_at = new Date();
		device.user = user;

		device.save(function(err){
			if(err){
				res.send({status: 1, message: 'error whiling save object', error: err});
				return;
			}

			res.send({status: 0, message: 'Device added.'});
		});
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
