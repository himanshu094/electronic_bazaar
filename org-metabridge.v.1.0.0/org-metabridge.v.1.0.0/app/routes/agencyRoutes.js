const express = require("express");
const router = express.Router();
const agencyController = require("../controllers/agencyController"); // Import the agency controller
const checkAdminAuth = require("../middleware/checkAdminAuth");

router.use(checkAdminAuth);

// Create a new agency
router.post("/", agencyController.createAgency);

// Get all agencies
router.get("/", agencyController.getAllAgencies);

// Get agency by ID
router.get("/:id", agencyController.getAgencyById);

// Update agency by ID
router.put("/:id", agencyController.updateAgency);

// Delete agency by ID
router.delete("/:id", agencyController.deleteAgency);

module.exports = router;
