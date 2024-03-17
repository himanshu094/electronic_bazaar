const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user'); // Import your user model

require('dotenv').config();

// Google OAuth configuration
passport.use(new GoogleStrategy({
  // Google OAuth credentials
  clientID:process.env.GoogleClientID,
  clientSecret:process.env.GoogleClientSecret,
  callbackURL:'http://localhost:3000/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  // Check if the user exists in your database; if not, create a new user
  // Then, call done() with the user object
  // Check if the user exists in your database based on the provider and user ID
  // Using async/await with the promise returned by findOne
try {
    const existingUser = await User.findOne({ provider: 'google', id: profile.id });
  
    if (existingUser) {
      // User already exists, return the existing user
      return done(null, existingUser);
    } else {
      // User doesn't exist, create a new user
      const newUser = new User({
        provider: 'google',
        id: profile.id,
        displayName: profile.displayName,
        email: profile.email,
        // Add more fields as needed
      });
  
      await newUser.save();
      return done(null, newUser);
    }
  } catch (err) {
    return done(err);
  }

}));


passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null,user);
})
// Facebook OAuth configuration
passport.use(new FacebookStrategy({
  // Facebook OAuth credentials
  clientID: 'your-facebook-client-id',
  clientSecret: 'your-facebook-client-secret',
  callbackURL: 'http://your-server-url/auth/facebook/callback',
},
(accessToken, refreshToken, profile, done) => {
  // Check if the user exists in your database; if not, create a new user
  // Then, call done() with the user object
}));

// ... (serialize and deserialize user functions)

module.exports = passport;
