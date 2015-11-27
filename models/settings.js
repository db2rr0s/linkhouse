var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingsSchema = new Schema({
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	key: String,	
	value: String,	
	created_at: Date,
	updated_at: Date,
	deleted_at: Date
});

var Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;