/**
 * aiEngine.ts
 * Lightweight AI logic for candidate features:
 *  - Job match scoring (keyword/skill matching)
 *  - Resume analysis (extract skills, generate feedback)
 *  - Career path suggestions
 *  - Chatbot responses
 */

import type { Job } from "./mockJobs";
import type { ResumeAnalysis } from "./candidateStore";

// ─── Skill taxonomy ───────────────────────────────────────────────────────────
// Used to normalize skill names and detect related skills.

const SKILL_ALIASES: Record<string, string[]> = {
  javascript: ["js", "javascript", "es6", "es2015", "ecmascript"],
  typescript: ["ts", "typescript"],
  react: ["react", "reactjs", "react.js"],
  nodejs: ["node", "nodejs", "node.js", "express", "express.js"],
  python: ["python", "py", "python3"],
  aws: ["aws", "amazon web services", "amazon s3", "ec2", "lambda"],
  docker: ["docker", "containerization", "containers"],
  kubernetes: ["k8s", "kubernetes", "kubectl"],
  postgresql: ["postgres", "postgresql", "psql"],
  mongodb: ["mongo", "mongodb"],
  graphql: ["graphql", "gql"],
  git: ["git", "github", "gitlab", "version control"],
  css: ["css", "css3", "scss", "sass", "styled-components"],
  html: ["html", "html5"],
  sql: ["sql", "mysql", "oracle", "database"],
  machine_learning: ["ml", "machine learning", "deep learning", "ai", "artificial intelligence"],
  tensorflow: ["tensorflow", "tf", "keras"],
  pytorch: ["pytorch", "torch"],
  devops: ["devops", "ci/cd", "cicd", "pipeline"],
  figma: ["figma", "sketch", "adobe xd", "ui design"],
};

/** Normalize a skill name to a canonical key */
function normalizeSkill(skill: string): string {
  const lower = skill.toLowerCase().trim();
  for (const [canonical, aliases] of Object.entries(SKILL_ALIASES)) {
    if (aliases.includes(lower) || canonical === lower) return canonical;
  }
  return lower;
}

/** Calculate how many candidate skills match job requirements */
export function calculateMatchScore(
  candidateSkills: string[],
  job: Job
): number {
  if (candidateSkills.length === 0) return Math.floor(Math.random() * 20 + 30); // baseline 30-50%

  const normCandidateSkills = candidateSkills.map(normalizeSkill);
  const normRequired = job.requiredSkills.map(normalizeSkill);
  const normNiceToHave = job.niceToHaveSkills.map(normalizeSkill);

  let score = 0;
  const totalWeight = normRequired.length * 10 + normNiceToHave.length * 4;

  for (const skill of normRequired) {
    if (normCandidateSkills.includes(skill)) score += 10;
  }
  for (const skill of normNiceToHave) {
    if (normCandidateSkills.includes(skill)) score += 4;
  }

  const rawScore = totalWeight > 0 ? (score / totalWeight) * 100 : 50;
  // Clamp between 30 and 98
  return Math.round(Math.max(30, Math.min(98, rawScore)));
}

