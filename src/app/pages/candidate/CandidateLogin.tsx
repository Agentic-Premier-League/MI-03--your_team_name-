import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Bot, Github, Linkedin, Eye, EyeOff, CheckCircle, Sparkles } from "lucide-react";
import { login } from "../../lib/candidateStore";

/** Sets the ProtectedRoute-compatible session in sessionStorage */
function setPortalSession(email: string, name: string, role: "candidate" | "recruiter" = "candidate") {
  const session = {
    id: role === "candidate" ? "candidate-001" : "recruiter-001",
    role,
    name,
    email,
  };
  window.sessionStorage.setItem("careeros.portal.session", JSON.stringify(session));
}

type Mode = "login" | "signup";

export function CandidateLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRecruiter = location.pathname.startsWith("/recruiter");

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate async auth (instant for MVP)
    await new Promise((r) => setTimeout(r, 600));

    if (isRecruiter) {
      setPortalSession(email, name || email.split("@")[0], "recruiter");
      navigate("/recruiter/dashboard");
    } else {
      // Store both candidate sessions (our store + ProtectedRoute)
      login(email, mode === "signup" ? name : undefined);
      setPortalSession(email, name || email.split("@")[0], "candidate");
      navigate("/candidate/dashboard");
    }
    setLoading(false);
  };

  const handleQuickDemo = () => {
    login("demo@hiregenie.ai", "Demo Candidate");
    setPortalSession("demo@hiregenie.ai", "Demo Candidate", "candidate");
    navigate("/candidate/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {isRecruiter ? "Recruiter Portal" : "HireGenie AI"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isRecruiter
                ? "Sign in to access candidate insights"
                : "Your AI-powered career companion"}
            </p>
          </div>
        </div>

        <Card className="border border-border/60 shadow-xl bg-card/80 backdrop-blur">
          <CardHeader className="pb-4">
            {!isRecruiter && (
              <div className="flex rounded-lg bg-muted p-1 gap-1">
                {(["login", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setError(""); }}
                    className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                      mode === m
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "login" ? "Sign In" : "Sign Up"}
                  </button>
                ))}
              </div>
            )}
            {isRecruiter && <CardTitle>Recruiter Login</CardTitle>}
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && !isRecruiter && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <Input
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <Input
                  type="email"
                  placeholder={isRecruiter ? "recruiter@company.com" : "you@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {mode === "signup" ? "Creating account..." : "Signing in..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {mode === "signup" ? "Create Account" : "Sign In"}
                  </span>
                )}
              </Button>

              {!isRecruiter && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-card text-muted-foreground">Or</span>
                    </div>
                  </div>

                  {/* Quick demo access */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleQuickDemo}
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-primary" />
                    Try Demo (No signup required)
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button type="button" variant="outline" size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
