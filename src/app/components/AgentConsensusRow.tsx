import { LucideIcon, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface AgentConsensusRowProps {
  agentName: string;
  icon: LucideIcon;
  finding: string;
  confidence: number;
  status: "positive" | "neutral" | "negative";
  color?: string;
}

export function AgentConsensusRow({
  agentName,
  icon: Icon,
  finding,
  confidence,
  status,
  color = "#3B82F6",
}: AgentConsensusRowProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">{agentName}</h4>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{confidence}%</span>
            {status === "positive" && <CheckCircle className="w-4 h-4 text-success" />}
            {status === "negative" && <AlertCircle className="w-4 h-4 text-destructive" />}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{finding}</p>
        <div className="h-1.5 bg-background rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all", {
              "bg-success": confidence >= 80,
              "bg-warning": confidence >= 60 && confidence < 80,
              "bg-destructive": confidence < 60,
            })}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
}
