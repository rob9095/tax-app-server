const express = require('express');
const router = express.Router();
const {
  mapTasksToProjects,
  getBasicProjects,
  getAllProjects,
  proccesProjects,
  updateProjectInternalMessage,
  removeProject,
 } = require('../handlers/projects');

// prefixed with /api -> /api/projects
//post new projects
router.post('/', proccesProjects);

//get all projects basic
router.get('/', getBasicProjects);

//get all projects detailed
router.get('/detailed', getAllProjects)

//post to map projectsInDB
router.post('/map-projects', mapTasksToProjects)

//delete project and related tasklists, tasks, message replies
router.delete('/delete/:teamwork_project_id', removeProject)

//post to update the internalProjectMessageId
router.post('/update-message-id', updateProjectInternalMessage)

module.exports = router;
