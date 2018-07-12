const express = require('express');
const router = express.Router();
const { processMilestones } = require('../handlers/milestones');

//update Tasklists in DB related to the milestone, prefixed with /api -> /api/milestones
router.post('/', processMilestones);

module.exports = router;
