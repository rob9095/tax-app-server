const mongoose = require('mongoose');
const SavedTableView = require('./savedTableView');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	profileImageUrl: {
		type: String,
	},
	apiKey: {
		type: String,
	},
	isSuperAdmin: {
		type: Boolean,
		default: false,
	},
	setupComplete: {
		type: Boolean,
		default: true,
	},
	savedTableViews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SavedTableView',
	}],
	defaultView: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'SavedTableView',
	},
});

userSchema.pre('save', async function(next) {
	try {
		if(!this.isModified('password')){
			return next();
		}
		let hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		return next();
	} catch (err) {
		return next(err);
	}
});

// need to add remove hook here to delete all saved views and invitations for user being removed
// userSchema.pre('remove', async function(next) {
// 	try {
// 	} catch(err) {
// 		return next(err);
// 	}
// })

userSchema.methods.comparePassword = async function(candidatePassword, next) {
	try {
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch(err){
		return next(err);
	}
};

const User = mongoose.model('User', userSchema);

module.exports = User;
