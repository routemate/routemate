const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

// redirect URI
router.use(
  '/google/oauth',
  loginController.getTokens,
  loginController.getUserInfo,
  userController.userAccount,
  userController.createToken,
  (req, res) => {
    res.cookie('token', res.locals.token);
    res.redirect('/');
  }
);

router.use('/google', loginController.googleOAuth, (req, res) => {
  res.json({ url: res.locals.redirect });
});

router.use('/authenticate', userController.authenticate, (req, res) => {
  return res.json({ authenticated: res.locals.authenticated });
});

router.use('/', (req, res) => {
  res.redirect('/');
});

module.exports = router;

const url = require('url');
