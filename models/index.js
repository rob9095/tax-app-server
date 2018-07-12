const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/tax-app-testing', {
	keepAlive: true
});

module.exports.User = require('./user');
module.exports.Project = require('./project');
module.exports.Tasklist = require('./tasklist');
module.exports.Task = require('./task');
module.exports.Invitation = require('./invitation');
module.exports.MessageReply = require('./messageReply');
module.exports.SavedTableView = require('./savedTableView');
