const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  invitedByEmail: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
