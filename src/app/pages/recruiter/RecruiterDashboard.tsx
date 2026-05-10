import { Link } from "react-router";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { LayoutDashboard, Users, TrendingUp, Bell, ChevronRight, Briefcase } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/recruiter/candidates", icon: Users },
  { label: "Post Job", href: "/recruiter/jobs/new", icon: Briefcase },
  { label: "Analytics", href: "/recruiter/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/recruiter/notifications", icon: Bell },
];

import { useState, useEffect } from "react";

export function RecruiterDashboard() {
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/candidates')
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.error("Failed to fetch candidates", err));
  }, []);

  const funnelStages = [
    { stage: "Applied", count: candidates.filter(c => c.status === 'applied').length || 1250, color: "#9CA3AF" },
    { stage: "Screening", count: candidates.filter(c => c.status === 'screening').length || 480, color: "#3B82F6" },
    { stage: "Interview", count: candidates.filter(c => c.status === 'interview').length || 120, color: "#F59E0B" },
    { stage: "Offered", count: candidates.filter(c => c.status === 'offered').length || 25, color: "#10B981" },
    { stage: "Hired", count: candidates.filter(c => c.status === 'hired').length || 10, color: "#8B5CF6" },
  ];
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pipeline Overview</h1>
          <p className="text-muted-foreground">Monitor candidate progress through the hiring funnel</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Hiring Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelStages.map((stage, index) => {
                const percentage = index === 0 ? 100 : (stage.count / funnelStages[0].count) * 100;
                return (
                  <Link
                    key={stage.stage}
                    to={`/recruiter/candidates?stage=${stage.stage.toLowerCase()}`}
                    className="block group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-32 font-medium">{stage.stage}</div>
                      <div className="flex-1">
                        <div className="h-12 bg-muted rounded-lg overflow-hidden relative group-hover:shadow-lg transition-shadow">
                          <div
                            className="h-full flex items-center px-4 transition-all"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: stage.color,
                            }}
                          >
                            <span className="font-bold text-white text-lg">{stage.count}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Priority Candidates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {candidates.slice(0, 3).map((candidate) => (
                  <Link
                    key={candidate.name}
                    to={`/recruiter/candidates/${candidate.id}`}
                    className="block p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">{candidate.aiScore}</p>
                        <p className="text-xs text-muted-foreground">AI Score</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/recruiter/candidates">
                <Button variant="secondary" className="w-full mt-4">
                  View All Candidates
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="font-medium mb-1">12 Interview Requests</p>
                  <p className="text-sm text-muted-foreground">Awaiting your review</p>
                </div>
                <div className="p-3 bg-info/10 border border-info/20 rounded-lg">
                  <p className="font-medium mb-1">8 AI Reports Ready</p>
                  <p className="text-sm text-muted-foreground">New consensus available</p>
                </div>
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                  <p className="font-medium mb-1">5 Candidates Shortlisted</p>
                  <p className="text-sm text-muted-foreground">Ready for next round</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Time to Hire</span>
                <span className="font-bold">18 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Offer Acceptance Rate</span>
                <span className="font-bold text-success">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Job Openings</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Accuracy Rate</span>
                <span className="font-bold text-primary">92%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
