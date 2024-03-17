const express = require('express');
// const passport = require('../config/passport'); // Assuming passport configuration is in the parent directory
const authController = require('../controllers/authController');

const router = express.Router();

function isLoggedIn(req,res,next) {
    req.user ? next() : res.sendStatus(401);
  }


// Registration route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Google Login
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback
// router.get('/google/callback', passport.authenticate('google', {
//   successRedirect: '/auth/google/success', // Redirect to a success page on successful login
//   failureRedirect: '/auth/google/failure', // Redirect to a failure page on failed login
// }));

// router.get('/google/success', isLoggedIn, (req, res) => {
//     let name = req.user.displayName;
//     res.send(`Hello ${name}`);
// });

// router.get('/google/failure', (req, res) => {
//     res.send("Oops something went wrong!");
// });

// Facebook Login
// router.get('/facebook', passport.authenticate('facebook'));

// // Facebook Callback
// router.get('/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: '/auth/success', // Redirect to a success page on successful login
//   failureRedirect: '/auth/failure', // Redirect to a failure page on failed login
// }));

module.exports = router;
