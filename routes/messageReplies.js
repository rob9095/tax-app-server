const express = require('express');
const router = express.Router();
const { processMessageReplies } = require('../handlers/messageReplies');

// creates MessageReply doc and saves to Projects
// POST Message Replies -> /api/message-replies
router.post('/', processMessageReplies);

module.exports = router;
