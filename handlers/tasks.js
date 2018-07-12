const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const createTask = (task) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundTask = await db.Task.findOne({teamwork_id: task.teamwork_id});
      if (foundTask) {
        foundTask.set(task)
        await foundTask.save();
        resolve(foundTask);
      } else {
        let createdTask = await db.Task.create(task);
        resolve(createdTask);
      }
    } catch (err) {
      reject(err);
    }
  });
};

exports.processTasks = async(req, res, next) => {
  try {
    let resultsArr = [];
    let tasks = req.body['todo-items'];
    for (let t of tasks) {
      let formattedTask = {
        teamwork_id: t.id,
        completed: t.completed,
        hasUnreadComments: t['has-unread-comments'],
        content: t.content,
        teamworkProject_id: t['project-id'],
        projectName: t['project-name'],
        tasklistId: t['todo-list-id'],
        tasklistName: t['todo-list-name'],
        lastChangedOn: t['last-changed-on'],
        createdOn: t['created-on'],
        dueDate: t['due-date'],
        lockdownId: t.lockdownId,
        responsiblePartyFirstName: t['responsible-party-first-name'],
        responsiblePartyLastName: t['responsible-party-last-name'],
        creatorAvatarUrl: t['creator-avatar-url'],
      }
      let result = await createTask(formattedTask);
      resultsArr.push(result);
    }
    return res.status(200).json({tasksAdded: [...resultsArr], message: `${resultsArr.length} tasks were added to the Database`})
  } catch(err) {
    return next(err);
  }
}
