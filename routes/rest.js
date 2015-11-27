var express = require('express');
var router = express.Router();

var Role = require('../models/role');
var User = require('../models/user');
var Settings = require('../models/settings');
var Device = require('../models/device');
var Group = require('../models/group');
var Port = require('../models/port');
//var Log = require('../models/log');

// POG
delete require('mongoose').connection.models['Log'];
var Log = require('../models/log');

router.get('/', function(req, res, next) {
	/*Role.findOne(function(err, role){
		console.log('recuperado');
		console.log(role)
		var user = new User({email: 'reginaldodbarros@gmail.com', password: 'teste', username: 'Reginaldo Barros', role: role});
		user.save(function(err){
			console.log('salvou: ' + err);
			res.send('rest is up');
		});
	});  	*/

	res.send('rest is up');
});

module.exports = router;
