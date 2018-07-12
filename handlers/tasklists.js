const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const addTaskList = (tasklist) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundTasklist = await db.Tasklist.findOne({teamwork_id: tasklist.teamwork_id});
      if (foundTasklist) {
        foundTasklist.set(tasklist);
        await foundTasklist.save();
        resolve(foundTasklist);
      } else {
        let createdTasklist = await db.Tasklist.create(tasklist);
        resolve(createdTasklist);
      }
    } catch(err) {
      reject(err);
    }
  });
}

exports.proccessTasklists = async (req, res, next) => {
  try {
    let resultsArr = [];
    let tasklists = req.body.tasklists;
    for (let t of tasklists) {
      let tasklist = {
        teamwork_id: t.teamwork_id,
        teamworkProject_id: t.teamworkProject_id,
        projectName: t.projectName,
        taskName: t.taskName,
        complete: t.complete,
        status: t.status,
        uncompleteCount: t.uncompleteCount
      }
      let result = await addTaskList(tasklist);
      resultsArr.push(result);
    }
    return res.status(200).json({tasklistsAdded: [...resultsArr], message: `${resultsArr.length} tasklists were added to the database`})
  } catch(err) {
    return next(err);
  }
}
