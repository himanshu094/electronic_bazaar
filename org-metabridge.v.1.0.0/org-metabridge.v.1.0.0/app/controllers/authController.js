const User = require("../models/userSchema");
const VerifyEmail = require("../models/verifyEmailSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // Import dotenv package

// Load environment variables from the .env file
dotenv.config();

exports.register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      mobileNumber,
      countryCode,
      password,
      currentLocation,
      region,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Get the current date and time
    const registrationDate = new Date();

    // Generate an OTP
    // const otp = generateOTP();
    const otp = "123456";

    // // Calculate the expiration time (e.g., 10 minutes from now)
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);

    //To do nodemailer to send OTP

    // Create a new user
    const newUser = new User({
      fullname,
      countryCode,
      signupType: "Manual",
      mobileNumber,
      isEmailVerified: false,
      email,
      passwordHash,
      registrationDate,
      currentLocation,
      region,
    });

    await newUser.save();

    // Create a verification record in the VerifyEmail collection
    const verificationRecord = new VerifyEmail({
      user: newUser._id,
      email,
      otp,
      otpExpiration,
    });

    // Save the verification record
    await verificationRecord.save();

    // Generate a JWT token for the newly registered user using a secret key
    // const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
    //   expiresIn: "1h",
    // });
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { token },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify the password
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate a JWT token for the authenticated user using the secret key from the .env file
    // const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    //   expiresIn: "1h",
    // });
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
