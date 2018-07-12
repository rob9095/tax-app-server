const mongoose = require('mongoose');

const messageReplySchema = new mongoose.Schema({
  teamwork_id: {
    type: Number,
    unique: true,
    required: true,
  },
  messageId: {
    type: Number,
    required: true,
  },
  projectId: {
    type: Number,
    required: true,
  },
  isRead: {
    type: Number,
  },
  numNotified: {
    type: Number,
  },
  postedOn: {
    type: Date,
  },
  lastChangedOn: {
    type: Date,
  },
  htmlBody: {
    type: String,
  },
  body: {
    type: String,
  },
  authorAvatarUrl: {
    type: String,
  },
  authorFirstname: {
    type: String,
  },
  authorLastname: {
    type: String,
  },
  replyNo: {
    type: Number,
  },
})


const MessageReply = mongoose.model('MessageReply', messageReplySchema);

module.exports = MessageReply;
