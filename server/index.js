const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./db');
const Job = require('./models/Job');
const Candidate = require('./models/Candidate');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

// Seed Initial Candidates if empty
async function seedCandidates() {
  try {
    const count = await Candidate.countDocuments();
    if (count === 0) {
      await Candidate.insertMany([
        { name: 'Sarah Johnson', email: 'sarah.j@email.com', source: 'Referral', matchPercent: 95, aiScore: 92, trustScore: 88, status: 'shortlisted', appliedDate: '2024-05-08', role: 'Senior Frontend Developer' },
        { name: 'Michael Chen', email: 'm.chen@email.com', source: 'Applied', matchPercent: 88, aiScore: 90, trustScore: 85, status: 'interview', appliedDate: '2024-05-07', role: 'Full Stack Engineer' },
        { name: 'Emily Davis', email: 'emily.d@email.com', source: 'LinkedIn', matchPercent: 92, aiScore: 89, trustScore: 90, status: 'review', appliedDate: '2024-05-06', role: 'React Developer' },
        { name: 'James Wilson', email: 'j.wilson@email.com', source: 'Applied', matchPercent: 85, aiScore: 82, trustScore: 80, status: 'applied', appliedDate: '2024-05-08', role: 'Frontend Developer' }
      ]);
      console.log('Seeded initial candidates into MongoDB');
    }
  } catch (err) {
    console.error('Error seeding candidates:', err);
  }
}
seedCandidates();

// Routes
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ appliedDate: -1 });
    // Map _id to id for the frontend
    const mapped = candidates.map(c => {
      const obj = c.toObject();
      obj.id = obj._id;
      return obj;
    });
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

app.get('/api/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    const obj = candidate.toObject();
    obj.id = obj._id;
    res.json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch candidate' });
  }
});

app.patch('/api/candidates/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: 'Candidate status updated', candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update candidate status' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
