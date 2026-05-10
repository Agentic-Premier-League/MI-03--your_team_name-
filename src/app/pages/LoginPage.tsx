import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { findPortalUser, signInPortal } from "@/lib/auth";
import { Bot, BriefcaseBusiness, Users, ArrowRight, Sparkles } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const session = signInPortal(identifier);

    window.setTimeout(() => {
      setIsLoading(false);

      if (!session) {
        setError("We could not find that recruiter or candidate ID. Try recruiter-001 or candidate-001.");
        return;
      }

      const nextPath = session.role === "recruiter" ? "/recruiter/dashboard" : "/candidate/dashboard";
      const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(fromPath && fromPath !== "/login" ? fromPath : nextPath, { replace: true });
    }, 450);
  };

  const previewUser = findPortalUser(identifier);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              One platform for recruiters and candidates
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Sign in once. Get the right dashboard instantly.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Enter your recruiter ID, candidate ID, or email and HireGenie will open the correct workspace automatically.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <BriefcaseBusiness className="mb-3 h-6 w-6 text-primary" />
                <p className="font-medium">Recruiter flow</p>
                <p className="text-sm text-muted-foreground">Review candidates, score talent, and move faster.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <Users className="mb-3 h-6 w-6 text-primary" />
                <p className="font-medium">Candidate flow</p>
                <p className="text-sm text-muted-foreground">Track applications, referrals, and AI feedback.</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <Bot className="mb-3 h-6 w-6 text-primary" />
                <p className="font-medium">Shared platform</p>
                <p className="text-sm text-muted-foreground">Same system, different experiences by role.</p>
              </div>
            </div>
          </div>

          <Card className="border-border/70 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Login to HireGenie</CardTitle>
              <p className="text-sm text-muted-foreground">
                Use your portal ID or email. Example IDs: <span className="font-medium">recruiter-001</span> or <span className="font-medium">candidate-001</span>.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Recruiter ID, Candidate ID, or Email</label>
                  <Input
                    placeholder="recruiter-001 or candidate-001"
                    value={identifier}
                    onChange={(event) => setIdentifier(event.target.value)}
                    autoComplete="username"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {previewUser && (
                  <div className="rounded-lg border border-success/20 bg-success/10 px-4 py-3 text-sm text-foreground">
                    <p className="font-medium text-success">Matched as {previewUser.role}</p>
                    <p className="text-muted-foreground">Will open {previewUser.role === "recruiter" ? "Recruiter Dashboard" : "Candidate Dashboard"}.</p>
                  </div>
                )}

                <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Continue"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
