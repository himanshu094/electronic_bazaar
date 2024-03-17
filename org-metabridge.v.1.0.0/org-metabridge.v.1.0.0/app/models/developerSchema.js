const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for real estate developers
const developerSchema = new Schema({
  name: { type: String, required: true }, // Company name
  background: String, // Company background
  founders: [String], // List of founders
  milestones: [String], // Notable milestones
  portfolio: [
    {
      project_name: String,
      location: String,
      key_features: [String]
    }
  ],
  investment_strategy: String, // Investment strategy
  financial_information: {
    revenue: Number,
    profits: Number,
    financial_stability: String
  },
  management_team: [
    {
      name: String,
      experience: String
    }
  ],
  future_plans: [String],
  verification_docs: [String], // Verification documents
});

// Create a model for the developer schema
const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
