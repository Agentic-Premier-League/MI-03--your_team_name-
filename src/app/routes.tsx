import { createBrowserRouter } from "react-router";
import { Notifications } from "./pages/admin/Notifications";
import { LoginPage } from "./pages/LoginPage";
import { CandidateDashboard } from "./pages/candidate/CandidateDashboard";
import { ProfileSetup } from "./pages/candidate/ProfileSetup";
import { AppliedJobs } from "./pages/candidate/AppliedJobs";
import { ReferralStatus } from "./pages/candidate/ReferralStatus";
import { AIMockInterview } from "./pages/candidate/AIMockInterview";
import { CodingTests } from "./pages/candidate/CodingTests";
import { PerformanceAnalytics } from "./pages/candidate/PerformanceAnalytics";
import { CareerSuggestions } from "./pages/candidate/CareerSuggestions";
import { JobBoard } from "./pages/candidate/JobBoard";
import { RecruiterDashboard } from "./pages/recruiter/RecruiterDashboard";
import { CandidateTable } from "./pages/recruiter/CandidateTable";
import { CandidateDetail } from "./pages/recruiter/CandidateDetail";
import { AIConsensusReport } from "./pages/recruiter/AIConsensusReport";
import { JobPosting } from "./pages/recruiter/JobPosting";
import { RecruiterAnalytics } from "./pages/recruiter/RecruiterAnalytics";
import { RecruiterNotifications } from "./pages/recruiter/RecruiterNotifications";
import { RecruiterProfile } from "./pages/recruiter/RecruiterProfile";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/candidate",
    children: [
      { path: "login", Component: LoginPage },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <ProfileSetup />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <JobBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "applied-jobs",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <AppliedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "referral-status",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <ReferralStatus />
          </ProtectedRoute>
        ),
      },
      {
        path: "mock-interview",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <AIMockInterview />
          </ProtectedRoute>
        ),
      },
      {
        path: "coding-tests",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <CodingTests />
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <PerformanceAnalytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "career-suggestions",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <CareerSuggestions />
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <ProtectedRoute allowedRole="candidate">
            <Notifications />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/recruiter",
    children: [
      { path: "login", Component: LoginPage },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "jobs/new",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <JobPosting />
          </ProtectedRoute>
        ),
      },
      {
        path: "candidates",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <CandidateTable />
          </ProtectedRoute>
        ),
      },
      {
        path: "candidates/:id",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <CandidateDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "candidates/:id/consensus",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <AIConsensusReport />
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <RecruiterAnalytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <RecruiterNotifications />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute allowedRole="recruiter">
            <RecruiterProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
