var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,	
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	username: {type: String, required: true},
	role: {type: Schema.ObjectId, ref: 'Role'},
	created_at: Date,
	updated_at: Date,
	deleted_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;