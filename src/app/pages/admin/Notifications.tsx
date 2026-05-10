import { Sidebar } from "../../components/ui/Sidebar";
import { Card } from "../../components/ui/Card";
import { LayoutDashboard, Users, Shield, Briefcase, Bot, BarChart3, Settings, Bell, FileText } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Permissions", href: "/admin/permissions", icon: Shield },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "AI Models", href: "/admin/ai-models", icon: Bot },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Referral Settings", href: "/admin/referral-settings", icon: Settings },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
];

export function Notifications() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground mb-8">View and manage system notifications</p>
        <Card className="p-6">Notifications list coming soon...</Card>
      </div>
    </div>
  );
}
