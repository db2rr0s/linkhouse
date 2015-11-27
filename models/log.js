var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
	user: {type: Schema.ObjectId, ref: 'User', required: true},
	action: String,	
	details: String,	
	created_at: Date	
});

var Log = mongoose.model('Log', logSchema);

module.exports = Log;