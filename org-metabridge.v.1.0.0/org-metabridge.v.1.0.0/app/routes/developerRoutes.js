const express = require('express');
const router = express.Router();
const DeveloperController = require('../controllers/developerController');

const checkAuth = require('../middleware/checkAuth');
// Apply the checkAuth middleware to protect the developer routes
router.use(checkAuth);

router.post('/', DeveloperController.create);
router.get('/', DeveloperController.getAll);
router.get('/:id', DeveloperController.getById);
router.put('/:id', DeveloperController.update);
router.delete('/:id', DeveloperController.delete);

module.exports = router;
