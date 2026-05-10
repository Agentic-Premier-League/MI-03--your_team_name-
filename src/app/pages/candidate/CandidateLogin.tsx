import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Bot, Github, Linkedin } from "lucide-react";

export function CandidateLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isRecruiter = location.pathname.startsWith("/recruiter");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRecruiter) {
      navigate("/recruiter/dashboard");
    } else {
      navigate("/candidate/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <CardTitle className="text-2xl">
              {isRecruiter ? "Recruiter Portal" : "Candidate Portal"}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Email</label>
              <Input
                type="email"
                placeholder={isRecruiter ? "recruiter@company.com" : "candidate@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Sign In
            </Button>
            {!isRecruiter && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="secondary">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Button>
                  <Button type="button" variant="secondary">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
