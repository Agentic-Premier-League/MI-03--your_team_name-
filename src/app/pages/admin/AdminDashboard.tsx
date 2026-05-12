import { Sidebar } from "../../components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import {
  LayoutDashboard, Users, Shield, Briefcase, Bot, BarChart3,
  Settings, Bell, FileText, TrendingUp, TrendingDown, UserPlus
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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

const kpiData = [
  { label: "Applied", value: 1250, change: "+12%", trend: "up" },
  { label: "Screening", value: 480, change: "+8%", trend: "up" },
  { label: "Interviews", value: 120, change: "-3%", trend: "down" },
  { label: "Offers", value: 25, change: "+15%", trend: "up" },
  { label: "Hired", value: 10, change: "+5%", trend: "up" },
];

const funnelData = [
  { stage: "Applied", count: 1250 },
  { stage: "Screening", count: 480 },
  { stage: "Interview", count: 120 },
  { stage: "Offer", count: 25 },
  { stage: "Hired", count: 10 },
];

const sourceData = [
  { name: "Direct Apply", value: 450, color: "#3B82F6" },
  { name: "Referral", value: 380, color: "#10B981" },
  { name: "LinkedIn", value: 280, color: "#F59E0B" },
  { name: "Indeed", value: 140, color: "#8B5CF6" },
];

const recentActivity = [
  { action: "New candidate applied", job: "Senior Backend Engineer", time: "2 min ago" },
  { action: "Interview scheduled", candidate: "Sarah Johnson", time: "15 min ago" },
  { action: "Offer accepted", candidate: "Michael Chen", time: "1 hour ago" },
  { action: "AI model updated", model: "Resume Analyst", time: "3 hours ago" },
  { action: "New job posted", job: "Frontend Developer", time: "5 hours ago" },
];

export function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Monitor recruitment pipeline and system metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-success" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <div
                  className={`text-xs ${
                    kpi.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {kpi.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="stage" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2A3A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Source Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1A2A3A",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.job || activity.candidate || activity.model}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
