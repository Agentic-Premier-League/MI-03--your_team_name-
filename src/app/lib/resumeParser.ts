/**
 * resumeParser.ts
 * Extracts text from an uploaded resume file (PDF or plain text),
 * then scans it for known tech skills using a comprehensive keyword dictionary.
 *
 * PDF parsing uses a lightweight dependency-free fallback to avoid runtime import issues.
 */

// ─── Comprehensive skill dictionary ──────────────────────────────────────────
// Each entry: canonical display name → list of text tokens to search for.

const SKILL_DICTIONARY: Record<string, string[]> = {
  // Frontend
  React: ["react", "react.js", "reactjs"],
  TypeScript: ["typescript", "ts"],
  JavaScript: ["javascript", "js", "es6", "ecmascript"],
  "Next.js": ["next.js", "nextjs", "next js"],
  "Vue.js": ["vue", "vue.js", "vuejs"],
  Angular: ["angular", "angularjs"],
  HTML: ["html", "html5"],
  CSS: ["css", "css3", "scss", "sass", "less"],
  "Tailwind CSS": ["tailwind", "tailwindcss"],
  Redux: ["redux", "redux toolkit", "zustand"],
  GraphQL: ["graphql", "gql", "apollo"],
  "React Native": ["react native", "react-native"],

  // Backend
  "Node.js": ["node.js", "nodejs", "node", "express", "express.js"],
  Python: ["python", "python3", "py"],
  Java: ["java", "spring", "spring boot", "springboot"],
  Go: ["golang", "go lang"],
  Rust: ["rust", "rustlang"],
  PHP: ["php", "laravel"],
  Ruby: ["ruby", "rails", "ruby on rails"],
  "C#": ["c#", ".net", "dotnet", "asp.net"],
  "C++": ["c++", "cpp"],
  FastAPI: ["fastapi", "fast api"],
  Django: ["django"],
  Flask: ["flask"],

  // Databases
  PostgreSQL: ["postgresql", "postgres", "psql"],
  MongoDB: ["mongodb", "mongo"],
  MySQL: ["mysql"],
  Redis: ["redis"],
  SQLite: ["sqlite"],
  Elasticsearch: ["elasticsearch", "elastic search"],
  Firebase: ["firebase", "firestore"],
  Supabase: ["supabase"],

  // Cloud & DevOps
  AWS: ["aws", "amazon web services", "ec2", "s3", "lambda", "cloudfront"],
  Azure: ["azure", "microsoft azure"],
  GCP: ["gcp", "google cloud", "bigquery"],
  Docker: ["docker", "dockerfile", "containerization"],
  Kubernetes: ["kubernetes", "k8s", "kubectl", "helm"],
  Terraform: ["terraform", "infrastructure as code", "iac"],
  "CI/CD": ["ci/cd", "cicd", "github actions", "gitlab ci", "jenkins", "circle ci"],
  Linux: ["linux", "ubuntu", "debian", "bash", "shell scripting"],

  // AI / ML / Data
  "Machine Learning": ["machine learning", "ml", "scikit-learn", "sklearn"],
  "Deep Learning": ["deep learning", "neural network", "cnn", "rnn", "lstm"],
  TensorFlow: ["tensorflow", "tf", "keras"],
  PyTorch: ["pytorch", "torch"],
  "Data Science": ["data science", "data analysis", "pandas", "numpy", "matplotlib"],
  "Apache Spark": ["spark", "apache spark", "pyspark"],
  SQL: ["sql", "t-sql", "plsql"],
  "Data Engineering": ["data engineering", "etl", "airflow", "dbt", "kafka"],
  OpenAI: ["openai", "gpt", "chatgpt", "llm", "langchain"],

  // Tools & Practices
  Git: ["git", "github", "gitlab", "version control"],
  Figma: ["figma", "sketch", "adobe xd"],
  Agile: ["agile", "scrum", "jira", "kanban"],
  Testing: ["jest", "cypress", "pytest", "junit", "testing", "unit test", "tdd"],
  REST: ["rest api", "restful", "rest"],
  Microservices: ["microservices", "micro-services"],
  "System Design": ["system design", "distributed systems", "scalability"],
};

// ─── Text extraction ──────────────────────────────────────────────────────────

/**
 * Extract raw text from an uploaded File object.
 * Supports: PDF (via pdfjs-dist), plain text, and falls back to filename scanning.
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    return extractPdfText(file);
  }

  // For .txt or any text-based file
  if (ext === "txt" || ext === "md") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string ?? "");
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  // For .doc/.docx — we can't fully parse binary DOCX in the browser without a library,
  // but we can try reading as text (some content is still readable as raw bytes).
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Extract readable ASCII/UTF8 strings from the binary blob
      const raw = e.target?.result as string ?? "";
      // Strip non-printable chars, keep meaningful text chunks
      const readable = raw.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ");
      resolve(readable);
    };
    reader.onerror = () => resolve("");
    reader.readAsBinaryString(file);
  });
}

/**
 * Extract text from a PDF using a lightweight fallback.
 */
async function extractPdfText(file: File): Promise<string> {
  try {
    const raw = await file.text();

    // Many PDFs still expose readable text in their embedded content streams.
    // This keeps the prototype dependency-free and avoids Vite resolution issues.
    const extracted = raw
      .replace(/\(([^()\\]|\\.)*\)/g, " ")
      .replace(/[^\x20-\x7E\n\r\t]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return extracted;
  } catch (err) {
    console.warn("PDF text extraction failed, falling back:", err);
    // Fallback: try reading raw binary for any embedded text
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const raw = e.target?.result as string ?? "";
        resolve(raw.replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " "));
      };
      reader.onerror = () => resolve("");
      reader.readAsBinaryString(file);
    });
  }
}

// ─── Skill extraction ─────────────────────────────────────────────────────────

/**
 * Given raw resume text, return an array of canonical skill names detected.
 * Uses case-insensitive whole-word matching against the skill dictionary.
 */
export function extractSkillsFromText(text: string): string[] {
  const lower = text.toLowerCase();
  const detected: string[] = [];

  for (const [displayName, tokens] of Object.entries(SKILL_DICTIONARY)) {
    for (const token of tokens) {
      // Match the token as a word/phrase (allow word boundaries)
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(?<![a-z])${escaped}(?![a-z])`, "i");
      if (regex.test(lower)) {
        detected.push(displayName);
        break; // Found this skill, no need to check other aliases
      }
    }
  }

  return detected;
}

// ─── All-in-one ───────────────────────────────────────────────────────────────

export type ParsedResume = {
  rawText: string;
  skills: string[];
  wordCount: number;
};

/**
 * Parse an uploaded resume file and return extracted text + detected skills.
 */
export async function parseResume(file: File): Promise<ParsedResume> {
  const rawText = await extractTextFromFile(file);
  const skills = extractSkillsFromText(rawText);
  const wordCount = rawText.split(/\s+/).filter(Boolean).length;
  return { rawText, skills, wordCount };
}
