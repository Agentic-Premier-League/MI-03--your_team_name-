export type PortalRole = "candidate" | "recruiter";

export interface PortalUser {
  id: string;
  role: PortalRole;
  name: string;
  email: string;
  aliases?: string[];
}

export interface PortalSession {
  id: string;
  role: PortalRole;
  name: string;
  email: string;
}

const SESSION_KEY = "careeros.portal.session";

const PORTAL_USERS: PortalUser[] = [
  {
    id: "recruiter-001",
    role: "recruiter",
    name: "Sarah Recruiter",
    email: "sarah@company.com",
    aliases: ["recruiter", "recruiter@company.com", "recruiter001", "r-001"],
  },
  {
    id: "candidate-001",
    role: "candidate",
    name: "Sarah Johnson",
    email: "sarah.johnson@career.com",
    aliases: ["candidate", "candidate@email.com", "candidate001", "c-001"],
  },
];

const normalize = (value: string) => value.trim().toLowerCase();

export function findPortalUser(identifier: string): PortalUser | null {
  const normalized = normalize(identifier);
  if (!normalized) {
    return null;
  }

  return (
    PORTAL_USERS.find((user) => {
      const aliases = [user.id, user.email, ...(user.aliases ?? [])].map(normalize);
      return aliases.includes(normalized);
    }) ?? null
  );
}

export function signInPortal(identifier: string): PortalSession | null {
  const user = findPortalUser(identifier);

  if (!user) {
    return null;
  }

  const session: PortalSession = {
    id: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  };

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export function getPortalSession(): PortalSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PortalSession;
  } catch {
    return null;
  }
}

export function isPortalRole(role: string): role is PortalRole {
  return role === "candidate" || role === "recruiter";
}

export function signOutPortal(): void {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(SESSION_KEY);
  }
}
