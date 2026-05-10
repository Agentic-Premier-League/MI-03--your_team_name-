import { useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { AIAgentCard } from "../../components/AIAgentCard";
import { Button } from "../../components/ui/Button";
import {
  LayoutDashboard, Users, TrendingUp, Bell, Download, Play,
  FileSearch, ShieldAlert, MessageSquare, Video, Code,
  BrainCircuit, UserCheck, Briefcase, UserCircle
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
    id: 1,
    name: "Resume Analyst AI",
    icon: FileSearch,
    description: "Analyzing resume structure, skills, and experience match",
    finding: "Strong technical background with 5+ years React experience. Well-matched skills for senior role. Clear career progression evident. Education: BS Computer Science. Certifications: AWS Certified Developer.",
    confidence: 92,
    color: "#3B82F6",
  },
  {
    id: 2,
    name: "Fraud Detection AI",
    icon: ShieldAlert,
    description: "Verifying credentials and detecting suspicious patterns",
    finding: "All credentials verified. No suspicious patterns detected. LinkedIn profile shows 850+ connections with authentic engagement. GitHub shows consistent commit history over 3+ years. Employment dates cross-verified.",
    confidence: 95,
    color: "#10B981",
  },
  {
    id: 3,
    name: "Question Generator AI",
    icon: MessageSquare,
    description: "Creating personalized interview questions",
    finding: "Generated 12 technical questions focused on React performance optimization, state management patterns, and micro-frontend architecture. 8 behavioral questions targeting team leadership and conflict resolution based on candidate's experience.",
    confidence: 88,
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "Interview Agent AI",
    icon: Video,
    description: "Conducting and analyzing mock interview performance",
    finding: "Mock interview completed. Communication: Excellent (90/100). Technical depth: Strong (88/100). Problem-solving approach: Systematic and clear. Recommended follow-up areas: system design at scale.",
    confidence: 85,
    color: "#8B5CF6",
  },
  {
    id: 5,
    name: "Coding Evaluator AI",
    icon: Code,
    description: "Assessing technical coding skills and problem-solving",
    finding: "Completed 3 coding challenges. Algorithm efficiency: 92/100. Code quality: 88/100. Test coverage: 95/100. Time complexity optimization demonstrated. Clean code principles followed consistently.",
    confidence: 90,
    color: "#EC4899",
  },
  {
    id: 6,
    name: "HR Psychologist AI",
    icon: BrainCircuit,
    description: "Evaluating personality traits and cultural fit",
    finding: "Personality assessment: High collaboration (92%), Strong adaptability (88%), Growth mindset evident. Work style: Prefers structured autonomy. Team dynamics: Natural mentor. Culture fit score: 88%. Minor concern: may prefer remote work.",
    confidence: 88,
    color: "#06B6D4",
  },
  {
    id: 7,
    name: "Hiring Manager AI",
    icon: UserCheck,
    description: "Final hiring recommendation based on all agent inputs",
    finding: "FINAL RECOMMENDATION: PROCEED TO INTERVIEW. Consensus from 6/7 agents positive. Candidate exceeds technical requirements, demonstrates cultural alignment, and shows strong growth potential. Estimated performance in role: 90%. Retention probability: High (85%).",
    confidence: 91,
    color: "#3B82F6",
  },
];

export function AIConsensusReport() {
  const { id } = useParams();
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(0);

  const playAnimation = () => {
    setShowAnimation(true);
    setCurrentAgent(0);

    const interval = setInterval(() => {
      setCurrentAgent((prev) => {
        if (prev >= aiAgents.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowAnimation(false), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <Link to={`/recruiter/candidates/${id}`} className="text-primary hover:underline mb-2 inline-block">
            ← Back to Candidate
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Consensus Report</h1>
              <p className="text-muted-foreground">Sarah Johnson • Senior Frontend Developer</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={playAnimation}>
                <Play className="w-4 h-4 mr-2" />
                Replay Analysis
              </Button>
              <Button variant="primary">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-success/10 border-primary/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Overall Consensus Score</h3>
                <p className="text-sm text-muted-foreground">Based on multi-agent analysis</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-success mb-1">91%</div>
                <div className="text-sm text-muted-foreground">Confidence Level</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold mb-1">7/7</div>
                <div className="text-sm text-muted-foreground">Agents Analyzed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">AI Agent Analysis</h2>
          <p className="text-muted-foreground mb-6">
            Each AI agent independently evaluated the candidate. Below are their detailed findings.
          </p>
          <div className="space-y-4">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={showAnimation ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                animate={
                  showAnimation
                    ? index <= currentAgent
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0.3, x: -20 }
                    : { opacity: 1, x: 0 }
                }
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <AIAgentCard
                      name={agent.name}
                      icon={agent.icon}
                      description={agent.description}
                      status={showAnimation && index <= currentAgent ? "complete" : showAnimation ? "idle" : "complete"}
                      confidence={agent.confidence}
                      finding={agent.finding}
                      color={agent.color}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Discussion Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  <span className="font-medium">Hiring Manager AI</span>
                  <span className="text-xs text-muted-foreground">2 min ago</span>
                </div>
                <p className="text-sm">
                  Based on the consensus, I recommend proceeding with technical interview. All agents report positive signals.
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BrainCircuit className="w-5 h-5 text-[#06B6D4]" />
                  <span className="font-medium">HR Psychologist AI</span>
                  <span className="text-xs text-muted-foreground">5 min ago</span>
                </div>
                <p className="text-sm">
                  Personality assessment complete. High collaboration score and growth mindset detected. Culture fit is strong.
                </p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-[#EC4899]" />
                  <span className="font-medium">Coding Evaluator AI</span>
                  <span className="text-xs text-muted-foreground">8 min ago</span>
                </div>
                <p className="text-sm">
                  Technical assessment shows strong fundamentals. Code quality and problem-solving approach both above expectations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
