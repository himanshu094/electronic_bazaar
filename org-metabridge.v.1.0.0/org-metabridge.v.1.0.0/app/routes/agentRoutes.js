const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const agentController = require("../controllers/agentController"); // Import the agent controller

const checkAdminAuth = require("../middleware/checkAdminAuth");

router.use(checkAdminAuth);

// Create a new agent
router.post("/", agentController.createAgent);

// Get all agents
router.get("/", agentController.getAllAgents);

// Get agent by ID
router.get("/:id", agentController.getAgentById);

// Update agent by ID
// router.put("/:id", agentController.updateAgent);

// Delete agent by ID
router.delete("/:id", agentController.deleteAgent);

// upload single image
router.post("/uploadImage", fileUpload(), agentController.uploadImage);

// upload multiple images
// router.post("/uploadImages", fileUpload(), agentController.uploadImages);

module.exports = router;
