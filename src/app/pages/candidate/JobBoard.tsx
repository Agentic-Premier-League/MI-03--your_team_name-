import { useState, useEffect } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  LayoutDashboard, FileText, Briefcase, TrendingUp, Video,
  Code, MessageCircle, MapPin, DollarSign, Clock, Search,
  CheckCircle, Sparkles, Star, X, Filter, Zap
} from "lucide-react";
import { getProfile, applyToJob, hasApplied } from "../../lib/candidateStore";
import { getRecommendedJobs } from "../../lib/aiEngine";
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

type ScoredJob = Job & {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
};

function MatchBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-success" : score >= 60 ? "bg-warning" : "bg-destructive/70";
  return (
    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
      <div
        className={`h-1.5 rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

export function JobBoard() {
  const profile = getProfile();
  const [jobs, setJobs] = useState<ScoredJob[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<ScoredJob | null>(null);
  const [appliedSet, setAppliedSet] = useState<Set<string>>(new Set());
  const [applyFeedback, setApplyFeedback] = useState<{ id: string; msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    const skills = profile?.skills ?? [];
    const scored = getRecommendedJobs(skills, MOCK_JOBS) as ScoredJob[];
    setJobs(scored);

    // Build applied set
    const applied = new Set(MOCK_JOBS.filter((j) => hasApplied(j.id)).map((j) => j.id));
    setAppliedSet(applied);
  }, []);

  // Filter jobs
  const filtered = jobs.filter((j) => {
    const matchesSearch =
      search === "" ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesType = typeFilter === "all" || j.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleApply = (job: ScoredJob) => {
    const result = applyToJob(job.id, job.title, job.company, job.location, job.matchScore);
    if (result.success) {
      setAppliedSet((prev) => new Set([...prev, job.id]));
    }
    setApplyFeedback({ id: job.id, msg: result.message, ok: result.success });
    setTimeout(() => setApplyFeedback(null), 3000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="HG" title="HireGenie AI" />
      <div className="flex-1 flex overflow-hidden">
        {/* Job list panel */}
        <div className={`${selectedJob ? "hidden lg:flex" : "flex"} flex-col flex-1 p-6 overflow-auto`}>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-primary" />
              AI Job Board
            </h1>
            <p className="text-muted-foreground">
              Jobs ranked by AI match score based on your skills
              {profile?.skills?.length ? ` (${profile.skills.length} skills detected)` : ""}
            </p>
          </div>

          {/* Search + filter */}
          <div className="flex gap-3 mb-5 flex-wrap">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search jobs, companies, or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {["all", "Full-time", "Remote", "Contract"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    typeFilter === t
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {t === "all" ? "All Types" : t}
                </button>
              ))}
            </div>
          </div>

          {/* Apply feedback toast */}
          {applyFeedback && (
            <div
              className={`mb-4 flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm ${
                applyFeedback.ok
                  ? "bg-success/10 border-success/30 text-success"
                  : "bg-warning/10 border-warning/30 text-warning"
              }`}
            >
              {applyFeedback.ok ? <CheckCircle className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
              {applyFeedback.msg}
            </div>
          )}

          {/* Job count */}
          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} job{filtered.length !== 1 ? "s" : ""} found
          </p>

          {/* Job cards */}
          <div className="space-y-3">
            {filtered.map((job) => {
              const applied = appliedSet.has(job.id);
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border/60 hover:border-primary/40 hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="font-semibold">{job.title}</h3>
                        {applied && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-xs rounded-full border border-success/20">
                            <CheckCircle className="w-3 h-3" /> Applied
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" /> {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {job.postedAt}
                        </span>
                      </div>
                    </div>

                    {/* Match score */}
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 justify-end">
                        <Star
                          className={`w-3.5 h-3.5 ${
                            job.matchScore >= 80 ? "text-success fill-success" : "text-warning fill-warning"
                          }`}
                        />
                        <span className={`font-bold ${job.matchScore >= 80 ? "text-success" : job.matchScore >= 60 ? "text-warning" : "text-muted-foreground"}`}>
                          {job.matchScore}%
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">match</span>
                      <MatchBar score={job.matchScore} />
                    </div>
                  </div>

                  {/* Matched skills preview */}
                  {job.matchedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.matchedSkills.slice(0, 4).map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full border border-success/20">
                          ✓ {s}
                        </span>
                      ))}
                      {job.missingSkills.slice(0, 2).map((s) => (
                        <span key={s} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                          + {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>No jobs match your search. Try different keywords.</p>
              </div>
            )}
          </div>
        </div>

        {/* Job detail panel */}
        {selectedJob && (
          <div className="flex flex-col w-full lg:w-[480px] border-l border-border bg-background overflow-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <Badge variant="secondary" className="text-xs">Job Details</Badge>
              <Button variant="ghost" size="sm" onClick={() => setSelectedJob(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Job header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{selectedJob.title}</h2>
              <p className="text-primary font-medium mb-3">{selectedJob.company}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{selectedJob.type}</Badge>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" /> {selectedJob.location}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSign className="w-3.5 h-3.5" /> {selectedJob.salary}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {selectedJob.postedAt}
                </span>
              </div>

              {/* AI Match score */}
              <div className="p-4 bg-muted/50 rounded-xl border border-border mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    AI Match Score
                  </span>
                  <span className={`text-2xl font-bold ${
                    selectedJob.matchScore >= 80 ? "text-success" : selectedJob.matchScore >= 60 ? "text-warning" : "text-muted-foreground"
                  }`}>
                    {selectedJob.matchScore}%
                  </span>
                </div>
                <MatchBar score={selectedJob.matchScore} />
              </div>

              {/* Apply button */}
              {appliedSet.has(selectedJob.id) ? (
                <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm font-medium mb-4">
                  <CheckCircle className="w-4 h-4" /> Application Submitted
                </div>
              ) : (
                <Button
                  className="w-full gap-2 mb-4"
                  onClick={() => handleApply(selectedJob)}
                >
                  <Zap className="w-4 h-4" />
                  One-Click Apply
                </Button>
              )}
            </div>

            {/* Description */}
            <div className="mb-5">
              <h3 className="font-semibold mb-2">About the Role</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
            </div>

            {/* Required skills */}
            <div className="mb-5">
              <h3 className="font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.requiredSkills.map((s) => {
                  const matched = selectedJob.matchedSkills.includes(s);
                  return (
                    <span
                      key={s}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        matched
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                    >
                      {matched ? "✓ " : "✗ "}{s}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Nice to have skills */}
            <div className="mb-5">
              <h3 className="font-semibold mb-2">Nice to Have</h3>
              <div className="flex flex-wrap gap-2">
                {selectedJob.niceToHaveSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full text-xs border bg-muted text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-5">
              <h3 className="font-semibold mb-1">Experience Required</h3>
              <p className="text-sm text-muted-foreground">{selectedJob.experience}</p>
            </div>

            {/* Missing skills note */}
            {selectedJob.missingSkills.length > 0 && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-xs font-medium text-warning mb-1.5">Skills to develop:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJob.missingSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full border border-warning/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
