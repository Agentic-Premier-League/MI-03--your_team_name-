import { useState } from "react";
import { Sidebar } from "../../components/ui/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import {
  LayoutDashboard, Users, Shield, Briefcase, Bot, BarChart3,
  Settings, Bell, FileText, Search, Plus, Edit, Trash2
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Permissions", href: "/admin/permissions", icon: Shield },
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "AI Models", href: "/admin/ai-models", icon: Bot },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Referral Settings", href: "/admin/referral-settings", icon: Settings },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
];

const users = [
  { id: 1, name: "John Admin", email: "john@company.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
  { id: 2, name: "Sarah Recruiter", email: "sarah@company.com", role: "Recruiter", status: "Active", lastLogin: "5 min ago" },
  { id: 3, name: "Mike HR", email: "mike@company.com", role: "Recruiter", status: "Active", lastLogin: "1 day ago" },
  { id: 4, name: "Emily Manager", email: "emily@company.com", role: "Admin", status: "Inactive", lastLogin: "1 week ago" },
  { id: 5, name: "David Tech", email: "david@company.com", role: "Recruiter", status: "Active", lastLogin: "3 hours ago" },
];

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} logo="AR" title="AI Recruit" />
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their roles</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Users</CardTitle>
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Login</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="py-4 px-4 font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-4">
                        <Badge variant={user.role === "Admin" ? "info" : "gray"}>{user.role}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={user.status === "Active" ? "success" : "gray"}>{user.status}</Badge>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{user.lastLogin}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
