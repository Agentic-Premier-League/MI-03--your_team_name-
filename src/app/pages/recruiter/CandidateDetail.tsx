import { Link, useParams } from "react-router";
import { Sidebar } from "../../components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { AgentConsensusRow } from "../../components/AgentConsensusRow";
import { AIScoreRing } from "../../components/AIScoreRing";
import {
  LayoutDashboard, Users, TrendingUp, Bell, FileText, Download,
  Mail, Phone, MapPin, Linkedin, Github, Globe, CheckCircle,
  XCircle, Clock, FileSearch, ShieldAlert, MessageSquare,
  Video, Code, BrainCircuit, UserCheck, Briefcase, UserCircle
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/recruiter/candidates", icon: Users },
  { label: "Post Job", href: "/recruiter/jobs/new", icon: Briefcase },
  { label: "Analytics", href: "/recruiter/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/recruiter/notifications", icon: Bell },
  { label: "Profile", href: "/recruiter/profile", icon: UserCircle },
];

const aiAgents = [
  {
    agentName: "Resume Analyst AI",
    icon: FileSearch,
    finding: "Strong technical background with 5+ years React experience. Well-matched skills for senior role. Clear career progression evident.",
    confidence: 92,
    status: "positive" as const,
    color: "#3B82F6",
  },
  {
    agentName: "Fraud Detection AI",
    icon: ShieldAlert,
    finding: "All credentials verified. No suspicious patterns detected. LinkedIn and GitHub profiles authentic and active.",
    confidence: 95,
    status: "positive" as const,
    color: "#10B981",
  },
  {
    agentName: "Question Generator AI",
    icon: MessageSquare,
    finding: "Generated 12 personalized technical and behavioral questions based on candidate's experience with state management and testing.",
    confidence: 88,
    status: "positive" as const,
    color: "#F59E0B",
  },
  {
    agentName: "Interview Agent AI",
    icon: Video,
    finding: "Mock interview completed with 85% confidence score. Strong communication skills. Recommended for technical round.",
    confidence: 85,
    status: "positive" as const,
    color: "#8B5CF6",
  },
  {
    agentName: "Coding Evaluator AI",
    icon: Code,
    finding: "Coding assessment: 90/100. Clean code, efficient algorithms, good testing practices. Above average performance.",
    confidence: 90,
    status: "positive" as const,
    color: "#EC4899",
  },
  {
    agentName: "HR Psychologist AI",
    icon: BrainCircuit,
    finding: "Personality assessment indicates strong team collaboration, adaptability, and growth mindset. Culture fit: 88%.",
    confidence: 88,
    status: "positive" as const,
    color: "#06B6D4",
  },
  {
    agentName: "Hiring Manager AI",
    icon: UserCheck,
    finding: "RECOMMENDATION: SHORTLIST. All agents show positive consensus. Candidate demonstrates required skills and cultural alignment.",
    confidence: 91,
    status: "positive" as const,
    color: "#10B981",
  },
];

export function CandidateDetail() {
  const { id } = useParams();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <Link to="/recruiter/candidates" className="text-primary hover:underline mb-2 inline-block">
            ← Back to Candidates
          </Link>
          <h1 className="text-3xl font-bold mb-2">Sarah Johnson</h1>
          <p className="text-muted-foreground">Senior Frontend Developer • Applied May 8, 2024</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Match Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <AIScoreRing score={92} size="lg" showLabel={false} />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Excellent match based on multi-agent analysis
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>sarah.j@email.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">linkedin.com/in/sarahj</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Github className="w-4 h-4 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">github.com/sarahj</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">sarahjohnson.dev</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                View Resume
              </Button>
              <Button variant="ghost" className="w-full mt-2">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Source:</span>
                <Badge variant="success">Referral</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Trust Score:</span>
                <span className="font-medium">88/100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Referrer:</span>
                <span className="font-medium">John Doe</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="primary" className="w-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Shortlist
              </Button>
              <Button variant="secondary" className="w-full">
                <Clock className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
              <Button variant="destructive" className="w-full">
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>AI Agent Consensus Report</CardTitle>
              <Link to={`/recruiter/candidates/${id}/consensus`}>
                <Button variant="secondary" size="sm">
                  View Full Report
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiAgents.map((agent, index) => (
                <AgentConsensusRow key={index} {...agent} />
              ))}
            </div>
            <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-success" />
                <h4 className="font-semibold text-success">Final Recommendation</h4>
              </div>
              <p className="text-sm">
                Based on unanimous positive consensus from all 7 AI agents, this candidate is highly recommended for the next interview round. Overall confidence: 91%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills & Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Jest", "Cypress"].map((skill) => (
                    <Badge key={skill} variant="info">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Experience Highlights</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 5+ years of React and TypeScript development</li>
                  <li>• Led team of 4 developers on enterprise SaaS platform</li>
                  <li>• Architected and implemented micro-frontend architecture</li>
                  <li>• Reduced page load time by 40% through performance optimization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
