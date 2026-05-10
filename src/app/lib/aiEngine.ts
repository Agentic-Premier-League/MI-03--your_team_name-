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
  "rest apis": ["rest api", "rest apis", "restful", "rest"],
  redis: ["redis", "cache"],
  jwt: ["jwt", "json web token"],
  testing: ["jest", "cypress", "pytest", "junit", "testing", "tdd"],
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
  if (candidateSkills.length === 0) return Math.floor(Math.random() * 20 + 30);

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

export function analyzeResume(
  fileName: string,
  candidateSkills: string[],
  experience: string
): ResumeAnalysis {
  const expYears = parseInt(experience) || 1;

  const baseScore = Math.min(95, 40 + candidateSkills.length * 5 + expYears * 3);
  const score = Math.max(40, baseScore + Math.floor(Math.random() * 10 - 5));

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

  const commonHighDemandSkills = [
    "TypeScript", "AWS", "Docker", "GraphQL", "Redis",
    "System Design", "Leadership", "Testing (Jest/Cypress)"
  ];
  const missingSkills = commonHighDemandSkills.filter(
    (s) => !candidateSkills.map((cs) => cs.toLowerCase()).includes(s.toLowerCase())
  ).slice(0, 4);

  const suggestions = [
    "Add quantifiable achievements (e.g., 'Improved load time by 40%')",
    "Include links to GitHub projects or live portfolio",
    expYears < 3 ? "Highlight any open-source contributions or side projects" : "Consider adding leadership or mentoring experience",
    "Tailor each application's resume to the job description",
    missingSkills.length > 0 ? `Consider upskilling in: ${missingSkills.slice(0, 2).join(", ")}` : "Add cloud certifications to stand out"
  ].filter(Boolean);

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
  learningPath: Array<{ skill: string; resource: string; timeEstimate: string; url?: string }>;
};

