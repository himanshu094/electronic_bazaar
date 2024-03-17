const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  currentLocation: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

// Create the admin model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
