import { useState, useRef, useEffect } from "react";
import { Sidebar } from "../../components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  LayoutDashboard, FileText, Briefcase, TrendingUp, Video,
  Code, MessageCircle, Send, Bot, User, Sparkles, Loader2,
  BookOpen, Target, Briefcase as BriefcaseIcon, DollarSign
} from "lucide-react";
import { getChatResponse } from "../../lib/aiEngine";

const sidebarItems = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
  { label: "Profile & Resume", href: "/candidate/profile", icon: FileText },
  { label: "Job Board", href: "/candidate/jobs", icon: Sparkles },
  { label: "My Applications", href: "/candidate/applied-jobs", icon: Briefcase },
  { label: "Skill Gap Analysis", href: "/candidate/analytics", icon: TrendingUp },
  { label: "AI Career Chat", href: "/candidate/career-suggestions", icon: MessageCircle },
  { label: "Mock Interview", href: "/candidate/mock-interview", icon: Video },
  { label: "Coding Tests", href: "/candidate/coding-tests", icon: Code },
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const QUICK_PROMPTS = [
  { icon: FileText, label: "Resume tips", prompt: "How can I improve my resume to stand out?" },
  { icon: Target, label: "Interview prep", prompt: "How should I prepare for technical interviews?" },
  { icon: BookOpen, label: "Skills to learn", prompt: "What high-demand skills should I focus on learning?" },
  { icon: BriefcaseIcon, label: "Career growth", prompt: "How can I grow my career as a software developer?" },
  { icon: DollarSign, label: "Salary negotiation", prompt: "How do I negotiate a higher salary?" },
];

const INITIAL_MESSAGE: Message = {
  id: "init",
  role: "assistant",
  content: "👋 Hi! I'm your AI Career Assistant powered by HireGenie AI.\n\nI can help you with:\n• **Resume writing** tips and ATS optimization\n• **Interview preparation** strategies\n• **Career path** guidance and growth advice\n• **Skill gap** analysis and learning resources\n• **Salary negotiation** tactics\n\nWhat would you like to explore today?",
  timestamp: new Date(),
};

function formatMessage(content: string) {
  // Simple markdown-like formatting
  const lines = content.split("\n");
  return lines.map((line, i) => {
    // Bold text
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export function CareerSuggestions() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const response = getChatResponse(text);
    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="HG" title="HireGenie AI" />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-5 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              AI Career Assistant
              <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full border border-success/20 font-normal">
                Online
              </span>
            </h1>
            <p className="text-xs text-muted-foreground">Powered by HireGenie AI — always here to help</p>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-auto px-8 py-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "assistant"
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-muted/60 border border-border rounded-tl-sm"
                }`}
              >
                {formatMessage(msg.content)}
                <p className={`text-xs mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted/60 border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 0.2, 0.4].map((delay) => (
                    <div
                      key={delay}
                      className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 2 && (
          <div className="px-8 pb-4">
            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((qp) => {
                const Icon = qp.icon;
                return (
                  <button
                    key={qp.label}
                    onClick={() => sendMessage(qp.prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/30 hover:bg-muted/60 hover:border-primary/40 text-sm transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
                    {qp.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="px-8 py-4 border-t border-border">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              placeholder="Ask me anything about your career..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={!input.trim() || loading} size="sm" className="px-4">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are for guidance only. Always verify with industry sources.
          </p>
        </div>
      </div>
    </div>
  );
}
