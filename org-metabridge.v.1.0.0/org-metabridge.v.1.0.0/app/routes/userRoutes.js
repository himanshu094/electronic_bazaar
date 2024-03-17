const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const checkAdminAuth = require("../middleware/checkAdminAuth");

router.use(checkAdminAuth);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserID);
// Route to change the status of all users
router.put("/status", userController.changeUserStatus);

module.exports = router;
