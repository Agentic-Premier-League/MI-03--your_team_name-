import { useState } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  LayoutDashboard, FileText, Briefcase, Users, Video, Code,
  TrendingUp, Bell, Mic, MicOff, Play, Square
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

export function AIMockInterview() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion] = useState(
    "Tell me about a challenging project you worked on and how you overcame the obstacles."
  );
  const [confidenceScore] = useState(78);
  const [elapsedTime, setElapsedTime] = useState(0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Mock Interview</h1>
          <p className="text-muted-foreground">Practice with AI-powered interview simulation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-muted rounded-t-xl flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-20 h-20 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium">Camera Preview</p>
                    <p className="text-sm text-muted-foreground">AI is analyzing your responses</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant={isRecording ? "destructive" : "primary"}
                      size="lg"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-5 h-5 mr-2" />
                          Stop Interview
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Start Interview
                        </>
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-2xl font-mono">
                      {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Question</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{currentQuestion}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Confidence Meter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-warning">{confidenceScore}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning transition-all"
                    style={{ width: `${confidenceScore}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  AI is analyzing your tone, pace, and body language in real-time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">AI Interviewer</p>
                    <p className="text-sm">{currentQuestion}</p>
                  </div>
                  {isRecording && (
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">You</p>
                      <p className="text-sm">Transcribing your response...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Maintain eye contact with the camera</li>
                  <li>• Speak clearly and at a steady pace</li>
                  <li>• Use the STAR method for answers</li>
                  <li>• Take a breath before responding</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
