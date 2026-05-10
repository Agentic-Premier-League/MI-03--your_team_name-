import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { StatusBadge } from "../../components/StatusBadge";
import { Badge } from "../../components/ui/Badge";
import {
  LayoutDashboard, FileText, Briefcase, Users, Video, Code,
  TrendingUp, Bell, MapPin, Calendar
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/candidate/profile", icon: FileText },
  { label: "Applied Jobs", href: "/candidate/applied-jobs", icon: Briefcase },
  { label: "Referral Status", href: "/candidate/referral-status", icon: Users },
  { label: "Mock Interview", href: "/candidate/mock-interview", icon: Video },
  { label: "Coding Tests", href: "/candidate/coding-tests", icon: Code },
  { label: "Analytics", href: "/candidate/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/candidate/notifications", icon: Bell },
];

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    appliedDate: "2 days ago",
    status: "interview" as const,
    aiScore: 92,
    stage: "Technical Interview"
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    appliedDate: "1 week ago",
    status: "shortlisted" as const,
    aiScore: 88,
    stage: "Initial Screening"
  },
  {
    id: 3,
    title: "React Developer",
    company: "BigTech Inc",
    location: "New York, NY",
    appliedDate: "2 weeks ago",
    status: "review" as const,
    aiScore: 85,
    stage: "Resume Review"
  },
  {
    id: 4,
    title: "Frontend Engineer",
    company: "DesignCo",
    location: "Austin, TX",
    appliedDate: "3 weeks ago",
    status: "rejected" as const,
    aiScore: 78,
    stage: "Not Selected"
  },
];

export function AppliedJobs() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Applied Jobs</h1>
          <p className="text-muted-foreground">Track your applications and interview progress</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Applications ({jobs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-5 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                      <p className="text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {job.appliedDate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        <span className="text-sm text-muted-foreground">AI Match Score</span>
                        <p className="text-2xl font-bold text-success">{job.aiScore}</p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">Current Stage:</span>
                      <span className="ml-2 font-medium">{job.stage}</span>
                    </div>
                    {job.status === "interview" && (
                      <Badge variant="info">Interview Scheduled</Badge>
                    )}
                    {job.status === "shortlisted" && (
                      <Badge variant="success">Under Review</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
