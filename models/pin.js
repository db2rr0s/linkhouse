var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
	device: {type: Schema.ObjectId, ref: 'Device', required: true},
	name: String,
	state: Boolean
});

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;