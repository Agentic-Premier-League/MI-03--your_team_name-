# HireGenie - AI-Powered Autonomous Hiring Platform

Welcome to **HireGenie**, a futuristic, AI-powered autonomous hiring platform designed for the GDG Hackathon. HireGenie seamlessly bridges the gap between recruiters and top talent using multi-agent consensus, skill gap analysis, and an intuitive, modern SaaS dashboard.

## 🚀 Core Features

- **Recruiter Dashboard**: An immersive, glassmorphism-styled dashboard for recruiters to view metrics, jobs, and candidates.
- **Candidate Portal**: A dedicated space for candidates to track applications, view analytics, and access career suggestions.
- **Job Posting System**: Easily create and manage job postings with detailed requirements.
- **AI-Powered Candidate-Job Matching**: Intelligent scoring based on resume parsing and job requirements.
- **Candidate Ranking**: Candidates are ranked dynamically based on their skills, AI consensus score, and overall suitability.
- **Smart Profile & Skill Gap Analysis**: Detailed breakdown of candidate skills with actionable resources to bridge skill gaps.
- **Agentic Workflow Automation**: Automated stages for resume review, technical screening, and HR review.
- **Real-Time Hiring Pipeline Simulation**: Move candidates through different stages (applied, shortlisted, interviewed, hired).
- **Responsive Modern UI**: Built with React, Tailwind CSS, and Framer Motion for beautiful, fluid animations.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Radix UI, Recharts, Lucide React
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Deployment & Tooling**: Render, PostCSS, ESLint, Git

## 📂 Project Structure

```
├── server/                 # Express backend
│   ├── index.js            # Main entry point for the API
│   ├── db.js               # MongoDB connection setup
│   └── models/             # Mongoose schemas (Candidate, Job)
├── src/                    # React frontend
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Dashboard & application pages
│   │   └── lib/            # State management and utilities
│   ├── main.tsx            # React application entry
│   └── index.css           # Global styles and Tailwind configuration
├── package.json            # Project dependencies and scripts
└── vite.config.ts          # Vite build configuration
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Omshivhare45/HireGinie-GDG-hackathon.git
   cd HireGinie-GDG-hackathon
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Variables:**
   Create a `.env` file in the `server` directory and add your MongoDB connection string:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   ```

5. **Run the Application Locally:**
   Start both the frontend and backend servers concurrently:
   ```bash
   # Start the frontend
   npm run dev

   # Open a new terminal and start the backend
   npm start
   ```

6. Open `http://localhost:5173` to view the platform!

## 💡 Team & Contributors
Developed for the GDG Hackathon using an agentic AI workflow with Cursor & Antigravity.
