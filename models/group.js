var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	name: String,
	devices: [{type: Schema.ObjectId, ref: 'Device'}],
	created_at: Date,
	deleted_at: Date
});

var Group = mongoose.model('Log', groupSchema);

module.exports = Group;