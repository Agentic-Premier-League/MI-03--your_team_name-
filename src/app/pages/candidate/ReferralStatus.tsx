import { Sidebar } from "../../components/ui/sidebar";
import { Card } from "../../components/ui/Card";
import { LayoutDashboard, FileText, Briefcase, Users, Video, Code, TrendingUp, Bell } from "lucide-react";

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

export function ReferralStatus() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Referral Status</h1>
        <p className="text-muted-foreground mb-8">Track your employee referrals and trust score</p>
        <Card className="p-6">Referral status coming soon...</Card>
      </div>
    </div>
  );
}
