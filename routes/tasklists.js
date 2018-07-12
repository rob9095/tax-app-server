const express = require('express');
const router = express.Router();
const { proccessTasklists } = require('../handlers/tasklists');

//add tasklist to DB, prefixed with /api -> /api/tasklists
router.post('/', proccessTasklists);

//get all tasklists
// router.get('/tasklists', getAllTasklists);

module.exports = router;
