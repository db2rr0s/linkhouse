var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	area: {type: Schema.ObjectId, ref: 'Area', required: true},
	type: {type: String, enum: ['S', 'T']},
	mac: {type: String},
	name: String,
	status: String,
	signal: Number,
	public_ip: String,
	public_port: Number,
	internal_ip: String,
	internal_port: Number,	
	created_at: Date,
	deleted_at: Date
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;