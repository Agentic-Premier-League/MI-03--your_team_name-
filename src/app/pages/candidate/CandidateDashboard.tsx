import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { AIScoreRing } from "../../components/AIScoreRing";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  LayoutDashboard, FileText, Briefcase, Users, Video, Code,
  TrendingUp, Bell, CheckCircle, Clock, XCircle, Sparkles,
  Target, BookOpen, MessageCircle, Upload, ChevronRight,
  Star
} from "lucide-react";
import { getProfile, getResumeAnalysis, getApplications, type Application } from "../../lib/candidateStore";
import { getRecommendedJobs } from "../../lib/aiEngine";
import { MOCK_JOBS } from "../../lib/mockJobs";

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

const STATUS_CONFIG: Record<Application["status"], { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  applied: { label: "Applied", color: "text-blue-500", icon: Clock },
  review: { label: "Under Review", color: "text-warning", icon: Clock },
  interview: { label: "Interview", color: "text-info", icon: Video },
  selected: { label: "Selected!", color: "text-success", icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-destructive", icon: XCircle },
};

export function CandidateDashboard() {
  const navigate = useNavigate();
  const profile = getProfile();
  const resumeAnalysis = getResumeAnalysis();
  const applications = getApplications();

  const [topJobs, setTopJobs] = useState<ReturnType<typeof getRecommendedJobs>>([]);

  useEffect(() => {
    const skills = profile?.skills ?? [];
    const recommended = getRecommendedJobs(skills, MOCK_JOBS).slice(0, 3);
    setTopJobs(recommended);
  }, []);

  const stats = {
    total: applications.length,
    shortlisted: applications.filter((a) => a.status === "interview" || a.status === "selected").length,
    interviews: applications.filter((a) => a.status === "interview").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const aiScore = resumeAnalysis?.score ?? (profile?.profileComplete ?? 30);
  const candidateName = profile?.name ?? "there";

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="HG" title="HireGenie AI" />
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Welcome back, {candidateName.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your AI-powered recruitment journey overview
            </p>
          </div>
          <Button onClick={() => navigate("/candidate/jobs")} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Browse Jobs
          </Button>
        </div>

        {/* Profile completion alert */}
        {(profile?.profileComplete ?? 0) < 70 && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Upload className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Complete your profile to unlock better matches</p>
                <p className="text-xs text-muted-foreground">Upload your resume to activate AI analysis</p>
              </div>
            </div>
            <Link to="/candidate/profile">
              <Button variant="outline" size="sm" className="gap-1">
                Complete Profile <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        )}

        {/* Top cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* AI Resume Score */}
          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle className="text-base">AI Resume Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <AIScoreRing score={aiScore} size="lg" showLabel={false} />
              <p className="text-sm text-muted-foreground mt-3 text-center">
                {aiScore >= 75
                  ? "Strong ATS match — you're competitive!"
                  : aiScore >= 50
                  ? "Good foundation. Upload your resume to improve."
                  : "Upload your resume to get AI analysis."}
              </p>
              <Link to="/candidate/profile" className="w-full mt-4">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <FileText className="w-4 h-4" />
                  {resumeAnalysis ? "View Analysis" : "Upload Resume"}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-3">
                <span className="text-3xl font-bold">{profile?.profileComplete ?? 10}%</span>
                <span className="text-sm text-muted-foreground">complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 mb-4">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${profile?.profileComplete ?? 10}%` }}
                />
              </div>
              <div className="space-y-2">
                {[
                  { label: "Basic Info", done: !!profile?.name },
                  { label: "Resume Uploaded", done: !!profile?.resumeFileName },
                  { label: "Skills Added", done: (profile?.skills?.length ?? 0) >= 3 },
                  { label: "Links Added", done: !!(profile?.linkedin || profile?.github) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.done ? "bg-success text-white" : "bg-muted"}`}>
                      {item.done && <CheckCircle className="w-3 h-3" />}
                    </div>
                    <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Stats */}
          <Card className="border border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Application Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Total Applied", value: stats.total, color: "text-foreground", icon: Briefcase },
                { label: "Shortlisted", value: stats.shortlisted, color: "text-success", icon: CheckCircle },
                { label: "Interviews", value: stats.interviews, color: "text-info", icon: Video },
                { label: "Rejected", value: stats.rejected, color: "text-destructive", icon: XCircle },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Skills section */}
        {(profile?.skills?.length ?? 0) > 0 && (
          <Card className="mb-8 border border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Your Skills</CardTitle>
                <Badge variant="secondary">{profile?.skills.length} skills</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile?.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Recommended Jobs */}
        <Card className="mb-8 border border-border/60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">AI Recommended Jobs</CardTitle>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">AI Powered</span>
              </div>
              <Link to="/candidate/jobs">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ChevronRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topJobs.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  Complete your profile to get personalized job recommendations.
                </p>
              ) : (
                topJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-0.5">{job.title}</h4>
                      <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning fill-warning" />
                          <span className="text-sm font-bold text-success">{job.matchScore}%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">match</span>
                      </div>
                      <Link to="/candidate/jobs">
                        <Button variant="outline" size="sm">Apply</Button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        {applications.length > 0 && (
          <Card className="mb-8 border border-border/60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Recent Applications</CardTitle>
                <Link to="/candidate/applied-jobs">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ChevronRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => {
                  const cfg = STATUS_CONFIG[app.status];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{app.jobTitle}</h4>
                        <p className="text-xs text-muted-foreground">{app.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-success">{app.matchScore}%</span>
                        <div className={`flex items-center gap-1 ${cfg.color}`}>
                          <Icon className="w-4 h-4" />
                          <span className="text-xs font-medium">{cfg.label}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Browse Jobs", href: "/candidate/jobs", icon: Sparkles, desc: "See AI-matched openings" },
            { label: "Skill Gap Analysis", href: "/candidate/analytics", icon: Target, desc: "Know what to learn next" },
            { label: "AI Career Chat", href: "/candidate/career-suggestions", icon: BookOpen, desc: "Get personalized guidance" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} to={action.href}>
                <div className="p-4 border border-border/60 rounded-xl hover:border-primary/40 hover:bg-muted/30 transition-all cursor-pointer group">
                  <Icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
