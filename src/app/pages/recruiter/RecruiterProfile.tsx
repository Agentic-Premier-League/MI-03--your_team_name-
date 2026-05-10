import { useState, useEffect } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LayoutDashboard, Users, TrendingUp, Bell, Briefcase, Save, UserCircle } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Candidates", href: "/recruiter/candidates", icon: Users },
  { label: "Post Job", href: "/recruiter/jobs/new", icon: Briefcase },
  { label: "Analytics", href: "/recruiter/analytics", icon: TrendingUp },
  { label: "Notifications", href: "/recruiter/notifications", icon: Bell },
  { label: "Profile", href: "/recruiter/profile", icon: UserCircle },
];

export function RecruiterProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/recruiter/profile')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFormData({
            name: data.name || "",
            email: data.email || "",
            company: data.company || ""
          });
        }
      })
      .catch(err => console.error("Failed to load profile", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    try {
      const res = await fetch('/api/recruiter/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage("Profile updated successfully!");
        // We dispatch a custom event so the Sidebar can update immediately
        window.dispatchEvent(new Event("profileUpdated"));
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recruiter Profile</h1>
          <p className="text-muted-foreground">Manage your personal details and company information</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details to personalize your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  required
                />
              </div>

              {message && (
                <div className={`p-3 rounded-md ${message.includes("success") ? "bg-success/10 text-success border border-success/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
                  {message}
                </div>
              )}

              <div className="pt-4 border-t border-border flex justify-end">
                <Button type="submit" disabled={isSaving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
