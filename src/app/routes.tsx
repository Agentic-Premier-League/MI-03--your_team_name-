import { createBrowserRouter } from "react-router";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UserManagement } from "./pages/admin/UserManagement";
import { RolePermissionMatrix } from "./pages/admin/RolePermissionMatrix";
import { JobManagement } from "./pages/admin/JobManagement";
import { AIModelManagement } from "./pages/admin/AIModelManagement";
import { SystemAnalytics } from "./pages/admin/SystemAnalytics";
import { ReferralSettings } from "./pages/admin/ReferralSettings";
import { Notifications } from "./pages/admin/Notifications";
import { AuditLogs } from "./pages/admin/AuditLogs";
import { CandidateLogin } from "./pages/candidate/CandidateLogin";
import { CandidateDashboard } from "./pages/candidate/CandidateDashboard";
import { ProfileSetup } from "./pages/candidate/ProfileSetup";
import { AppliedJobs } from "./pages/candidate/AppliedJobs";
import { ReferralStatus } from "./pages/candidate/ReferralStatus";
import { AIMockInterview } from "./pages/candidate/AIMockInterview";
import { CodingTests } from "./pages/candidate/CodingTests";
import { PerformanceAnalytics } from "./pages/candidate/PerformanceAnalytics";
import { CareerSuggestions } from "./pages/candidate/CareerSuggestions";
import { RecruiterDashboard } from "./pages/recruiter/RecruiterDashboard";
import { CandidateTable } from "./pages/recruiter/CandidateTable";
import { CandidateDetail } from "./pages/recruiter/CandidateDetail";
import { AIConsensusReport } from "./pages/recruiter/AIConsensusReport";
import { JobPosting } from "./pages/recruiter/JobPosting";
import { RecruiterAnalytics } from "./pages/recruiter/RecruiterAnalytics";
import { RecruiterNotifications } from "./pages/recruiter/RecruiterNotifications";
import { RecruiterProfile } from "./pages/recruiter/RecruiterProfile";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/admin",
    children: [
      { path: "login", Component: AdminLogin },
      { path: "dashboard", Component: AdminDashboard },
      { path: "users", Component: UserManagement },
      { path: "permissions", Component: RolePermissionMatrix },
      { path: "jobs", Component: JobManagement },
      { path: "ai-models", Component: AIModelManagement },
      { path: "analytics", Component: SystemAnalytics },
      { path: "referral-settings", Component: ReferralSettings },
      { path: "notifications", Component: Notifications },
      { path: "audit-logs", Component: AuditLogs },
    ],
  },
  {
    path: "/candidate",
    children: [
      { path: "login", Component: CandidateLogin },
      { path: "dashboard", Component: CandidateDashboard },
      { path: "profile", Component: ProfileSetup },
      { path: "applied-jobs", Component: AppliedJobs },
      { path: "referral-status", Component: ReferralStatus },
      { path: "mock-interview", Component: AIMockInterview },
      { path: "coding-tests", Component: CodingTests },
      { path: "analytics", Component: PerformanceAnalytics },
      { path: "career-suggestions", Component: CareerSuggestions },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
    path: "/recruiter",
    children: [
      { path: "login", Component: CandidateLogin },
      { path: "dashboard", Component: RecruiterDashboard },
      { path: "jobs/new", Component: JobPosting },
      { path: "candidates", Component: CandidateTable },
      { path: "candidates/:id", Component: CandidateDetail },
      { path: "candidates/:id/consensus", Component: AIConsensusReport },
      { path: "analytics", Component: RecruiterAnalytics },
      { path: "notifications", Component: RecruiterNotifications },
      { path: "profile", Component: RecruiterProfile },
    ],
  },
]);
