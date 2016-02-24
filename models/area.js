var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var areaSchema = new Schema({	
	name: String	
});

var Area = mongoose.model('Area', areaSchema);

module.exports = Area;