// Comprehensive resource map — covers every skill appearing in mockJobs
const RESOURCES: Record<string, { resource: string; time: string; url: string }> = {
  // Frontend
  typescript: { resource: "Total TypeScript (totaltypescript.com) — free interactive course", time: "2-3 weeks", url: "https://www.totaltypescript.com" },
  react: { resource: "React official docs (react.dev) + Scrimba React course", time: "3-4 weeks", url: "https://react.dev" },
  javascript: { resource: "javascript.info — The Modern JavaScript Tutorial (free)", time: "4-6 weeks", url: "https://javascript.info" },
  "next.js": { resource: "Next.js official tutorial (nextjs.org/learn)", time: "2-3 weeks", url: "https://nextjs.org/learn" },
  "vue.js": { resource: "Vue Mastery free intro + official Vue 3 docs", time: "2-3 weeks", url: "https://vuemastery.com" },
  angular: { resource: "Angular official 'Tour of Heroes' tutorial + Scrimba Angular course", time: "3-4 weeks", url: "https://angular.dev/tutorials/learn-angular" },
  css: { resource: "Kevin Powell YouTube (free) + CSS Tricks complete guide", time: "2-4 weeks", url: "https://css-tricks.com" },
  html: { resource: "MDN Web Docs HTML guide (free)", time: "1-2 weeks", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  figma: { resource: "Figma's own tutorials at help.figma.com + DesignWithFigma YouTube", time: "1-2 weeks", url: "https://help.figma.com" },
  graphql: { resource: "GraphQL.org official tutorials + The Road to GraphQL (free PDF)", time: "1-2 weeks", url: "https://graphql.org/learn" },
  "react native": { resource: "React Native official docs + Expo Getting Started tutorial", time: "3-4 weeks", url: "https://reactnative.dev/docs/getting-started" },
  "tailwind css": { resource: "Tailwind CSS official docs + Scrimba Tailwind CSS course", time: "1 week", url: "https://tailwindcss.com/docs" },

  // Backend & APIs
  nodejs: { resource: "Node.js official learning path + The Odin Project Node module", time: "3-4 weeks", url: "https://nodejs.org/en/learn" },
  express: { resource: "Express.js official guide + The Odin Project Node/Express path", time: "1-2 weeks", url: "https://expressjs.com/en/guide/routing.html" },
  python: { resource: "Python.org tutorial + Real Python (realpython.com)", time: "2-4 weeks", url: "https://realpython.com" },
  java: { resource: "Codecademy Learn Java + Baeldung.com Spring Boot guides", time: "4-6 weeks", url: "https://www.baeldung.com" },
  fastapi: { resource: "FastAPI official tutorial (fastapi.tiangolo.com) — very beginner-friendly", time: "1-2 weeks", url: "https://fastapi.tiangolo.com/tutorial" },
  django: { resource: "Django Girls Tutorial + official Django docs (djangoproject.com)", time: "2-3 weeks", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01" },
  "rest apis": { resource: "Postman Learning Center + freeCodeCamp REST API tutorial", time: "1-2 weeks", url: "https://learning.postman.com" },
  jwt: { resource: "jwt.io introduction + Auth0 blog: 'JWT Authentication Tutorial'", time: "3-5 days", url: "https://jwt.io/introduction" },

  // Databases
  postgresql: { resource: "PostgreSQL Tutorial (postgresqltutorial.com) + Use the Index, Luke!", time: "1-2 weeks", url: "https://www.postgresqltutorial.com" },
  mongodb: { resource: "MongoDB University free courses (learn.mongodb.com)", time: "1-2 weeks", url: "https://learn.mongodb.com" },
  mysql: { resource: "MySQL Tutorial (mysqltutorial.org) + W3Schools SQL exercises", time: "1-2 weeks", url: "https://www.mysqltutorial.org" },
  redis: { resource: "Redis University free online courses (university.redis.com)", time: "1 week", url: "https://university.redis.com" },
  sql: { resource: "SQLZoo free interactive exercises + Mode SQL Tutorial", time: "1-2 weeks", url: "https://sqlzoo.net" },
  firebase: { resource: "Firebase official docs + Fireship.io YouTube channel", time: "1-2 weeks", url: "https://firebase.google.com/docs" },
  elasticsearch: { resource: "Elastic official getting started + Elasticsearch 'Definitive Guide' (free online)", time: "2-3 weeks", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html" },

  // Cloud & DevOps
  aws: { resource: "AWS Skill Builder free tier + A Cloud Guru AWS Developer Associate", time: "4-6 weeks", url: "https://explore.skillbuilder.aws" },
  azure: { resource: "Microsoft Learn Azure Fundamentals path (free, with badges)", time: "3-4 weeks", url: "https://learn.microsoft.com/azure" },
  gcp: { resource: "Google Cloud Skills Boost free tier + Qwiklabs hands-on labs", time: "3-4 weeks", url: "https://cloudskillsboost.google" },
  docker: { resource: "Docker official Getting Started tutorial + TechWorld with Nana YouTube", time: "1-2 weeks", url: "https://docs.docker.com/get-started" },
  kubernetes: { resource: "Kubernetes.io interactive tutorial + TechWorld with Nana K8s playlist", time: "3-4 weeks", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics" },
  terraform: { resource: "HashiCorp Learn Terraform tutorials (developer.hashicorp.com)", time: "2-3 weeks", url: "https://developer.hashicorp.com/terraform/tutorials" },
  "ci/cd": { resource: "GitHub Actions official docs + GitLab CI/CD getting started guide", time: "1-2 weeks", url: "https://docs.github.com/en/actions" },
  linux: { resource: "The Linux Command Line free online book (linuxcommand.org)", time: "2-3 weeks", url: "https://linuxcommand.org/tlcl.php" },
  devops: { resource: "DevOps Roadmap (roadmap.sh/devops) + KodeKloud free tier labs", time: "4-6 weeks", url: "https://roadmap.sh/devops" },
  "solution design": { resource: "System Design Primer on GitHub + ByteByteGo YouTube channel", time: "4-6 weeks", url: "https://github.com/donnemartin/system-design-primer" },
  "cloud architecture": { resource: "AWS Well-Architected Framework + Google Cloud Architecture Center", time: "4-6 weeks", url: "https://aws.amazon.com/architecture/well-architected" },

  // AI / ML / Data
  machine_learning: { resource: "Andrew Ng's ML Specialization on Coursera (audit free) + fast.ai", time: "8-12 weeks", url: "https://www.coursera.org/specializations/machine-learning-introduction" },
  tensorflow: { resource: "TensorFlow official tutorials + DeepLearning.AI TF course (Coursera audit)", time: "4-6 weeks", url: "https://www.tensorflow.org/tutorials" },
  pytorch: { resource: "PyTorch 60-minute blitz tutorial + fast.ai Practical Deep Learning (free)", time: "4-6 weeks", url: "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html" },
  "data science": { resource: "Kaggle free courses (Python, Pandas, ML) + Towards Data Science", time: "6-10 weeks", url: "https://www.kaggle.com/learn" },
  "apache spark": { resource: "Databricks Community Edition free + Spark by Examples (sparkbyexamples.com)", time: "3-4 weeks", url: "https://sparkbyexamples.com" },
  "data engineering": { resource: "DataTalks.Club Data Engineering Zoomcamp (free cohort on GitHub)", time: "8-10 weeks", url: "https://github.com/DataTalksClub/data-engineering-zoomcamp" },

  // Tools
  git: { resource: "Pro Git book free at git-scm.com + GitHub's Git tutorial", time: "3-5 days", url: "https://git-scm.com/book/en/v2" },
  testing: { resource: "Jest getting started docs + Cypress real-world-app + Testing Library guides", time: "1-2 weeks", url: "https://jestjs.io/docs/getting-started" },
  "system design": { resource: "System Design Primer on GitHub (free) + ByteByteGo YouTube", time: "4-8 weeks", url: "https://github.com/donnemartin/system-design-primer" },
  microservices: { resource: "Microservices.io patterns guide + Sam Newman 'Building Microservices' key chapters", time: "3-4 weeks", url: "https://microservices.io/patterns/index.html" },
  "user research": { resource: "Google UX Design Certificate on Coursera (audit free) + NN/g articles", time: "2-3 weeks", url: "https://www.coursera.org/professional-certificates/google-ux-design" },

  // Fallback
  default: { resource: "Official docs + freeCodeCamp.org + roadmap.sh for structured learning paths", time: "1-3 weeks", url: "https://roadmap.sh" },
};

export function analyzeSkillGap(
  candidateSkills: string[],
  job: Job
): SkillGapResult {
  const normCandidateSkills = candidateSkills.map(normalizeSkill);

  const matched = job.requiredSkills.filter((s) =>
    normCandidateSkills.includes(normalizeSkill(s))
  );
  const missingRequired = job.requiredSkills.filter(
    (s) => !normCandidateSkills.includes(normalizeSkill(s))
  );
  const missingNiceToHave = job.niceToHaveSkills.filter(
    (s) => !normCandidateSkills.includes(normalizeSkill(s))
  );
  // Up to 3 required + 2 nice-to-have missing skills in learning path
  const missing = [...missingRequired, ...missingNiceToHave].slice(0, 5);

  const learningPath = missing.map((skill) => {
    const key = normalizeSkill(skill);
    // Try exact key, then partial match
    const res =
      RESOURCES[key] ??
      Object.entries(RESOURCES).find(
        ([k]) => k !== "default" && (k.includes(key) || key.includes(k))
      )?.[1] ??
      RESOURCES.default;
    return {
      skill,
      resource: res.resource,
      timeEstimate: res.time,
      url: res.url,
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
    "🎯 **STAR Method:** Structure behavioral answers as Situation → Task → Action → Result. This works for 95% of 'Tell me about a time...' questions.",
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
