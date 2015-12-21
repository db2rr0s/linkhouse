var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	name: String,
	port: Number,
	public_ip: String,
	public_port: Number,
	internal_ip: String,
	internal_port: Number,
	groups: [{type: Schema.ObjectId, ref: 'Group'}],
	created_at: Date,
	deleted_at: Date
});

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;