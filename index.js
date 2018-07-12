require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const projectsRoutes = require('./routes/projects');
const tasklistsRoutes = require('./routes/tasklists');
const milestonesRoutes = require('./routes/milestones');
const tasksRoutes = require('./routes/tasks');
const invitationsRoutes = require('./routes/invitations');
const accountRoutes = require('./routes/account');
const messageRepliesRoutes = require('./routes/messageReplies');
const savedTableViewsRoutes = require('./routes/savedTableViews');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const PORT = 8082;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors())
app.use(bodyParser.json());

// all routes here

// saved table view routes
app.use(
		'/api/saved-views',
		// loginRequired,
		// ensureCorrectUser,
		savedTableViewsRoutes);

// message reply routes
app.use(
		'/api/message-replies',
		// loginRequired,
		// ensureCorrectUser,
		messageRepliesRoutes);

// account routes
app.use(
		'/api/account',
		// loginRequired,
		// ensureCorrectUser,
		accountRoutes);

// invitations routes
app.use(
		'/api/invitations',
		// loginRequired,
		// ensureCorrectUser,
		invitationsRoutes);

// milestones router
app.use(
		'/api/tasks',
		// loginRequired,
		// ensureCorrectUser,
		tasksRoutes);

//auth routes
app.use('/api/auth', authRoutes);

// milestones router
app.use(
		'/api/milestones',
		// loginRequired,
		// ensureCorrectUser,
		milestonesRoutes);

// tasklists router
app.use(
		'/api/tasklists',
		// loginRequired,
		// ensureCorrectUser,
		tasklistsRoutes);

// projects router
app.use(
		'/api/projects',
		// loginRequired,
		// ensureCorrectUser,
		projectsRoutes);



// error handler
app.use(errorHandler);

let server = app.listen(PORT, function(){
	console.log(`Server starting on port ${PORT}`)
});
server.timeout = 60000;
