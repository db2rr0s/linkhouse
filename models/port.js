var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var portSchema = new Schema({
	device: {type: Schema.ObjectId, ref: 'Device', required: true},
	name: String,
	state: String,
	number: Number,
	created_at: Date,
	deleted_at: Date
});

var Port = mongoose.model('Port', portSchema);

module.exports = Port;