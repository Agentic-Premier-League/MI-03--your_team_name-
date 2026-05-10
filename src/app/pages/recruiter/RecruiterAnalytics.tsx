import { Sidebar } from "../../components/ui/Sidebar";
import { Card } from "../../components/ui/Card";
import { LayoutDashboard, Users, TrendingUp, Bell, Briefcase } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/recruiter/candidates", icon: Users },
  { label: "Post Job", href: "/recruiter/jobs/new", icon: Briefcase },
  { label: "Analytics", href: "/recruiter/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/recruiter/notifications", icon: Bell },
];

export function RecruiterAnalytics() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Recruitment Analytics</h1>
        <p className="text-muted-foreground mb-8">Detailed insights on your hiring pipeline</p>
        <Card className="p-6">Analytics dashboard coming soon...</Card>
      </div>
    </div>
  );
}
