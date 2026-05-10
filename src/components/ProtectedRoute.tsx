import { Navigate, useLocation } from "react-router";
import { getPortalSession, isPortalRole, type PortalRole } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: PortalRole;
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const location = useLocation();
  const session = getPortalSession();

  if (!session || !isPortalRole(session.role)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (session.role !== allowedRole) {
    return <Navigate to={session.role === "recruiter" ? "/recruiter/dashboard" : "/candidate/dashboard"} replace />;
  }

  return <>{children}</>;
}
