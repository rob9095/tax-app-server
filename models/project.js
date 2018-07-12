const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  teamwork_id: {
    type: Number,
    required: true,
    unique: true
  },
	name: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		required: true
	},
  lastTasklistChanged: {
    type: String,
  },
  tasklists: [{
    type: mongoose.Schema.Types.Mixed
  }],
  tasks: [{
    type: mongoose.Schema.Types.Mixed
  }],
  messageReplies: [{
    type: mongoose.Schema.Types.Mixed
  }],
  internalProjectMessageId: {
    type: String,
  },
  preparer: {
    type: String,
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
