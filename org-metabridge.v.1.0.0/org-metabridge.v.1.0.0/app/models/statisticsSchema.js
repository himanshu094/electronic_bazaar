const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for statistics
const statisticsSchema = new Schema({
  developer_id: { type: Schema.Types.ObjectId, ref: 'Developer' }, // Reference to the developer
  total_projects_completed: Number,
  total_area_developed: Number,
  total_investment_value: Number,
  average_roi: Number,
  average_project_duration: Number,
  market_presence: [String] // Geographical areas where the developer operates
});

// Create a model for the statistics schema
const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;
