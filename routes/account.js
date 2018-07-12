const express = require('express');
const router = express.Router();
const { updateAccount } = require('../handlers/account');

// update user account -> /api/account/update
router.post('/update', updateAccount);

module.exports = router;
