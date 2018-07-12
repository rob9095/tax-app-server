const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const createMessageReply = (message) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(async ()=> {
        let updateCheck = await db.MessageReply.findOne({teamwork_id: message.teamwork_id})
        if (updateCheck) {
          // just remove and re-create for now
          updateCheck.remove()
        }
        let createdMessageReply = await db.MessageReply.create(message);
        let foundMessageReply = await db.MessageReply.findById(createdMessageReply.id)
        resolve(foundMessageReply);
      }, 200)
    } catch(err) {
      if(err.code === 11000) {
        err.message = 'Reply already created';
        resolve(err.message);
      }
      reject(err);
    }
  })
}

exports.processMessageReplies = async (req,res,next) => {
  try {
    const resultsArr = [];
    for (let m of req.body) {
      let result = await createMessageReply(m);
      resultsArr.push(result)
    }
    let foundProject = await db.Project.findOne({teamwork_id: req.body[0]['projectId']})
    if (foundProject) {
      foundProject.messageReplies = resultsArr;
      foundProject.save();
    }
    return res.status(200).json({messageRepliesAdded: [...resultsArr]})
  } catch(err) {
    return next(err);
  }
}
