import { useState } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AIScoreRing } from "../../components/AIScoreRing";
import {
  LayoutDashboard, FileText, Briefcase, Users, Video, Code,
  TrendingUp, Bell, Upload, Github, Linkedin, Globe
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/candidate/profile", icon: FileText },
  { label: "Applied Jobs", href: "/candidate/applied-jobs", icon: Briefcase },
  { label: "Referral Status", href: "/candidate/referral-status", icon: Users },
  { label: "Mock Interview", href: "/candidate/mock-interview", icon: Video },
  { label: "Coding Tests", href: "/candidate/coding-tests", icon: Code },
  { label: "Analytics", href: "/candidate/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/candidate/notifications", icon: Bell },
];

export function ProfileSetup() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile & Resume</h1>
          <p className="text-muted-foreground">Complete your profile to get better job matches</p>
        </div>

        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    s <= step ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Email</label>
                    <Input type="email" placeholder="john.doe@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Location</label>
                    <Input placeholder="San Francisco, CA" />
                  </div>
                  <Button variant="primary" onClick={() => setStep(2)}>
                    Next: Upload Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Resume & Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-2">Resume</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="font-medium mb-1">Drop your resume here or click to browse</p>
                      <p className="text-sm text-muted-foreground">PDF, DOC, DOCX up to 5MB</p>
                      <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">LinkedIn Profile</label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="linkedin.com/in/johndoe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">GitHub Profile</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="github.com/johndoe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Portfolio Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input className="pl-10" placeholder="johndoe.com" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button variant="primary" onClick={() => setStep(3)}>
                      Next: Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-8">
                  <AIScoreRing score={88} size="lg" />
                  <p className="text-center text-muted-foreground mt-4 max-w-md">
                    Your profile has been analyzed by our AI. Here's your ATS match score and recommendations.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-medium text-success mb-2">Strong Points</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• 5+ years of React experience clearly highlighted</li>
                      <li>• Strong technical skills aligned with market demand</li>
                      <li>• Well-structured work history</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                    <h4 className="font-medium text-warning mb-2">Suggestions</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Add more quantifiable achievements</li>
                      <li>• Include cloud platform certifications</li>
                      <li>• Highlight leadership experience</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button variant="primary">
                    Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
