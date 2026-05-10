import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  LayoutDashboard, FileText, Briefcase, TrendingUp, Video,
  Code, MessageCircle, Target, CheckCircle, X, BookOpen,
  ExternalLink, Sparkles, ChevronRight
} from "lucide-react";
import { getProfile } from "../../lib/candidateStore";
import { getRecommendedJobs, analyzeSkillGap, type SkillGapResult } from "../../lib/aiEngine";
import { MOCK_JOBS, type Job } from "../../lib/mockJobs";

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

function SkillGapCard({ result }: { result: SkillGapResult }) {
  const total = result.matched.length + result.missing.length;
  const matchPct = total === 0 ? 0 : Math.round((result.matched.length / total) * 100);

  return (
    <div className="space-y-4">
      {/* Match percentage */}
      <div className="p-4 bg-muted/50 rounded-xl border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">Skill Coverage</span>
          <span className={`font-bold text-lg ${matchPct >= 70 ? "text-success" : matchPct >= 40 ? "text-warning" : "text-destructive"}`}>
            {matchPct}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${matchPct >= 70 ? "bg-success" : matchPct >= 40 ? "bg-warning" : "bg-destructive"}`}
            style={{ width: `${matchPct}%` }}
          />
        </div>
      </div>

      {/* Matched skills */}
      {result.matched.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-success flex items-center gap-1.5 mb-2">
            <CheckCircle className="w-4 h-4" /> You have ({result.matched.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.matched.map((s) => (
              <span key={s} className="px-2.5 py-1 bg-success/10 text-success border border-success/20 rounded-full text-xs font-medium">
                ✓ {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing skills */}
      {result.missing.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-destructive flex items-center gap-1.5 mb-2">
            <X className="w-4 h-4" /> Need to learn ({result.missing.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.missing.map((s) => (
              <span key={s} className="px-2.5 py-1 bg-destructive/10 text-destructive border border-destructive/20 rounded-full text-xs font-medium">
                ✗ {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Learning path */}
      {result.learningPath.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-3">
            <BookOpen className="w-4 h-4 text-primary" /> Recommended Learning Path
          </h4>
          <div className="space-y-2">
            {result.learningPath.map((item, i) => (
              <div key={item.skill} className="p-3 bg-muted/40 rounded-lg border border-border text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="font-medium">{item.skill}</span>
                  <Badge variant="secondary" className="text-xs ml-auto">{item.timeEstimate}</Badge>
                </div>
                <p className="text-xs text-muted-foreground pl-7">{item.resource}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function PerformanceAnalytics() {
  const profile = getProfile();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGapResult | null>(null);
  const [topJobs, setTopJobs] = useState<Array<Job & { matchScore: number; matchedSkills: string[]; missingSkills: string[] }>>([]);

  useEffect(() => {
    const skills = profile?.skills ?? [];
    const recommended = getRecommendedJobs(skills, MOCK_JOBS).slice(0, 6);
    setTopJobs(recommended);
    // Auto-select the top job
    if (recommended.length > 0) {
      const topJob = recommended[0];
      setSelectedJobId(topJob.id);
      setSkillGap(analyzeSkillGap(skills, topJob));
    }
  }, []);

  const handleSelectJob = (job: typeof topJobs[0]) => {
    setSelectedJobId(job.id);
    const skills = profile?.skills ?? [];
    setSkillGap(analyzeSkillGap(skills, job));
  };

  const hasSkills = (profile?.skills?.length ?? 0) > 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="HG" title="HireGenie AI" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <Target className="w-7 h-7 text-primary" />
            Skill Gap Analysis
          </h1>
          <p className="text-muted-foreground">
            See how your skills stack up against top job requirements — and what to learn next
          </p>
        </div>

        {!hasSkills ? (
          <Card className="border border-border/60">
            <CardContent className="p-12 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Add Your Skills First</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Add your skills in the Profile section to get a personalized skill gap analysis.
              </p>
              <Link to="/candidate/profile">
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  Go to Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job selector */}
            <div>
              <Card className="border border-border/60">
                <CardHeader>
                  <CardTitle className="text-base">Select a Target Job</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Click on a job to see your skill gap analysis
                  </p>
                  <div className="space-y-2">
                    {topJobs.map((job) => (
                      <button
                        key={job.id}
                        onClick={() => handleSelectJob(job)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          selectedJobId === job.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40 hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className={`font-bold text-sm ${job.matchScore >= 70 ? "text-success" : "text-warning"}`}>
                              {job.matchScore}%
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        {/* Mini match bar */}
                        <div className="mt-2 w-full bg-muted rounded-full h-1">
                          <div
                            className={`h-1 rounded-full ${job.matchScore >= 70 ? "bg-success" : "bg-warning"}`}
                            style={{ width: `${job.matchScore}%` }}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Your current skills */}
              <Card className="mt-6 border border-border/60">
                <CardHeader>
                  <CardTitle className="text-base">Your Current Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link to="/candidate/profile" className="block mt-3">
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Update Skills
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Skill gap details */}
            <div>
              {skillGap && selectedJobId ? (
                <Card className="border border-border/60">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Gap Analysis: {topJobs.find((j) => j.id === selectedJobId)?.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SkillGapCard result={skillGap} />
                  </CardContent>
                </Card>
              ) : (
                <Card className="border border-border/60">
                  <CardContent className="p-12 text-center">
                    <Target className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Select a job to see your skill gap</p>
                  </CardContent>
                </Card>
              )}

              {/* Quick links */}
              <Card className="mt-6 border border-border/60">
                <CardHeader>
                  <CardTitle className="text-base">Learn & Grow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { label: "freeCodeCamp", url: "https://freecodecamp.org", desc: "Free coding courses" },
                      { label: "The Odin Project", url: "https://www.theodinproject.com", desc: "Full stack web dev" },
                      { label: "fast.ai", url: "https://fast.ai", desc: "Practical deep learning" },
                      { label: "Roadmap.sh", url: "https://roadmap.sh", desc: "Developer learning paths" },
                    ].map((r) => (
                      <a
                        key={r.label}
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border transition-all group"
                      >
                        <div>
                          <p className="text-sm font-medium">{r.label}</p>
                          <p className="text-xs text-muted-foreground">{r.desc}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
