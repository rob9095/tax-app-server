const mongoose = require('mongoose');
const db = require('../models');
const User = require('./user');

const SavedTableViewSchema = new mongoose.Schema({
  table: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  usernameTitle: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
    required: true,
  },
  username: {
    type: String,
  },
  profileImageUrl: {
		type: String,
	},
  headerState: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  bodyState: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  isShared: {
    type: Boolean,
    default: false,
  }
});

SavedTableViewSchema.pre('remove', async function(next) {
	try {
		// find the related user
		let user = await db.User.findById(this.user);
		// remove the id of the saved view from the user
		user.savedTableViews.remove(this.id);
		await user.save();
		return next();
	} catch(err) {
		return next(err);
	}
})

const SavedTableView = mongoose.model('SavedTableView', SavedTableViewSchema);

module.exports = SavedTableView;