/** Sort and filter jobs for a candidate, returning match score per job */
export function getRecommendedJobs(
  candidateSkills: string[],
  jobs: Job[]
): Array<Job & { matchScore: number; matchedSkills: string[]; missingSkills: string[] }> {
  return jobs
    .map((job) => {
      const matchScore = calculateMatchScore(candidateSkills, job);
      const normCandidateSkills = candidateSkills.map(normalizeSkill);
      const matchedSkills = job.requiredSkills.filter((s) =>
        normCandidateSkills.includes(normalizeSkill(s))
      );
      const missingSkills = job.requiredSkills.filter(
        (s) => !normCandidateSkills.includes(normalizeSkill(s))
      );
      return { ...job, matchScore, matchedSkills, missingSkills };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ─── Resume Analysis ──────────────────────────────────────────────────────────

/**
 * Simulate AI resume analysis.
 * In a real implementation, this would call an LLM/NLP API.
 * Here we parse the filename and provided skills to generate realistic feedback.
 */
export function analyzeResume(
  fileName: string,
  candidateSkills: string[],
  experience: string
): ResumeAnalysis {
  const expYears = parseInt(experience) || 1;

  // Generate a score based on skills count and experience
  const baseScore = Math.min(95, 40 + candidateSkills.length * 5 + expYears * 3);
  const score = Math.max(40, baseScore + Math.floor(Math.random() * 10 - 5));

  // Determine strengths based on skills
  const strengths: string[] = [];
  const hasReact = candidateSkills.some((s) =>
    ["react", "reactjs"].includes(s.toLowerCase())
  );
  const hasBackend = candidateSkills.some((s) =>
    ["node", "nodejs", "python", "java"].includes(s.toLowerCase())
  );
  const hasCloud = candidateSkills.some((s) =>
    ["aws", "azure", "docker", "kubernetes"].includes(s.toLowerCase())
  );

  if (hasReact) strengths.push("Strong frontend React expertise is clearly demonstrated");
  if (hasBackend) strengths.push("Backend development experience aligns with current demand");
  if (hasCloud) strengths.push("Cloud/DevOps skills are highly valued in the market");
  if (expYears >= 3) strengths.push(`${expYears}+ years of experience stands out to recruiters`);
  if (candidateSkills.length >= 5) strengths.push("Diverse skill set shows adaptability");
  if (strengths.length === 0) strengths.push("Clear and structured presentation of technical skills");

  // Generate missing skills suggestions
  const commonHighDemandSkills = [
    "TypeScript", "AWS", "Docker", "GraphQL", "Redis",
    "System Design", "Leadership", "Testing (Jest/Cypress)"
  ];
  const missingSkills = commonHighDemandSkills.filter(
    (s) => !candidateSkills.map((cs) => cs.toLowerCase()).includes(s.toLowerCase())
  ).slice(0, 4);

  // Improvement suggestions
  const suggestions = [
    "Add quantifiable achievements (e.g., 'Improved load time by 40%')",
    "Include links to GitHub projects or live portfolio",
    expYears < 3 ? "Highlight any open-source contributions or side projects" : "Consider adding leadership or mentoring experience",
    "Tailor each application's resume to the job description",
    missingSkills.length > 0 ? `Consider upskilling in: ${missingSkills.slice(0, 2).join(", ")}` : "Add cloud certifications to stand out"
  ].filter(Boolean);

  // Recommended roles based on skills
  const recommendedRoles: string[] = [];
  if (hasReact && hasBackend) recommendedRoles.push("Full Stack Engineer");
  if (hasReact) recommendedRoles.push("Frontend Developer");
  if (hasBackend) recommendedRoles.push("Backend Engineer");
  if (hasCloud) recommendedRoles.push("DevOps / Cloud Engineer");
  if (candidateSkills.some((s) => s.toLowerCase().includes("python")))
    recommendedRoles.push("Python Developer / Data Engineer");
  if (recommendedRoles.length === 0) recommendedRoles.push("Software Developer", "Junior Engineer");

  return {
    score,
    extractedSkills: candidateSkills,
    strengths,
    missingSkills,
    suggestions,
    recommendedRoles,
  };
}

// ─── Skill Gap Analysis ────────────────────────────────────────────────────────

export type SkillGapResult = {
  matched: string[];
  missing: string[];
  learningPath: Array<{ skill: string; resource: string; timeEstimate: string }>;
};

export function analyzeSkillGap(
  candidateSkills: string[],
  job: Job
): SkillGapResult {
  const normCandidateSkills = candidateSkills.map(normalizeSkill);
  const matched = job.requiredSkills.filter((s) =>
    normCandidateSkills.includes(normalizeSkill(s))
  );
  const missing = [
    ...job.requiredSkills.filter((s) => !normCandidateSkills.includes(normalizeSkill(s))),
    ...job.niceToHaveSkills.filter((s) => !normCandidateSkills.includes(normalizeSkill(s))),
  ].slice(0, 5);

  const RESOURCES: Record<string, { resource: string; time: string }> = {
    typescript: { resource: "TypeScript Official Docs + Total TypeScript course", time: "2-3 weeks" },
    aws: { resource: "AWS Certified Developer Associate (A Cloud Guru)", time: "4-6 weeks" },
    docker: { resource: "Docker & Kubernetes: The Complete Guide (Udemy)", time: "2-3 weeks" },
    graphql: { resource: "GraphQL.org tutorials + The Road to GraphQL", time: "1-2 weeks" },
    kubernetes: { resource: "Kubernetes Up & Running (O'Reilly)", time: "3-4 weeks" },
    python: { resource: "Python.org tutorials + Real Python", time: "2-4 weeks" },
    machine_learning: { resource: "fast.ai + Andrew Ng's ML Specialization", time: "8-12 weeks" },
    postgresql: { resource: "PostgreSQL Tutorial + Use the Index, Luke!", time: "1-2 weeks" },
    default: { resource: "Official documentation + freeCodeCamp / YouTube", time: "1-3 weeks" },
  };

  const learningPath = missing.map((skill) => {
    const key = normalizeSkill(skill);
    const res = RESOURCES[key] ?? RESOURCES.default;
    return {
      skill,
      resource: res.resource,
      timeEstimate: res.time,
    };
  });

  return { matched, missing, learningPath };
}

// ─── AI Career Chatbot ────────────────────────────────────────────────────────

type ChatIntent =
  | "resume"
  | "interview"
  | "salary"
  | "skill"
  | "career"
  | "apply"
  | "general";

function detectIntent(message: string): ChatIntent {
  const m = message.toLowerCase();
  if (m.includes("resume") || m.includes("cv")) return "resume";
  if (m.includes("interview") || m.includes("question") || m.includes("prep")) return "interview";
  if (m.includes("salary") || m.includes("pay") || m.includes("comp")) return "salary";
  if (m.includes("skill") || m.includes("learn") || m.includes("course")) return "skill";
  if (m.includes("career") || m.includes("path") || m.includes("grow")) return "career";
  if (m.includes("apply") || m.includes("application") || m.includes("status")) return "apply";
  return "general";
}

const RESPONSES: Record<ChatIntent, string[]> = {
  resume: [
    "💡 **Resume Tips:** Start each bullet with a strong action verb (Built, Designed, Led, Optimized). Quantify your achievements — e.g. 'Reduced API latency by 35%'.",
    "📄 **ATS Tip:** Mirror keywords from the job description in your resume. Our AI scanner looks for exact skill matches. Keep formatting simple — no tables or columns.",
    "✅ **Resume Structure:** Lead with a 2-line summary, then Skills, Experience (most recent first), Projects, and Education. Keep it to 1-2 pages.",
  ],
  interview: [
    "🎯 **STAR Method:** Structure behavioral answers as Situation → Task → Action → Result. This works for '95% of 'Tell me about a time...' questions.",
    "💻 **Technical Interviews:** Practice on LeetCode (Easy/Medium). For system design, study: Scaling, Caching, Database indexing, and Load balancing.",
    "🤝 **Culture Fit:** Prepare 3 strong stories about collaboration, handling failure, and major achievements. Research the company's mission and recent news.",
  ],
  salary: [
    "💰 **Salary Negotiation:** Research market rates on Levels.fyi, Glassdoor, and LinkedIn Salary. Always negotiate — 78% of employers expect it. Ask for 10-15% above your target.",
    "📊 **Total Compensation:** Consider base salary + equity + bonuses + benefits. A lower base with strong equity at a startup can outperform a high base at a big company.",
  ],
  skill: [
    "🚀 **High-Demand Skills 2024:** TypeScript, React, Python, AWS, Docker, Kubernetes, GraphQL, and System Design are consistently top-requested.",
    "📚 **Learning Resources:** freeCodeCamp (free), Udemy (paid, go for $15 sales), official docs, and building real projects are the best combinations.",
    "⚡ **Fastest Way to Level Up:** Build something real. Pick a project idea, use an unfamiliar tech stack, deploy it, and put it on GitHub.",
  ],
  career: [
    "🗺️ **Career Paths in Tech:** Generalist → Frontend/Backend Specialist → Senior Engineer → Staff Engineer / Tech Lead → Architect / Engineering Manager. Each step typically takes 2-4 years.",
    "🌟 **Standing Out:** Contribute to open source, write technical blog posts, build a personal brand on LinkedIn/Twitter, and speak at local meetups.",
  ],
  apply: [
    "📋 **Application Strategy:** Apply within 48 hours of posting — applications submitted in the first 24 hours are 3x more likely to get interviews.",
    "🎯 **Quality > Quantity:** A targeted application with a customized resume beats 10 generic ones. Focus on jobs where you match 70%+ of requirements.",
  ],
  general: [
    "👋 I'm your AI Career Assistant! I can help with:\n• **Resume tips** — Ask 'How do I improve my resume?'\n• **Interview prep** — Ask 'How should I prepare for technical interviews?'\n• **Skill gaps** — Ask 'What skills should I learn?'\n• **Career advice** — Ask 'How do I grow as a developer?'\n• **Salary** — Ask 'How do I negotiate salary?'",
    "🤖 Great question! I'm here to help you navigate your job search. Ask me about resume writing, interview preparation, skill recommendations, or career growth strategies!",
  ],
};

export function getChatResponse(userMessage: string): string {
  const intent = detectIntent(userMessage);
  const responses = RESPONSES[intent];
  return responses[Math.floor(Math.random() * responses.length)];
}
