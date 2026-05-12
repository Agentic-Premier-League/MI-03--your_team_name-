import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sidebar } from "../../components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  LayoutDashboard, FileText, Briefcase, TrendingUp, Video,
  Code, MessageCircle, Target, CheckCircle, X, BookOpen,
  ExternalLink, Sparkles, ChevronRight, AlertCircle, Star,
  Zap
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

type ScoredJob = Job & { matchScore: number; matchedSkills: string[]; missingSkills: string[] };

function CoverageBar({ matched, total }: { matched: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((matched / total) * 100);
  const color =
    pct >= 70 ? "bg-success" : pct >= 40 ? "bg-warning" : "bg-destructive/70";
  const textColor =
    pct >= 70 ? "text-success" : pct >= 40 ? "text-warning" : "text-destructive";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-muted-foreground">Skill Coverage</span>
        <span className={`font-bold text-lg ${textColor}`}>{pct}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {matched} of {total} required skills matched
      </p>
    </div>
  );
}

export function PerformanceAnalytics() {
  const profile = getProfile();
  const [topJobs, setTopJobs] = useState<ScoredJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<ScoredJob | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGapResult | null>(null);

  useEffect(() => {
    const skills = profile?.skills ?? [];
    const scored = getRecommendedJobs(skills, MOCK_JOBS).slice(0, 8) as ScoredJob[];
    setTopJobs(scored);
    if (scored.length > 0) {
      setSelectedJob(scored[0]);
      setSkillGap(analyzeSkillGap(skills, scored[0]));
    }
  }, []);

  const handleSelectJob = (job: ScoredJob) => {
    setSelectedJob(job);
    setSkillGap(analyzeSkillGap(profile?.skills ?? [], job));
  };

  const hasSkills = (profile?.skills?.length ?? 0) > 0;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="HG" title="HireGenie AI" />
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
            <Target className="w-7 h-7 text-primary" />
            Skill Gap Analysis
          </h1>
          <p className="text-muted-foreground">
            Select a target job to see exactly which skills you have, what you're missing, and how to close the gap.
          </p>
        </div>

        {/* No skills state */}
        {!hasSkills ? (
          <Card className="border border-border/60">
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Add Your Skills First</h3>
              <p className="text-muted-foreground text-sm mb-5">
                Add your skills in the Profile section to get a personalised skill gap analysis against any job.
              </p>
              <Link to="/candidate/profile">
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  Complete Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* ── Left: Job selector (2/5 width) ── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Your skills card */}
              <Card className="border border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Your Skills ({profile?.skills.length ?? 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {profile?.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Link to="/candidate/profile" className="block mt-3">
                    <Button variant="outline" size="sm" className="text-xs gap-1 h-7">
                      <FileText className="w-3 h-3" /> Edit Skills
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Job list */}
              <Card className="border border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Select a Target Job</CardTitle>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  {topJobs.map((job) => {
                    const isSelected = selectedJob?.id === job.id;
                    const total = job.requiredSkills.length;
                    const matched = job.matchedSkills.length;
                    const pct = total === 0 ? 0 : Math.round((matched / total) * 100);
                    return (
                      <button
                        key={job.id}
                        onClick={() => handleSelectJob(job)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/40 hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="min-w-0 flex-1">
                            <p className={`font-medium text-sm truncate ${isSelected ? "text-primary" : ""}`}>
                              {job.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="flex items-center gap-1 ml-2 shrink-0">
                            <Star className={`w-3 h-3 ${job.matchScore >= 70 ? "text-success fill-success" : "text-warning fill-warning"}`} />
                            <span className={`font-bold text-sm ${job.matchScore >= 70 ? "text-success" : "text-warning"}`}>
                              {job.matchScore}%
                            </span>
                          </div>
                        </div>
                        {/* Skill coverage mini bar */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${pct >= 70 ? "bg-success" : pct >= 40 ? "bg-warning" : "bg-destructive/70"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">{matched}/{total}</span>
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* ── Right: Gap analysis (3/5 width) ── */}
            <div className="lg:col-span-3">
              {selectedJob && skillGap ? (
                <div className="space-y-4">
                  {/* Job header */}
                  <Card className="border border-border/60">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold mb-0.5">{selectedJob.title}</h2>
                          <p className="text-primary font-medium text-sm">{selectedJob.company}</p>
                          <p className="text-xs text-muted-foreground mt-1">{selectedJob.location} · {selectedJob.salary}</p>
                        </div>
                        <Badge
                          className={`text-sm font-bold px-3 py-1 ${
                            selectedJob.matchScore >= 70
                              ? "bg-success/10 text-success border-success/30"
                              : "bg-warning/10 text-warning border-warning/30"
                          }`}
                          variant="outline"
                        >
                          {selectedJob.matchScore}% Match
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <CoverageBar
                          matched={skillGap.matched.length}
                          total={skillGap.matched.length + skillGap.missing.filter(s =>
                            selectedJob.requiredSkills.includes(s)
                          ).length}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Matched skills */}
                  {skillGap.matched.length > 0 && (
                    <Card className="border border-success/30 bg-success/5">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2 text-success">
                          <CheckCircle className="w-4 h-4" />
                          Skills You Have ({skillGap.matched.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {skillGap.matched.map((s) => (
                            <span
                              key={s}
                              className="flex items-center gap-1 px-3 py-1 bg-success/10 text-success border border-success/30 rounded-full text-sm font-medium"
                            >
                              <CheckCircle className="w-3 h-3" /> {s}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Missing skills */}
                  {skillGap.missing.length > 0 && (
                    <Card className="border border-destructive/30 bg-destructive/5">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                          <X className="w-4 h-4" />
                          Skills to Develop ({skillGap.missing.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {skillGap.missing.map((s) => {
                            const isRequired = selectedJob.requiredSkills.includes(s);
                            return (
                              <span
                                key={s}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${
                                  isRequired
                                    ? "bg-destructive/10 text-destructive border-destructive/30"
                                    : "bg-warning/10 text-warning border-warning/30"
                                }`}
                              >
                                <X className="w-3 h-3" />
                                {s}
                                {!isRequired && (
                                  <span className="text-xs opacity-70">(optional)</span>
                                )}
                              </span>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Learning path */}
                  {skillGap.learningPath.length > 0 && (
                    <Card className="border border-border/60">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          Recommended Learning Path
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {skillGap.learningPath.map((item, i) => (
                          <div
                            key={item.skill}
                            className="flex gap-3 p-3 bg-muted/40 rounded-xl border border-border hover:border-primary/30 transition-colors group"
                          >
                            {/* Step number */}
                            <div className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-semibold text-sm">{item.skill}</span>
                                <Badge variant="secondary" className="text-xs h-5">
                                  ~{item.timeEstimate}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{item.resource}</p>
                            </div>
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border border-border hover:border-primary hover:bg-primary/10 transition-colors mt-0.5"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary" />
                              </a>
                            )}
                          </div>
                        ))}

                        {/* Total time estimate */}
                        <div className="mt-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                          <p className="text-xs font-medium text-primary flex items-center gap-1.5">
                            <Target className="w-3.5 h-3.5" />
                            Estimated time to close all gaps:{" "}
                            <span className="font-bold">
                              {skillGap.learningPath.length <= 2
                                ? "2-4 weeks"
                                : skillGap.learningPath.length <= 4
                                ? "4-8 weeks"
                                : "8-12 weeks"}
                            </span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* All skills matched! */}
                  {skillGap.missing.length === 0 && (
                    <Card className="border border-success/40 bg-success/5">
                      <CardContent className="p-6 text-center">
                        <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
                        <h3 className="font-bold text-success text-lg mb-1">Perfect Match! 🎉</h3>
                        <p className="text-sm text-muted-foreground">
                          You have all the required skills for this role. Apply now!
                        </p>
                        <Link to="/candidate/jobs" className="block mt-4">
                          <Button className="gap-2">
                            <Sparkles className="w-4 h-4" />
                            Apply on Job Board
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Card className="border border-border/60 h-full flex items-center justify-center min-h-[400px]">
                  <CardContent className="text-center p-12">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">Select a job from the left to see your skill gap</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
