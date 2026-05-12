import { useState, useEffect } from "react";
import { Sidebar } from "../../components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { StatusBadge } from "../../components/StatusBadge";
import {
  LayoutDashboard, FileText, Briefcase, TrendingUp, Video,
  Code, MessageCircle, MapPin, Calendar, Sparkles,
  CheckCircle, Clock, XCircle, Filter, Star
} from "lucide-react";
import { getApplications, type Application } from "../../lib/candidateStore";

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

const STATUS_CONFIG: Record<
  Application["status"],
  { label: string; color: string; bg: string; icon: React.ComponentType<{ className?: string }> }
> = {
  applied: { label: "Applied", color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20", icon: Clock },
  review: { label: "Under Review", color: "text-warning", bg: "bg-warning/10 border-warning/20", icon: Clock },
  interview: { label: "Interview Scheduled", color: "text-info", bg: "bg-info/10 border-info/20", icon: Video },
  selected: { label: "Selected! 🎉", color: "text-success", bg: "bg-success/10 border-success/20", icon: CheckCircle },
  rejected: { label: "Not Selected", color: "text-destructive", bg: "bg-destructive/10 border-destructive/20", icon: XCircle },
};

const STAGE_MAP: Record<Application["status"], string> = {
  applied: "Application Submitted",
  review: "Resume Review",
  interview: "Technical Interview",
  selected: "Offer Extended",
  rejected: "Application Closed",
};

// Progress steps for the application pipeline
const PIPELINE_STEPS = ["applied", "review", "interview", "selected"] as const;

function ApplicationPipeline({ status }: { status: Application["status"] }) {
  const currentIdx = status === "rejected"
    ? -1
    : PIPELINE_STEPS.indexOf(status as (typeof PIPELINE_STEPS)[number]);

  return (
    <div className="flex items-center gap-1 mt-3">
      {PIPELINE_STEPS.map((step, i) => {
        const done = currentIdx > i;
        const active = currentIdx === i;
        const rejected = status === "rejected";
        return (
          <div key={step} className="flex items-center flex-1 last:flex-initial">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                rejected && i <= 1
                  ? "bg-destructive/20 text-destructive"
                  : done
                  ? "bg-success text-white"
                  : active
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? "✓" : i + 1}
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 transition-all ${
                  done ? "bg-success" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

type FilterStatus = "all" | Application["status"];

export function AppliedJobs() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<FilterStatus>("all");

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);

  const stats = {
    total: applications.length,
    active: applications.filter((a) => !["rejected", "selected"].includes(a.status)).length,
    interviews: applications.filter((a) => a.status === "interview").length,
    offers: applications.filter((a) => a.status === "selected").length,
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      const now = new Date();
      const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === 0) return "Today";
      if (diff === 1) return "Yesterday";
      if (diff < 7) return `${diff} days ago`;
      return d.toLocaleDateString();
    } catch {
      return "Recently";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="HG" title="HireGenie AI" />
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">My Applications</h1>
          <p className="text-muted-foreground">Track your applications through every stage of the process</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-foreground" },
            { label: "Active", value: stats.active, color: "text-blue-500" },
            { label: "Interviews", value: stats.interviews, color: "text-info" },
            { label: "Offers", value: stats.offers, color: "text-success" },
          ].map((s) => (
            <Card key={s.label} className="border border-border/60 p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(["all", "applied", "review", "interview", "selected", "rejected"] as FilterStatus[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {f === "all" ? "All" : STATUS_CONFIG[f].label}
            </button>
          ))}
        </div>

        {/* Applications list */}
        {filtered.length === 0 ? (
          <Card className="border border-border/60">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {applications.length === 0 ? "No Applications Yet" : "No applications match this filter"}
              </h3>
              <p className="text-muted-foreground text-sm">
                {applications.length === 0
                  ? "Browse jobs and apply with one click to start tracking your applications here."
                  : "Try a different filter above."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filtered.map((app) => {
              const cfg = STATUS_CONFIG[app.status];
              const Icon = cfg.icon;
              return (
                <Card
                  key={app.id}
                  className="border border-border/60 hover:border-primary/30 transition-all"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-0.5">{app.jobTitle}</h3>
                        <p className="text-muted-foreground mb-2">{app.company}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {app.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Applied {formatDate(app.appliedAt)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 justify-end mb-2">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="text-xl font-bold text-success">{app.matchScore}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">AI Match</p>
                        <div className={`mt-2 flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.color} ${cfg.bg}`}>
                          <Icon className="w-3 h-3" />
                          {cfg.label}
                        </div>
                      </div>
                    </div>

                    {/* Application pipeline */}
                    <div className="mt-4 pt-3 border-t border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Current Stage:</span>
                        <span className="text-xs font-medium">{STAGE_MAP[app.status]}</span>
                      </div>
                      <ApplicationPipeline status={app.status} />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        {["Applied", "Review", "Interview", "Offer"].map((l) => (
                          <span key={l}>{l}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
