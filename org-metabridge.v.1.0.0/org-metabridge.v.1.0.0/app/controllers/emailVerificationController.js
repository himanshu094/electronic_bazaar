const VerifyEmail = require('../models/verifyEmailSchema');
const User = require('../models/userSchema');

// Controller to verify email using OTP
exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the verification record based on the email
    const verificationRecord = await VerifyEmail.findOne({ email });

    if (!verificationRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or OTP.',
      });
    }

    // Check if the OTP matches and is not expired
    if (verificationRecord.otp !== otp || verificationRecord.otpExpiration < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or OTP has expired.',
      });
    }

    // Mark the email as verified
    verificationRecord.isVerified = true;
    await verificationRecord.save();

    // Update the user's email verification status
    await User.updateOne({ email }, { isEmailVerified: true });

    res.status(200).json({
      success: true,
      message: 'Email verification successful.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Email verification failed.',
      error: error.message,
    });
  }
};
