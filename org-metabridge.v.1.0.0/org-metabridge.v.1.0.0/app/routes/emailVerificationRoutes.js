const express = require('express');
const router = express.Router();
const emailVerificationController = require('../controllers/emailVerificationController');

// Define the route for email verification
router.post('/verify-email', emailVerificationController.verifyEmail);

module.exports = router;
