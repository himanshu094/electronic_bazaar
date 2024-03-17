const Admin = require("../models/admin"); // Assuming your admin model is exported as 'Admin'
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Registration controller
exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      currentLocation,
      region,
      firstName,
      lastName,
      role,
    } = req.body;

    // Check if the user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new admin user
    const admin = new Admin({
      username,
      email,
      passwordHash,
      currentLocation,
      region,
      firstName,
      lastName,
      role,
    });

    await admin.save();

    //To do add role : admin

    // Generate a JWT token for the newly registered admin using the secret key from the .env file
    const token = jwt.sign({ userId: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error,
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the admin user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify the password
    const validPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //To do add role : admin
    // Generate a JWT token for the authenticated admin user using the secret key from the .env file
    const token = jwt.sign({ userId: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
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
      error: error,
    });
  }
};

//To do error Save in db
