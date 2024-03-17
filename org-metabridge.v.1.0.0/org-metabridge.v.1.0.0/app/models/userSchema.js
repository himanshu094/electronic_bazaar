const mongoose = require("mongoose");

// Define the regular user schema
const regularUserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
  },
  signupType: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  currentLocation: {
    type: String,
  },
  status: {
    type: String,
    default: "true",
  },
  region: {
    type: String,
  },
  // Add more fields as needed
  // For example, you can add an array of user roles: [{ type: String }]
});

// Create the regular user model
const User = mongoose.model("User", regularUserSchema);

module.exports = User;
