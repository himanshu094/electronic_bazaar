const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  agency: {
    type: String,
  },
  region: {
    type: String,
  },
  licenseNumber: {
    type: String,
  },
  specialties: {
    type: [String],
  },
  languages: {
    type: [String],
  },
  profilePicture: {
    type: String, // Store the URL or path to the profile picture
  },
  biography: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
