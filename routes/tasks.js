const express = require('express');
const router = express.Router();
const { processTasks } = require('../handlers/tasks');

// prefixed with /api -> /api/tasks
//post new tasks
router.post('/', processTasks);

module.exports = router;
