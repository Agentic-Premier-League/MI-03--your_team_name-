import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { Bot, BriefcaseBusiness, Users, ArrowRight } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-5xl w-full grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
            <Bot className="w-4 h-4 text-primary" />
            AI recruitment platform for candidates and recruiters
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BriefcaseBusiness className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight">CareerOS</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            One shared platform for recruiters and candidates. Sign in once and we’ll route you to the right workspace automatically.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-border bg-card px-4 py-2">Unified login</span>
            <span className="rounded-full border border-border bg-card px-4 py-2">Role-based routing</span>
            <span className="rounded-full border border-border bg-card px-4 py-2">Same platform, different dashboards</span>
          </div>
          <Link to="/login" className="inline-flex">
            <Button variant="primary" className="mt-2">
              Open shared login
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recruiters</p>
                <h3 className="text-2xl font-semibold">Review talent faster</h3>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Candidates</p>
                <h3 className="text-2xl font-semibold">Track progress in one place</h3>
              </div>
              <Bot className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
