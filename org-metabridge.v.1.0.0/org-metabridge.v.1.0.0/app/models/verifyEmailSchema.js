const mongoose = require('mongoose');

// Define the schema for email verification
const verifyEmailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who needs email verification
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true, // OTP (One-Time Password)
  },
  otpExpiration: {
    type: Date,
    required: true, // Expiration date and time for the OTP
  },
  isVerified: {
    type: Boolean,
    default: false, // Indicates whether the email has been verified
  },
});

// Create the model for email verification
const VerifyEmail = mongoose.model('VerifyEmail', verifyEmailSchema);

module.exports = VerifyEmail;
