# AI Candidate Experience Platform 🚀

An AI-powered Candidate Experience MVP built for the Agentic Premier League Hackathon using the existing MI-03 repository architecture.

This platform focuses entirely on improving the **candidate journey** using AI-driven recommendations, resume analysis, skill-gap insights, and intelligent job matching.

---

# ✨ Features

## 👤 Candidate Authentication
- Secure Signup/Login
- Session/JWT-based authentication
- Candidate onboarding flow

## 📄 Resume Upload & AI Parsing
- Upload PDF/DOC resumes
- Extract:
  - Skills
  - Experience
  - Education
  - Keywords
- AI-generated improvement suggestions

## 🤖 AI Job Recommendations
- Personalized job recommendations
- Match scoring system
- Smart skill-job mapping

## 🎯 Skill Gap Analysis
- Compare candidate profile with job requirements
- Missing skill identification
- Suggested learning roadmap

## ⚡ One-Click Apply
- Apply instantly to jobs
- Duplicate application prevention
- Application history management

## 📊 Candidate Dashboard
- Recommended jobs
- Profile completion
- Application tracking
- AI insights

## 💬 AI Career Assistant
- Interview preparation
- Resume guidance
- Career recommendations
- Skill suggestions

## 📌 Application Tracking
Track applications through:
- Applied
- Under Review
- Interview
- Selected
- Rejected

---

# 🏗️ Tech Stack

## Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## AI/ML Features
- Gemini API / OpenAI API
- Resume parsing
- NLP-based skill extraction
- AI recommendation engine

## Authentication
- JWT Authentication
- bcrypt password hashing

## Deployment
- Render / Vercel / Railway

---

# 📂 Project Structure

```bash
MI-03--your_team_name-
│
├── client/                 # Frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
│
├── server/                 # Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── services/
│
├── seed/                   # Mock job data
├── uploads/                # Resume uploads
├── README.md
└── package.json
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Agentic-Premier-League/MI-03--your_team_name-.git
```

---

## 2️⃣ Navigate to Project

```bash
cd MI-03--your_team_name-
```

---

# 🖥️ Frontend Setup

## Install Dependencies

```bash
cd client
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🛠️ Backend Setup

## Install Dependencies

```bash
cd server
npm install
```

## Create `.env` File

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

## Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🗄️ Seed Mock Jobs

To populate demo jobs:

```bash
npm run seed
```

This ensures candidate-side features work even without recruiter input.

---

# 🔥 AI Features Workflow

## Resume Analysis
1. Candidate uploads resume
2. AI extracts:
   - Skills
   - Experience
   - Education
3. System generates recommendations

---

## Job Recommendation Engine
- Matches candidate skills with jobs
- Calculates compatibility score
- Suggests best-fit opportunities

---

## Skill Gap Analysis
- Identifies missing skills
- Suggests learning/improvement areas

---

# 📸 Demo Flow

```text
Signup → Upload Resume → AI Analysis →
Recommended Jobs → Match Score →
One-Click Apply → Track Status →
AI Career Assistant
```

---

# 🚀 Deployment

## Frontend
Deploy using:
- Vercel
- Netlify

## Backend
Deploy using:
- Render
- Railway

## Database
- MongoDB Atlas

---

# 🧠 Future Improvements

- Real recruiter portal
- AI mock interviews
- Voice-based assistant
- ATS scoring
- Real-time notifications
- LinkedIn profile import

---

# 👥 Team

Built for:
## Agentic Premier League Hackathon

Focused on creating a smarter and more personalized hiring experience for candidates.

---

# 📜 License

MIT License

---

# ⭐ Final Goal

Deliver a production-ready AI-powered Candidate Experience Platform that demonstrates:
- AI integration
- Smart hiring workflows
- Real-world usability
- End-to-end candidate journey optimization
