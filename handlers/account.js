const db = require('../models');
const jwt = require('jsonwebtoken');

exports.updateAccount = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    if (user === null) {
      return next({
        status: 400,
        message: 'Unable to update user',
      })
    }
    const allowedUpdates = ['username', 'apiKey', 'password', 'profileImageUrl', 'setupComplete'];
    for (prop of allowedUpdates) {
      // does the allowed prop exist in the request? lets update it then!
      req.body[prop] ? user[prop] = req.body[prop] : null
    }
    await user.save();
    let newUser = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl, email, apiKey, savedViews, defaultView, setupComplete, isSuperAdmin } = newUser;
    let token = jwt.sign(
      {
        id,
				username,
				profileImageUrl,
				email,
				apiKey,
				savedViews,
				defaultView,
				setupComplete,
				isSuperAdmin,
      },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
				username,
				profileImageUrl,
				email,
				apiKey,
				savedViews,
				defaultView,
				setupComplete,
				isSuperAdmin,
        token
      });
  } catch(err) {
    if(err.code === 11000) {
      err.message = 'Sorry, that username and/or email has been taken.'
    }
    if(err._message === 'User validation failed') {
      err.message = `Sorry, we can't update your account with this information. Double check the feilds and try again.`
    }
    return next({
      status:400,
      message: err.message
    });
  }
}
