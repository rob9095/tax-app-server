const mongoose = require('mongoose');

const tasklistSchema = new mongoose.Schema({
  teamwork_id: {
    type: Number,
    required: true,
    unique: true
  },
	teamworkProject_id: {
    type: Number,
    required: true
	},
  projectName: {
    type: String,
    required: true
	},
  projectName: {
    type: String,
    required: true
	},
  taskName: {
		type: String,
		required: true
	},
  complete: {
		type: Boolean,
		required: true
	},
	status: {
		type: String,
		required: true
	},
  uncompleteCount: {
		type: Number
	},
  lastChangedOn: {
    type: Date,
  }
});

const Tasklist = mongoose.model('Tasklist', tasklistSchema);

module.exports = Tasklist;
