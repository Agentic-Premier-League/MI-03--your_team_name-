import { useState } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import {
  LayoutDashboard, FileText, Briefcase, Users, Video, Code,
  TrendingUp, Bell, Play, Check, X
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

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    completed: true,
    score: 95
  },
  {
    id: 2,
    title: "Binary Tree Traversal",
    difficulty: "Medium",
    category: "Trees",
    completed: true,
    score: 88
  },
  {
    id: 3,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked Lists",
    completed: false,
    score: null
  },
];

export function CodingTests() {
  const [selectedProblem] = useState(problems[0]);
  const [code, setCode] = useState(`function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}`);

  const testCases = [
    { input: "[2,7,11,15], 9", expected: "[0,1]", passed: true },
    { input: "[3,2,4], 6", expected: "[1,2]", passed: true },
    { input: "[3,3], 6", expected: "[0,1]", passed: false },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Coding Tests</h1>
          <p className="text-muted-foreground">Practice coding problems and get AI feedback</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Problems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{problem.title}</h4>
                      {problem.completed && (
                        <Check className="w-4 h-4 text-success flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          problem.difficulty === "Easy"
                            ? "success"
                            : problem.difficulty === "Medium"
                            ? "warning"
                            : "error"
                        }
                      >
                        {problem.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{problem.category}</span>
                    </div>
                    {problem.score && (
                      <div className="mt-2 text-xs">
                        <span className="text-muted-foreground">Score: </span>
                        <span className="font-medium text-success">{problem.score}/100</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedProblem.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant={
                          selectedProblem.difficulty === "Easy"
                            ? "success"
                            : selectedProblem.difficulty === "Medium"
                            ? "warning"
                            : "error"
                        }
                      >
                        {selectedProblem.difficulty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{selectedProblem.category}</span>
                    </div>
                  </div>
                  <Button variant="primary">
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Problem Statement</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Given an array of integers <code className="px-1.5 py-0.5 bg-muted rounded">nums</code> and an
                    integer <code className="px-1.5 py-0.5 bg-muted rounded">target</code>, return indices of the two
                    numbers such that they add up to target.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Your Solution</h4>
                  <div className="bg-[#0D1B2A] rounded-lg overflow-hidden border border-border">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full p-4 bg-transparent text-foreground font-mono text-sm focus:outline-none resize-none"
                      rows={12}
                      spellCheck={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {testCases.map((testCase, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        testCase.passed
                          ? "bg-success/10 border-success/20"
                          : "bg-destructive/10 border-destructive/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Test Case {index + 1}</span>
                        {testCase.passed ? (
                          <Check className="w-5 h-5 text-success" />
                        ) : (
                          <X className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div className="text-sm space-y-1">
                        <div>
                          <span className="text-muted-foreground">Input: </span>
                          <code className="text-foreground">{testCase.input}</code>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expected: </span>
                          <code className="text-foreground">{testCase.expected}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
