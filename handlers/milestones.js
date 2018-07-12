const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

//milestones are the same as tasklists, so we will just update them instead of creating milestones in the db
const updateTasklist = (milestone) => {
  return new Promise((resolve, reject) => {
    try {
      db.Tasklist.findOne({teamwork_id: milestone.tasklists[0].id})
      .then(async (tasklist)=>{
        if (tasklist === null) {
          resolve();
        }
        tasklist.lastChangedOn = milestone['completed-on'];
        await tasklist.save();
        resolve(tasklist)
      }).catch(err => {
        reject(err);
      })
    } catch(err) {
      reject(err);
    }
  });
}

exports.processMilestones = async (req, res, next) => {
  try {
    let resultsArr = [];
    let milestones = req.body.milestones;
    for (let m of milestones) {
      let result = await updateTasklist(m);
      resultsArr.push(result);
    }
    return res.status(200).json({tasklistsUpdated: [resultsArr], message: `${resultsArr.length} tasklists were updated`})
  } catch(err) {
    return next(err);
  }
}
