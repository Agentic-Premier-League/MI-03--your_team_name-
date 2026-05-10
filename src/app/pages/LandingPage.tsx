import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Bot, Users, Briefcase } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center space-y-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold">AI Recruit</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Autonomous AI-powered recruitment platform with multi-agent consensus system
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link to="/admin/login" className="block">
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors cursor-pointer">
              <Briefcase className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Admin Portal</h3>
              <p className="text-muted-foreground text-sm">
                Manage users, AI models, and system settings
              </p>
              <Button variant="primary" className="mt-4 w-full">
                Admin Login
              </Button>
            </div>
          </Link>
          <Link to="/recruiter/login" className="block">
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors cursor-pointer">
              <Users className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Recruiter Portal</h3>
              <p className="text-muted-foreground text-sm">
                Review candidates and AI consensus reports
              </p>
              <Button variant="primary" className="mt-4 w-full">
                Recruiter Login
              </Button>
            </div>
          </Link>
          <Link to="/candidate/login" className="block">
            <div className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-colors cursor-pointer">
              <Bot className="w-12 h-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Candidate Portal</h3>
              <p className="text-muted-foreground text-sm">
                Apply, interview, and track your progress
              </p>
              <Button variant="primary" className="mt-4 w-full">
                Candidate Login
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
