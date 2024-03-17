const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = new Schema({
  name: String,
  location: String,
  // Add other agency-related fields as needed
  developers: [{ type: Schema.Types.ObjectId, ref: 'Developer' }], // References to developers (brokers)
  agents: [{ type: Schema.Types.ObjectId, ref: 'Agent' }], // References to agents
});

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;
