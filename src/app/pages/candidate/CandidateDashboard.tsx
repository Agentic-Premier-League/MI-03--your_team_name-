import { Link } from "react-router";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { AIScoreRing } from "../../components/AIScoreRing";
import { Button } from "../../components/ui/Button";
import {
  LayoutDashboard, FileText, Briefcase, Users, Video, Code,
  TrendingUp, Bell, CheckCircle, Clock, XCircle
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

const matchedSkills = [
  "React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"
];

const applications = [
  { id: 1, job: "Senior Frontend Developer", company: "TechCorp", status: "interview", aiScore: 92, date: "2 days ago" },
  { id: 2, job: "Full Stack Engineer", company: "StartupXYZ", status: "shortlisted", aiScore: 88, date: "1 week ago" },
  { id: 3, job: "React Developer", company: "BigTech Inc", status: "review", aiScore: 85, date: "2 weeks ago" },
];

export function CandidateDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-muted-foreground">Here's your recruitment journey overview</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>AI Resume Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <AIScoreRing score={88} size="lg" showLabel={false} />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Your resume has a strong ATS match score
              </p>
              <Button variant="secondary" className="mt-4 w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Skills Matched</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-2xl font-bold">8/10</p>
                  <p className="text-sm text-muted-foreground">Skills matched with open positions</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success">92%</p>
                  <p className="text-sm text-muted-foreground">Match rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Applications</CardTitle>
              <Link to="/candidate/applied-jobs">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{app.job}</h4>
                    <p className="text-sm text-muted-foreground">{app.company} • {app.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">AI Score</p>
                      <p className="text-lg font-bold text-success">{app.aiScore}/100</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.status === "interview" && (
                        <>
                          <Video className="w-4 h-4 text-info" />
                          <span className="text-sm font-medium text-info">Interview</span>
                        </>
                      )}
                      {app.status === "shortlisted" && (
                        <>
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="text-sm font-medium text-success">Shortlisted</span>
                        </>
                      )}
                      {app.status === "review" && (
                        <>
                          <Clock className="w-4 h-4 text-warning" />
                          <span className="text-sm font-medium text-warning">Review</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/candidate/mock-interview">
                <Button variant="primary" className="w-full justify-start">
                  <Video className="w-5 h-5 mr-3" />
                  Start AI Mock Interview
                </Button>
              </Link>
              <Link to="/candidate/coding-tests">
                <Button variant="secondary" className="w-full justify-start">
                  <Code className="w-5 h-5 mr-3" />
                  Practice Coding Tests
                </Button>
              </Link>
              <Link to="/candidate/profile">
                <Button variant="secondary" className="w-full justify-start">
                  <FileText className="w-5 h-5 mr-3" />
                  Update Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">Total Applications</span>
                </div>
                <span className="text-xl font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm">Shortlisted</span>
                </div>
                <span className="text-xl font-bold text-success">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-info" />
                  <span className="text-sm">Interviews</span>
                </div>
                <span className="text-xl font-bold text-info">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-sm">Rejected</span>
                </div>
                <span className="text-xl font-bold text-destructive">4</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
