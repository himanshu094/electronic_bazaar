const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// function isLoggedIn(req,res,next) {
//     req.user ? next() : res.sendStatus(401);
//   }

// Registration route
router.post('/register', adminController.register);

// Login route
router.post('/login', adminController.login);

module.exports = router;
