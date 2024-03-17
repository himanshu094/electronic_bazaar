const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController'); // Import the favorite controller
const checkAuth = require('../middleware/checkAuth'); // Import the authentication middleware

// Protect these routes with user authentication
router.use(checkAuth);

// Add a property to favorites
router.post('/:propertyId', favoriteController.addToFavorites);

// Get favorite properties
router.get('/', favoriteController.getFavoriteProperties);

// Remove a property from favorites
router.delete('/:propertyId', favoriteController.removeFromFavorites);

module.exports = router;
