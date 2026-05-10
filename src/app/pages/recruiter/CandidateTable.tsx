import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { StatusBadge } from "../../components/StatusBadge";
import {
  LayoutDashboard, Users, TrendingUp, Bell, Search,
  Calendar, MoreVertical, Eye, Briefcase, UserCircle
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/recruiter/candidates", icon: Users },
  { label: "Post Job", href: "/recruiter/jobs/new", icon: Briefcase },
  { label: "Analytics", href: "/recruiter/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/recruiter/notifications", icon: Bell },
];

export function CandidateTable() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    fetch('/api/candidates')
      .then(res => res.json())
      .then(data => setCandidates(data))
      .catch(err => console.error("Failed to fetch candidates", err));
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === "all" || candidate.source.toLowerCase() === sourceFilter.toLowerCase();
    return matchesSearch && matchesSource;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Candidates</h1>
          <p className="text-muted-foreground">Review and manage candidate applications</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle>All Candidates ({filteredCandidates.length})</CardTitle>
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">All Sources</option>
                <option value="applied">Applied</option>
                <option value="referral">Referral</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Candidate</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Source</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Match %</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">AI Score</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Trust Score</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm">{candidate.role}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {candidate.appliedDate}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={candidate.source === "Referral" ? "success" : "gray"}>
                          {candidate.source}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-lg font-bold text-primary">{candidate.matchPercent}%</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div>
                          <span className="text-lg font-bold text-success">{candidate.aiScore}</span>
                          <span className="text-sm text-muted-foreground">/100</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-lg font-bold">{candidate.trustScore}</span>
                      </td>
                      <td className="py-4 px-4">
                        <StatusBadge status={candidate.status} />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/recruiter/candidates/${candidate.id}`}>
                            <Button size="sm" variant="primary">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>
                          <Button size="sm" variant="ghost">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
