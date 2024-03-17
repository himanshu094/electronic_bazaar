const crypto = require('crypto');
const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
const PasswordReset = require('../models/passwordReset');
const User = require('../models/userSchema');


// Controller logic for handling password reset
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists with the provided email address
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Generate a password reset token and set an expiration time
    // const resetToken = crypto.randomBytes(20).toString('hex');
    const resetToken = 123456;
    const resetTokenExpiry = Date.now() + 3600000; // Token is valid for 1 hour

    // Create a new instance of the PasswordReset model
    const passwordReset = new PasswordReset({
      email: user.email, // Assuming your PasswordReset schema has an email field
      resetToken,
      resetTokenExpiry,
    });

    // Save the password reset document
    await passwordReset.save();

    // Send an email to the user with the password reset link (uncomment and configure this section)
    // ...
      // Send an email to the user with the password reset link
    //   const transporter = nodemailer.createTransport({
    //     // Set up your email service configuration here
    //   });
    // const transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //       user: 'your_email@gmail.com',          // Your Gmail email address
    //       pass: 'your_email_password',          // Your Gmail password or app-specific password
    //     },
    //   });
  
      // const mailOptions = {
      //   from: 'your_email@example.com',
      //   to: user.email,
      //   subject: 'Password Reset Request',
      //   text: `You are receiving this email because a password reset request has been made for your account. To reset your password, please click on the following link:\n\n${req.headers.origin}/reset/${resetToken}\n\nIf you did not request this password reset, you can safely ignore this email. Your password will remain unchanged.`,
      // };
  
      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error(error);
      //     return res.status(500).json({ message: 'Failed to send password reset email.' });
      //   }
  
      // return res.json({ success: true, message: 'Password reset email sent successfully.' });
      // });

    return res.json({ success: true, message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error, message: 'An error occurred while processing your request.' });
  }
};

  
  // Controller logic for handling password reset
exports.resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;
  
    try {
      // Check if a password reset entry exists with the provided resetToken
      const passwordReset = await PasswordReset.findOne({
        resetToken,
        resetTokenExpiry: { $gt: Date.now() },
      });
  
      if (!passwordReset) {
        return res.status(400).json({ message: 'Invalid or expired reset token.' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password in the "User" collection
      // Here, you might want to find the user by email, assuming you have a field to uniquely identify the user
      // Replace 'email' with the appropriate field to identify the user
      const user = await User.findOne({ email: passwordReset.email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Update the user's password
      user.passwordHash = hashedPassword;
  
      // Clear the password reset token and token expiry in the "PasswordReset" collection
      passwordReset.resetToken = undefined;
      passwordReset.resetTokenExpiry = undefined;
  
      await Promise.all([user.save(), passwordReset.save()]);
  
      return res.json({ success:true, message: 'Password reset successfully.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while processing your request.' });
    }
  };