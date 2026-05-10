const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, required: true },
  matchPercent: { type: Number, required: true },
  aiScore: { type: Number, required: true },
  trustScore: { type: Number, required: true },
  status: { type: String, required: true, default: 'applied' },
  appliedDate: { type: String, required: true },
  role: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
