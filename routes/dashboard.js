var express = require('express');
var router = express.Router();

var Area = require('../models/area');
var Device = require('../models/device');
var Pin = require('../models/pin');

router.get('/', function(req, res, next) {	
	//TODO: GAMBIARRA TOTAL
	Area.find(function(err, areas){
		if(err){
			res.send({status: 1, message: 'areas could not be retrieved', error: err});
			return;
		}

		Pin.find().populate('device').exec(function(err, pins){
			if(err){
				res.send({status: 1, message: 'pins could not be retrieved', error: err});
				return;
			}

			var data = [];			
			for(var i = 0; i < areas.length; i++){
				var area = JSON.parse(JSON.stringify(areas[i]));
				area.devices = [];

				for(var j = 0; j < pins.length; j++){
					var pin = JSON.parse(JSON.stringify(pins[j]));
					
					if(pin.device.area.toString() == area._id.toString() && area.devices.indexOf(pin.device) < 0){						
						area.devices.push(pin.device);
					}
				}

				for(var j = 0; j < area.devices.length; j++){
					var device = area.devices[j];					
					device.pins = pins.filter(function(pin){
						return pin.device._id == device._id;
					});
				}

				data.push(area);
			}

			res.send({status: 0, areas: data});
		});

		/*for(var i = 0; i < areas.length; i++){
			var area = areas[i];			
			Device.find({area: area._id}, function(err, devices){
				if(err){
					res.send({status: 1, message: 'devices could not be retrieved', error: err});
					return;
				}	

				for(var j = 0; j < devices.length; j++){
					var device = devices[j];
					if(device.type == 'S'){
						Pin.find({device: device}, function(err, pins){
							if(err){
								res.send({status: 1, message: 'pins could not be retrieved', error: err});
								return;
							}

							device.pins = pins;
						});
					}
				}

				area.devices = devices;
			});

			res.send({status: 0, areas: data});
		}*/
	});	
});

module.exports = router;
