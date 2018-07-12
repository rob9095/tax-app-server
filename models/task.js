const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  teamwork_id: {
    type: Number,
    required: true,
    unique: true
  },
  completed: {
    type: Boolean,
    required: true,
  },
  hasUnreadComments: {
    type: Boolean,
    required: true,
  },
  content: {
    type: String,
  },
	teamworkProject_id: {
    type: Number,
    required: true
	},
  projectName: {
    type: String,
    required: true
	},
  tasklistId: {
    type: Number,
    required: true
  },
  tasklistName: {
    type: String,
    required: true,
  },
  lastChangedOn: {
    type: Date,
  },
  createdOn: {
    type: Date,
  },
  dueDate: {
    type: String,
  },
  lockdownId: {
    type: Number,
  },
  responsiblePartyFirstName: {
		type: String,
	},
	responsiblePartyLastName: {
		type: String,
	},
  creatorAvatarUrl: {
		type: String,
	},
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
