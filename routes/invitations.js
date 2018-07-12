const express = require('express');
const router = express.Router();
const { getInvitations, addInvitation, removeInvitation } = require('../handlers/invitations');

// add invitation email -> /api/invitations
router.post('/', addInvitation);

// get invitations for user -> /api/invitations
router.get('/', getInvitations);

// delete invitation email -> /api/invitations/:invite_id
router.delete('/:invite_id', removeInvitation);

module.exports = router;
