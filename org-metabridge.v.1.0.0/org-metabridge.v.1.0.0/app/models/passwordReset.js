const mongoose = require('mongoose');

const passWordSchema = new mongoose.Schema({
  email: { type: String, required: true },
  // password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
});

module.exports = mongoose.model('PasswordReset', passWordSchema);

// const mongoose = require('mongoose');

// const passWordSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   emailVerified: { type: Boolean, default: false }, // New field for email verification
//   resetToken: String,
//   resetTokenExpiry: Date,
// });

// const Password = mongoose.model('Password', passWordSchema);

// module.exports = Password;
