const User = require("../models/user");

// Get all Users

exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const fullnameQuery = req.query.fullname;
    const emailQuery = req.query.email;
    const mobileNumberQuery = req.query.mobileNumber;

    const query = {};

    if (fullnameQuery) {
      query.fullname = { $regex: new RegExp(`.*${fullnameQuery}.*`, "i") };
    }
    if (emailQuery) {
      query.email = { $regex: new RegExp(`.*${emailQuery}.*`, "i") };
    }
    if (mobileNumberQuery) {
      query.mobileNumber = Number(mobileNumberQuery);
    }

    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    const users = await User.find(query, { passwordHash: 0 })
      .skip((page - 1) * limit)
      .limit(limit);

    if (users.length === 0) {
      return res.status(404).json({ error: "No matching users found" });
    }

    res.status(200).json({
      users,
      page,
      limit,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

// Get user by ID
exports.getUserID = async (req, res) => {
  const UserID = req.params.id;
  try {
    const user = await User.findById(UserID, { passwordHash: 0 });
    if (!user) {
      res.status(404).json({ error: "user not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

// change user status isActive true/false
exports.changeUserStatus = async (req, res) => {
  const { userId, status } = req.body; 
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.status === status) {
      const statusText = status =="true"? "active" : "blocked";
      return res.status(200).json({ message: `User is already ${statusText}`, user });
    }

    user.status = status;
    await user.save();
    const statusText = status=="true" ? "active" : "blocked";
    res.status(200).json({ message: `User status updated successfully (${statusText})`, user });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Failed to update user status" });
  }
};



