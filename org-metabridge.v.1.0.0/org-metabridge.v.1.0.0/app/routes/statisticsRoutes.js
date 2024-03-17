const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/statisticsController');

const checkAuth = require('../middleware/checkAuth');
// Apply the checkAuth middleware to protect the developer routes
router.use(checkAuth);

router.post('/', StatisticsController.create);
router.get('/', StatisticsController.getAll);
router.get('/:id', StatisticsController.getById);
router.put('/:id', StatisticsController.update);
router.delete('/:id', StatisticsController.delete);

module.exports = router;
