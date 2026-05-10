/**
 * candidateStore.ts
 * Lightweight localStorage-based state management for the candidate flow.
 * No backend required — everything persists in the browser.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type CandidateProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills: string[];
  experience: string; // years, e.g. "3"
  education?: string;
  resumeFileName?: string;
  profileComplete: number; // 0-100
};

export type ResumeAnalysis = {
  score: number; // 0-100
  extractedSkills: string[];
  strengths: string[];
  missingSkills: string[];
  suggestions: string[];
  recommendedRoles: string[];
};

export type ApplicationStatus =
  | "applied"
  | "review"
  | "interview"
  | "selected"
  | "rejected";

export type Application = {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedAt: string; // ISO date string
  status: ApplicationStatus;
  matchScore: number;
  stage: string;
};

// ─── Storage keys ─────────────────────────────────────────────────────────────

const KEYS = {
  PROFILE: "cand_profile",
  RESUME_ANALYSIS: "cand_resume_analysis",
  APPLICATIONS: "cand_applications",
  IS_LOGGED_IN: "cand_logged_in",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function get<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);

    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function set<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export function isLoggedIn(): boolean {
  return localStorage.getItem(KEYS.IS_LOGGED_IN) === "true";
}

export function login(email: string, name?: string): void {
  localStorage.setItem(KEYS.IS_LOGGED_IN, "true");
  // Seed a profile if none exists
  if (!get<CandidateProfile>(KEYS.PROFILE)) {
    // Demo account gets a pre-populated profile so all features work immediately
    const isDemo = email === "demo@hiregenie.ai";
    const profile: CandidateProfile = {
      id: crypto.randomUUID(),
      name: name || (isDemo ? "Demo Candidate" : email.split("@")[0]),
      email,
      phone: isDemo ? "+1 (555) 123-4567" : "",
      location: isDemo ? "San Francisco, CA" : "",
      skills: isDemo
        ? ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL"]
        : [],
      experience: isDemo ? "3" : "0",
      linkedin: isDemo ? "linkedin.com/in/demo" : "",
      github: isDemo ? "github.com/demo" : "",
      resumeFileName: isDemo ? "demo_resume.pdf" : undefined,
      profileComplete: isDemo ? 80 : 10,
    };
    set(KEYS.PROFILE, profile);

    // Also seed a demo resume analysis for the demo user
    if (isDemo) {
      const demoAnalysis = {
        score: 82,
        extractedSkills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL"],
        strengths: [
          "Strong frontend React & TypeScript expertise clearly demonstrated",
          "Backend development with Node.js aligns with current market demand",
          "Cloud/DevOps skills (AWS, Docker) are highly valued by recruiters",
          "3+ years of experience stands out across mid-level roles",
          "Diverse full-stack skill set shows strong adaptability",
        ],
        missingSkills: ["Kubernetes", "Redis", "System Design", "Testing (Jest/Cypress)"],
        suggestions: [
          "Add quantifiable achievements (e.g., 'Reduced API latency by 35%')",
          "Include links to GitHub projects or live portfolio",
          "Consider adding Kubernetes/container orchestration experience",
          "Tailor each application's resume to the job description",
          "Consider upskilling in: Kubernetes, Redis",
        ],
        recommendedRoles: ["Full Stack Engineer", "Frontend Developer", "Backend Engineer", "DevOps / Cloud Engineer"],
      };
      set(KEYS.RESUME_ANALYSIS, demoAnalysis);
    }
  }
}

export function logout(): void {
  localStorage.setItem(KEYS.IS_LOGGED_IN, "false");
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export function getProfile(): CandidateProfile | null {
  return get<CandidateProfile>(KEYS.PROFILE);
}

export function saveProfile(profile: Partial<CandidateProfile>): void {
  const existing = get<CandidateProfile>(KEYS.PROFILE) ?? {
    id: crypto.randomUUID(),
    name: "",
    email: "",
    skills: [],
    experience: "0",
    profileComplete: 0,
  };
  const merged = { ...existing, ...profile };
  // Recalculate profile completion
  merged.profileComplete = calcProfileComplete(merged);
  set(KEYS.PROFILE, merged);
}

function calcProfileComplete(p: CandidateProfile): number {
  let score = 0;
  if (p.name) score += 15;
  if (p.email) score += 10;
  if (p.phone) score += 10;
  if (p.location) score += 10;
  if (p.skills.length >= 3) score += 20;
  if (p.resumeFileName) score += 25;
  if (p.linkedin || p.github) score += 10;
  return Math.min(score, 100);
}

// ─── Resume Analysis ──────────────────────────────────────────────────────────

export function getResumeAnalysis(): ResumeAnalysis | null {
  return get<ResumeAnalysis>(KEYS.RESUME_ANALYSIS);
}

export function saveResumeAnalysis(analysis: ResumeAnalysis): void {
  set(KEYS.RESUME_ANALYSIS, analysis);
}

// ─── Applications ─────────────────────────────────────────────────────────────

export function getApplications(): Application[] {
  return get<Application[]>(KEYS.APPLICATIONS) ?? [];
}

export function applyToJob(
  jobId: string,
  jobTitle: string,
  company: string,
  location: string,
  matchScore: number
): { success: boolean; message: string } {
  const apps = getApplications();
  if (apps.find((a) => a.jobId === jobId)) {
    return { success: false, message: "You've already applied to this job." };
  }
  const newApp: Application = {
    id: crypto.randomUUID(),
    jobId,
    jobTitle,
    company,
    location,
    appliedAt: new Date().toISOString(),
    status: "applied",
    matchScore,
    stage: "Application Submitted",
  };
  apps.push(newApp);
  set(KEYS.APPLICATIONS, apps);
  return { success: true, message: "Application submitted!" };
}

export function hasApplied(jobId: string): boolean {
  return getApplications().some((a) => a.jobId === jobId);
}
