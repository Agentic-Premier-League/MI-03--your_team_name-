import { useState } from "react";
import { Sidebar } from "../../components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { AIAgentCard } from "../../components/AIAgentCard";
import {
  LayoutDashboard, Users, Shield, Briefcase, Bot, BarChart3,
  Settings, Bell, FileText, FileSearch, ShieldAlert, MessageSquare,
  Video, Code, BrainCircuit, UserCheck
} from "lucide-react";

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

const aiAgents = [
  {
    id: 1,
    name: "Resume Analyst AI",
    icon: FileSearch,
    description: "Analyzes resumes for skills, experience, and job match",
    status: "complete" as const,
    confidence: 92,
    color: "#3B82F6",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "Fraud Detection AI",
    icon: ShieldAlert,
    description: "Detects fake credentials and suspicious applications",
    status: "complete" as const,
    confidence: 88,
    color: "#EF4444",
    lastUpdated: "5 hours ago",
  },
  {
    id: 3,
    name: "Question Generator AI",
    icon: MessageSquare,
    description: "Generates personalized interview questions",
    status: "complete" as const,
    confidence: 90,
    color: "#10B981",
    lastUpdated: "1 day ago",
  },
  {
    id: 4,
    name: "Interview Agent AI",
    icon: Video,
    description: "Conducts AI-powered mock interviews",
    status: "complete" as const,
    confidence: 85,
    color: "#F59E0B",
    lastUpdated: "3 hours ago",
  },
  {
    id: 5,
    name: "Coding Evaluator AI",
    icon: Code,
    description: "Evaluates coding tests and technical assessments",
    status: "complete" as const,
    confidence: 94,
    color: "#8B5CF6",
    lastUpdated: "6 hours ago",
  },
  {
    id: 6,
    name: "HR Psychologist AI",
    icon: BrainCircuit,
    description: "Assesses personality and cultural fit",
    status: "complete" as const,
    confidence: 87,
    color: "#EC4899",
    lastUpdated: "4 hours ago",
  },
  {
    id: 7,
    name: "Hiring Manager AI",
    icon: UserCheck,
    description: "Makes final hiring recommendations",
    status: "complete" as const,
    confidence: 91,
    color: "#06B6D4",
    lastUpdated: "1 hour ago",
  },
];

export function AIModelManagement() {
  const [agents, setAgents] = useState(aiAgents);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Model Management</h1>
          <p className="text-muted-foreground">Configure and monitor AI agents in the recruitment pipeline</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id}>
              <CardContent className="pt-6">
                <AIAgentCard
                  name={agent.name}
                  icon={agent.icon}
                  description={agent.description}
                  status={agent.status}
                  confidence={agent.confidence}
                  color={agent.color}
                />
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Confidence Threshold</span>
                    <span className="text-sm font-medium">{agent.confidence}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={agent.confidence}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="mt-3 text-xs text-muted-foreground">
                    Last updated: {agent.lastUpdated}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
