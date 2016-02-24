var express = require('express');
var router = express.Router();

var Area = require('../models/area');

router.get('/', function(req, res, next) {
	Area.find(function(err, areas){
		if(err){
			res.send({status: 1, message: 'areas could not be retrieved', error: err});
			return;
		}

		res.send({status: 0, areas: areas});
	});
});

router.post('/', function(req, res, next){
	var area = new Area(req.body);	

	area.save(function(err){
		if(err){
			res.send({status: 1, message: 'error whiling save object', error: err});
			return;
		}

		res.send({status: 0, message: 'Area added.'});
	});
});

router.delete('/:id', function(req, res, next){
	Area.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.send({status: 1, message: 'error whiling delete object', error: err});
			return;
		}

		res.send({status: 0, message: 'Area deleted.'});
	});
});

module.exports = router;
