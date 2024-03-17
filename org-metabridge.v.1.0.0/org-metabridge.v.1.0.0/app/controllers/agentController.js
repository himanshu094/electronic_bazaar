const Agent = require("../models/agentsSchema"); // Import the Agent model
const fs = require("fs");
const path = require("path");

// Create a new agent
exports.createAgent = async (req, res) => {
  try {
    const agentData = req.body; // Assuming the request contains agent data
    if (!agentData.email || agentData.email.length === 0) {
      return res.status(500).json({
        status: false,
        error: "email can't be empty",
      });
    }
    const newAgent = new Agent(agentData);

    const savedAgent = await newAgent.save();

    res.status(201).json(savedAgent);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      error: "Failed to create agent",
    });
  }
};

// Get all agents with search functionality
exports.getAllAgents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { fullName, email, mobileNumber } = req.query;

    let query = {};

    if (fullName) {
      query.fullName = { $regex: new RegExp(fullName, "i") };
    }

    if (email) {
      query.email = { $regex: new RegExp(email, "i") };
    }

    if (mobileNumber) {
      query.phone = { $regex: new RegExp(mobileNumber, "i") };
    }

    const totalAgent = await Agent.countDocuments(query);
    const totalPages = Math.ceil(totalAgent / limit);

    const agent = await Agent.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      agent,
      page,
      limit,
      totalPages,
      totalAgent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve agent" });
  }
};

// Get agent by ID
exports.getAgentById = async (req, res) => {
  try {
    const agentId = req.params.id; // Assuming you pass the agent ID in the URL
    const agent = await Agent.findById(agentId).exec();
    if (!agent) {
      return res.status(404).json({ error: "Agent not found" });
    } else {
      res.status(200).json(agent);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve agent" });
  }
};

// Update agent by ID
exports.updateAgent = async (req, res) => {
  try {
    const agentId = req.params.id; // Assuming you pass the agent ID in the URL
    const updatedData = req.body; // Assuming the request contains updated data

    const updatedAgent = await Agent.findByIdAndUpdate(agentId, updatedData, {
      new: true,
    }).exec();

    if (!updatedAgent) {
      res.status(404).json({ error: "Agency not found" });
    } else {
      res.status(200).json(updatedAgent);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update agent" });
  }
};

// Delete agent by ID

exports.deleteAgent = async (req, res) => {
  try {
    const agentId = req.params.id; // Assuming you pass the agent ID in the URL

    const deletedAgent = await Agent.findByIdAndRemove(agentId).exec();

    if (!deletedAgent) {
      res.status(404).json({ error: "Agent not found" });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete agent" });
  }
};

// upload single image

// exports.uploadImage = async (req, res) => {
//   // console.log("---------------------------------------------------");

//   try {
//     // Check if any file was uploaded
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ error: "No image uploaded." });
//     }

//     // Access the uploaded image using the req.files.image key (assuming the input field is named 'image')
//     const uploadedImage = req.files.image;
//     console.log(">>>>>>>>", uploadedImage);
//     // Define the path where you want to save the image (adjust the path as needed)
//     const uploadPath = __dirname + "/uploads/" + uploadedImage.name;

//     // Save the image to the defined path
//     uploadedImage.mv(uploadPath, (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: "Failed to upload image." });
//       }

//       res.json({ message: "Image uploaded successfully!" });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to upload image." });
//   }
// };

exports.uploadImage = async (req, res) => {
  try {
    // Check if any file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No image uploaded." });
    }

    // Access the uploaded image using the req.files.image key (assuming the input field is named 'image')
    const uploadedImage = req.files.image;

    // Ensure the 'uploads' directory exists
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    // Handle unique file names
    const uniqueFileName = Date.now() + "-" + uploadedImage.name;
    const filePath = path.join(uploadPath, uniqueFileName);

    // Log paths for debugging
    console.log("Upload Path:", uploadPath);
    console.log("File Path:", filePath);

    //to do s3 bucket and url save in db
    
    // Save the image to the defined path
    uploadedImage.mv(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload image." });
      }

      res.json({ message: "Image uploaded successfully!", result: filePath });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload image." });
  }
};

// upload multiple images
// exports.uploadImages = async (req, res) => {
//   try {
//     // Check if any file was uploaded
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).json({ error: "No images uploaded." });
//     }

//     // Access the uploaded images using the req.files.images key (assuming the input field is named 'images')
//     const uploadedImages = req.files.images;

//     // Define the path where you want to save the images (adjust the path as needed)
//     const uploadPath = __dirname + "/uploads/";

//     // Iterate over the uploaded images and save each one
//     uploadedImages.forEach((image) => {
//       const imagePath = uploadPath + image.name;

//       // Save the image to the defined path
//       image.mv(imagePath, (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ error: "Failed to upload images." });
//         }
//       });
//     });

//     res.json({ message: "Images uploaded successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to upload images." });
//   }
// };
