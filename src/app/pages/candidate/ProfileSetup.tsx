import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { AIScoreRing } from "../../components/AIScoreRing";
import {
  LayoutDashboard, FileText, Briefcase, TrendingUp,
  Video, Code, MessageCircle, Upload, Github, Linkedin,
  Globe, CheckCircle, Loader2, Plus, X, Sparkles
} from "lucide-react";
import { getProfile, saveProfile, saveResumeAnalysis, getResumeAnalysis } from "../../lib/candidateStore";
import { analyzeResume } from "../../lib/aiEngine";
import { parseResume } from "../../lib/resumeParser";

const sidebarItems = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
  { label: "Profile & Resume", href: "/candidate/profile", icon: FileText },
  { label: "Job Board", href: "/candidate/jobs", icon: Sparkles },
  { label: "My Applications", href: "/candidate/applied-jobs", icon: Briefcase },
  { label: "Skill Gap Analysis", href: "/candidate/analytics", icon: TrendingUp },
  { label: "AI Career Chat", href: "/candidate/career-suggestions", icon: MessageCircle },
  { label: "Mock Interview", href: "/candidate/mock-interview", icon: Video },
  { label: "Coding Tests", href: "/candidate/coding-tests", icon: Code },
];

const SUGGESTED_SKILLS = [
  "React", "TypeScript", "JavaScript", "Node.js", "Python", "AWS", "Docker",
  "GraphQL", "PostgreSQL", "MongoDB", "Redis", "Kubernetes", "Next.js",
  "Vue.js", "Angular", "Java", "Go", "Rust", "Swift", "Kotlin",
  "Machine Learning", "Data Science", "DevOps", "CI/CD", "Git"
];

