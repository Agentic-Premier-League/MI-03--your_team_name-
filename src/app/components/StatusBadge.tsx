import { Badge } from "./ui/Badge";

type Status = "applied" | "screening" | "shortlisted" | "interview" | "review" | "rejected" | "offered" | "hired";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; variant: "success" | "warning" | "error" | "info" | "gray" }> = {
  applied: { label: "Applied", variant: "gray" },
  screening: { label: "Screening", variant: "info" },
  shortlisted: { label: "Shortlisted", variant: "success" },
  interview: { label: "Interview", variant: "info" },
  review: { label: "Review", variant: "warning" },
  rejected: { label: "Rejected", variant: "error" },
  offered: { label: "Offered", variant: "success" },
  hired: { label: "Hired", variant: "success" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
