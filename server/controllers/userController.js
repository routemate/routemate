const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const userController = {};

userController.userAccount = async (req, res, next) => {
  try {
    const name = res.locals.name;
    const email = res.locals.email;

    let results = await User.findOne({ email });

    if (!results) {
      results = await User.create({ name, email });
    }

    res.locals.userId = results._id.toHexString();
    return next();
  } catch (err) {
    console.error('The userAccount middleware returned an error: ' + err);
    return next(err);
  }
};

userController.createToken = (req, res, next) => {
  const email = res.locals.email;
  const id = res.locals.id;

  const token = jwt.sign({ sub: id, email }, process.env.secret, {
    expiresIn: '30m',
  });

  res.locals.token = token;
  next();
};

// {sub: id, email: email}

userController.authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) res.locals.authenticated = false;
  else {
    const decoded = jwt.verify(token, process.env.secret);
    let results = await User.findOne({ email: decoded.email });
    if (!results) res.locals.authenticated = false;
  }

  res.locals.authenticated = true;
  next();
};

module.exports = userController;