export function ProfileSetup() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted data
  const existingProfile = getProfile();
  const existingAnalysis = getResumeAnalysis();

  const [step, setStep] = useState(existingProfile?.resumeFileName ? 3 : 1);
  const [analyzing, setAnalyzing] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState(existingProfile?.name?.split(" ")[0] ?? "");
  const [lastName, setLastName] = useState(existingProfile?.name?.split(" ").slice(1).join(" ") ?? "");
  const [email, setEmail] = useState(existingProfile?.email ?? "");
  const [phone, setPhone] = useState(existingProfile?.phone ?? "");
  const [location, setLocation] = useState(existingProfile?.location ?? "");
  const [experience, setExperience] = useState(existingProfile?.experience ?? "1");
  const [linkedin, setLinkedin] = useState(existingProfile?.linkedin ?? "");
  const [github, setGithub] = useState(existingProfile?.github ?? "");
  const [portfolio, setPortfolio] = useState(existingProfile?.portfolio ?? "");
  const [skills, setSkills] = useState<string[]>(existingProfile?.skills ?? []);
  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState(existingProfile?.resumeFileName ?? "");
  const [analysis, setAnalysis] = useState(existingAnalysis);
  // Skills extracted from the actual resume file (separate from manually typed)
  const [parsedSkills, setParsedSkills] = useState<string[]>([]);
  const [parsing, setParsing] = useState(false);
  const [parseStatus, setParseStatus] = useState<"idle" | "parsing" | "done" | "error">("idle");

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleStep1Next = () => {
    saveProfile({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      location,
      experience,
      skills,
    });
    setStep(2);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setResumeFileName(file.name);
    setParsing(true);
    setParseStatus("parsing");

    try {
      // Actually parse the file and extract skills from its content
      const parsed = await parseResume(file);
      if (parsed.skills.length > 0) {
        // Merge resume-detected skills with any manually added skills
        const merged = Array.from(new Set([...skills, ...parsed.skills]));
        setSkills(merged);
        setParsedSkills(parsed.skills);
      }
      setParseStatus("done");
    } catch {
      setParseStatus("error");
    } finally {
      setParsing(false);
    }
  };

  const handleStep2Next = async () => {
    setAnalyzing(true);

    // If a file was uploaded but parsing is still running, wait for it
    if (parsing) await new Promise((r) => setTimeout(r, 2000));

    // Use the full merged skill set (manually entered + resume-detected)
    const finalSkills = skills;

    // Save profile with all collected data
    saveProfile({
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      location,
      experience,
      linkedin,
      github,
      portfolio,
      skills: finalSkills,
      resumeFileName: resumeFileName || "resume.pdf",
    });

    // Brief delay so the loading state is visible
    await new Promise((r) => setTimeout(r, 1000));

    // Run AI analysis using the actual extracted skills
    const result = analyzeResume(
      resumeFileName || "resume.pdf",
      finalSkills,
      experience
    );
    saveResumeAnalysis(result);
    setAnalysis(result);
    setAnalyzing(false);
    setStep(3);
  };

  const handleComplete = () => {
    navigate("/candidate/dashboard");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="HG" title="HireGenie AI" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Profile &amp; Resume</h1>
          <p className="text-muted-foreground">Complete your profile to get better AI job matches</p>
        </div>

        <div className="max-w-3xl">
          {/* Step progress */}
          <div className="flex items-center mb-8">
            {["Personal Info", "Resume & Links", "AI Analysis"].map((label, i) => {
              const s = i + 1;
              return (
                <div key={s} className="flex items-center flex-1 last:flex-initial">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                      s < step
                        ? "bg-success text-white"
                        : s === step
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                  </div>
                  <div className="ml-2 mr-4 hidden sm:block">
                    <p className={`text-xs font-medium ${s <= step ? "text-foreground" : "text-muted-foreground"}`}>
                      {label}
                    </p>
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-0.5 mr-2 ${s < step ? "bg-success" : "bg-muted"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Step 1: Personal Info ── */}
          {step === 1 && (
            <Card className="border border-border/60">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">First Name</label>
                    <Input placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Last Name</label>
                    <Input placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <Input type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Location</label>
                    <Input placeholder="San Francisco, CA" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Years of Experience</label>
                  <select
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    <option value="0">0–1 years (Entry level)</option>
                    <option value="2">2–3 years</option>
                    <option value="4">4–5 years</option>
                    <option value="6">6–8 years (Senior)</option>
                    <option value="9">9+ years (Lead/Principal)</option>
                  </select>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Your Skills</label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a skill (e.g. React)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(newSkill); } }}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => addSkill(newSkill)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Skill chips */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skills.map((skill) => (
                        <span key={skill} className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm">
                          {skill}
                          <button onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Suggested skills */}
                  <p className="text-xs text-muted-foreground mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).slice(0, 12).map((skill) => (
                      <button
                        key={skill}
                        onClick={() => addSkill(skill)}
                        className="px-2 py-0.5 border border-border rounded-full text-xs hover:border-primary hover:text-primary transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleStep1Next} className="w-full">
                  Next: Upload Resume
                </Button>
              </CardContent>
            </Card>
          )}

          {/* ── Step 2: Resume & Links ── */}
          {step === 2 && (
            <Card className="border border-border/60">
              <CardHeader>
                <CardTitle>Upload Resume &amp; Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Resume upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Resume
                    <span className="ml-2 text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      AI-powered skill extraction
                    </span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      resumeFileName
                        ? "border-success/50 bg-success/5"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {parsing ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                        <p className="font-medium text-primary">Reading your resume...</p>
                        <p className="text-xs text-muted-foreground">Extracting skills with AI</p>
                      </div>
                    ) : resumeFileName ? (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle className="w-10 h-10 text-success" />
                        <p className="font-medium text-success">{resumeFileName}</p>
                        <p className="text-xs text-muted-foreground">Click to change</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="font-medium mb-1">Drop your resume here or click to browse</p>
                        <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 5MB</p>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />
                  </div>

                  {/* Parse results */}
                  {parseStatus === "done" && parsedSkills.length > 0 && (
                    <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-xs font-semibold text-success mb-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {parsedSkills.length} skills extracted from your resume:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {parsedSkills.map((s) => (
                          <span key={s} className="px-2 py-0.5 bg-success/10 text-success border border-success/20 rounded-full text-xs">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {parseStatus === "done" && parsedSkills.length === 0 && resumeFileName && (
                    <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg text-xs text-warning">
                      ⚠️ Could not extract skills from this file format. Please add them manually below, or upload a plain-text PDF.
                    </div>
                  )}

                  {parseStatus === "error" && (
                    <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive">
                      ✗ Failed to read file. Please try a different format or add skills manually.
                    </div>
                  )}

                  {!resumeFileName && parseStatus === "idle" && (
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 Upload a PDF resume and we'll automatically extract your skills from it.
                    </p>
                  )}
                </div>


                {/* Links */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">LinkedIn Profile</label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="linkedin.com/in/janedoe" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">GitHub Profile</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="github.com/janedoe" value={github} onChange={(e) => setGithub(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Portfolio Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input className="pl-9" placeholder="janedoe.dev" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1 gap-2" onClick={handleStep2Next} disabled={analyzing}>
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze with AI
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Step 3: AI Analysis Results ── */}
          {step === 3 && analysis && (
            <Card className="border border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Resume Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score */}
                <div className="flex flex-col items-center py-4">
                  <AIScoreRing score={analysis.score} size="lg" />
                  <p className="text-center text-sm text-muted-foreground mt-3 max-w-md">
                    {analysis.score >= 75
                      ? "Great! Your profile is competitive for most job listings."
                      : analysis.score >= 50
                      ? "Good start! Adding more skills and quantifying achievements will improve your score."
                      : "Build up your profile with more skills, projects, and experience details."}
                  </p>
                </div>

                {/* Extracted skills */}
                {analysis.extractedSkills.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" /> Detected Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.extractedSkills.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-success/10 text-success border border-success/20 rounded-full text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
                  <h4 className="font-semibold text-success mb-2">✅ Strengths</h4>
                  <ul className="space-y-1">
                    {analysis.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                    ))}
                  </ul>
                </div>

                {/* Missing skills */}
                {analysis.missingSkills.length > 0 && (
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                    <h4 className="font-semibold text-warning mb-2">⚡ Skills to Add</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingSkills.map((s) => (
                        <span key={s} className="px-2.5 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <div className="p-4 bg-muted/50 border border-border rounded-xl">
                  <h4 className="font-semibold mb-2">💡 AI Suggestions</h4>
                  <ul className="space-y-1.5">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommended roles */}
                <div>
                  <h4 className="font-semibold mb-2">🎯 Best Matching Roles</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.recommendedRoles.map((role) => (
                      <span key={role} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)}>Re-upload</Button>
                  <Button className="flex-1 gap-2" onClick={handleComplete}>
                    <CheckCircle className="w-4 h-4" />
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
