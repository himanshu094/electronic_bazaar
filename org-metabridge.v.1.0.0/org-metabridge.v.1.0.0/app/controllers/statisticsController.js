const Statistics = require('../models/statisticsSchema');

// Create new statistics
// exports.create = async (req, res) => {
//   try {
//     const statisticsData = req.body;
//     const newStatistics = new Statistics(statisticsData);
//     const savedStatistics = await newStatistics.save();
//     res.status(201).json(savedStatistics);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create statistics' });
//   }
// };

// Create a new statistics record with developer_id
exports.create = async (req, res) => {
  try {
    // Get the developer_id from the request body or wherever it's provided
    const developer_id = req.body.developer_id;

    // Make sure developer_id is a valid ObjectId; you can add additional validation
    if (!mongoose.Types.ObjectId.isValid(developer_id)) {
      return res.status(400).json({ error: 'Invalid developer_id' });
    }

    // Create a new statistics record with the provided data
    const statisticsData = {
      developer_id: developer_id, // Set the developer_id
      total_projects_completed: req.body.total_projects_completed,
      total_area_developed: req.body.total_area_developed,
      total_investment_value: req.body.total_investment_value,
      average_roi: req.body.average_roi,
      average_project_duration: req.body.average_project_duration,
      market_presence: req.body.market_presence,
    };

    const newStatistics = new Statistics(statisticsData);
    const savedStatistics = await newStatistics.save();
    res.status(201).json(savedStatistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create statistics' });
  }
};

// Get all statistics
exports.getAll = async (req, res) => {
  try {
    const statistics = await Statistics.find();
    res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve statistics' });
  }
};

// Get statistics by ID
exports.getById = async (req, res) => {
  const statisticsId = req.params.id;
  try {
    const statistics = await Statistics.findById(statisticsId);
    if (!statistics) {
      res.status(404).json({ error: 'Statistics not found' });
    } else {
      res.status(200).json(statistics);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve statistics' });
  }
};

// Update statistics by ID
exports.update = async (req, res) => {
  const statisticsId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedStatistics = await Statistics.findByIdAndUpdate(statisticsId, updatedData, { new: true });
    if (!updatedStatistics) {
      res.status(404).json({ error: 'Statistics not found' });
    } else {
      res.status(200).json(updatedStatistics);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update statistics' });
  }
};

// Delete statistics by ID
exports.delete = async (req, res) => {
  const statisticsId = req.params.id;
  try {
    const deletedStatistics = await Statistics.findByIdAndRemove(statisticsId);
    if (!deletedStatistics) {
      res.status(404).json({ error: 'Statistics not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete statistics' });
  }
};
