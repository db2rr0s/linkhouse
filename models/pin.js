var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
	device: {type: Schema.ObjectId, ref: 'Device', required: true},
	type: {type: String, enum: ['S', 'T']},
	name: String,
	created_at: Date,
	deleted_at: Date
});

var Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;