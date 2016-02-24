var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	area: {type: Schema.ObjectId, ref: 'Area', required: true},
	mac: {type: String},
	name: String,
	public_ip: String,
	public_port: Number,
	internal_ip: String,
	internal_port: Number,	
	created_at: Date,
	deleted_at: Date
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;