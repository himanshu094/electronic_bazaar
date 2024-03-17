const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Create a new property
router.post('/', propertyController.createProperty);

// Get all properties
router.get('/', propertyController.getAllProperties);

// Get property by ID
router.get('/:id', propertyController.getPropertyById);

// Update property by ID
router.put('/:id', propertyController.updateProperty);

// Delete property by ID
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
