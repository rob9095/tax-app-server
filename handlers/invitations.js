const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

exports.addInvitation = async(req, res, next) => {
  try {
    let foundInvitingUser = await db.User.findOne({email: req.body.invitedByEmail})
    if (foundInvitingUser === null) {
      return next({
        status: 400,
        message: 'Please login to create invites',
      })
    }
    let foundInvitedUser = await db.User.findOne({email: req.body.email})
    if (foundInvitedUser !== null) {
      return next({
        status: 400,
        message: 'This email is already signed up',
      })
    }
    let invitation = await db.Invitation.create(req.body);
    let foundInvitation = await db.Invitation.findById(invitation.id);
    return res.status(200).json(foundInvitation)
  } catch(err) {
    if(err.code === 11000) {
      err.message = 'Email already invited.';
    }
    return next(err);
  }
}


exports.getInvitations = async(req, res, next) => {
  try {
    let foundInvites = await db.Invitation.find()
    return res.status(200).json(foundInvites);
  } catch(err) {
    return next(err);
  }
}

exports.removeInvitation = async(req, res, next) => {
  try {
    let foundInvitation = await db.Invitation.findById(req.params.invite_id);
    if (foundInvitation === null) {
      return next({
        status: 400,
        message: 'Invitation not found',
      })
    }
    await foundInvitation.remove();
    return res.status(200).json(foundInvitation)
  } catch(err) {
    return next(err);
  }
}
