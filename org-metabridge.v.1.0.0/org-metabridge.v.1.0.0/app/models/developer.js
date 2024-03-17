//Separeted in two files developerSchema and staticsShema
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

// Define a schema for agencies (sales)
// const agencySchema = new Schema({
//   name: String,
//   developers: [{ type: Schema.Types.ObjectId, ref: 'Developer' }],
//   // Add other agency-related fields as needed
// });

// Create models for each schema
const Developer = mongoose.model('Developer', developerSchema);
// const Statistics = mongoose.model('Statistics', statisticsSchema);
// const Agency = mongoose.model('Agency', agencySchema);

// Example usage to create and associate documents:
// const newDeveloper = new Developer({
//   name: 'ABC Developers',
//   background: 'A brief history of the company...',
//   founders: ['Founder1', 'Founder2'],
//   // Add more developer-specific information
// });

// const newStatistics = new Statistics({
//   developer_id: newDeveloper._id,
//   total_projects_completed: 10,
//   total_area_developed: 50000,
//   total_investment_value: 1000000,
//   average_roi: 10,
//   average_project_duration: 12,
//   market_presence: ['City1', 'City2']
// });

// const newAgency = new Agency({
//   name: 'XYZ Real Estate Agency',
//   // Add agency-specific information
// });

// // Save the documents to MongoDB
// newDeveloper.save((err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // Document saved
//     newStatistics.save((err) => {
//       if (err) {
//         console.error(err);
//       } else {
//         // Document saved
//         newAgency.save((err) => {
//           if (err) {
//             console.error(err);
//           } else {
//             // Document saved
//             // You can associate documents by using developer_id in the Statistics schema.
//           }
//         });
//       }
//     });
//   }
// });
