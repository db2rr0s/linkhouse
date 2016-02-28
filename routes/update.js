var express = require('express');
var router = express.Router();

var Device = require('../models/device');
var Pin = require('../models/pin');

router.post('/', function(req, res, next){
	// { id: mac, status: ###### }

	var update = JSON.parse(req.body);
	Device.findOne({mac: update.id}).exec(function(err, device){
		if(err) return;

		device.state = update.status;

		Pin.find({device: device}).exec(function(err, pins){
			
		});
	});
});

module.exports = router;
