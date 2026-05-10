import { useState } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LayoutDashboard, Users, TrendingUp, Bell, Briefcase, Plus, CheckCircle2 } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/recruiter/candidates", icon: Users },
  { label: "Post Job", href: "/recruiter/jobs/new", icon: Briefcase },
  { label: "Analytics", href: "/recruiter/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/recruiter/notifications", icon: Bell },
];

export function JobPosting() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">Create a new job listing to attract top talent and let AI handle the screening.</p>
        </div>

        {isSubmitted ? (
          <Card className="max-w-2xl mx-auto mt-12 text-center p-8">
            <CardContent className="flex flex-col items-center pt-6">
              <CheckCircle2 className="w-16 h-16 text-success mb-4" />
              <h2 className="text-2xl font-bold mb-2">Job Posted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your job listing for <strong>{formData.title}</strong> is now live. AI agents have started analyzing the market and will automatically screen incoming applications.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>Post Another Job</Button>
                <Button onClick={() => window.location.href = '/recruiter/dashboard'}>Go to Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Enter the primary details for the position.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title</label>
                    <Input 
                      name="title" 
                      placeholder="e.g. Senior Frontend Developer" 
                      value={formData.title} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Input 
                      name="department" 
                      placeholder="e.g. Engineering" 
                      value={formData.department} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input 
                      name="location" 
                      placeholder="e.g. Remote, San Francisco" 
                      value={formData.location} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Employment Type</label>
                    <select 
                      name="type" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Description</label>
                  <textarea 
                    name="description" 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe the role and responsibilities..." 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Requirements & Skills</label>
                  <textarea 
                    name="requirements" 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="List the required skills, experience, and qualifications..." 
                    value={formData.requirements} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-border">
                  <Button variant="outline" type="button" onClick={() => window.history.back()}>Cancel</Button>
                  <Button type="submit" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Publish Job
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
}
