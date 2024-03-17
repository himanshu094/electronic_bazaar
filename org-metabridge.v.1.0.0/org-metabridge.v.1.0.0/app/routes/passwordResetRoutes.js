const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

router.post('/forgot', passwordResetController.forgotPassword);
router.post('/reset', passwordResetController.resetPassword);
// Define other password reset-related routes

module.exports = router;