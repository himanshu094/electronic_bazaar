const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  provider: String, // To store "google" or "facebook" depending on the provider
  id: String, // OAuth provider's unique user ID
  displayName: String, // User's display name
  email: String, // User's email (if provided by the OAuth provider)
  status: String, // User's email (if provided by the OAuth provider)
  // Add more fields as needed
});

// Create the user model
const User = mongoose.model("user", userSchema);

module.exports = User;
