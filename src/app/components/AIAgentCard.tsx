import { motion } from "motion/react";
import { cn } from "../lib/utils";
import { LucideIcon, CheckCircle, AlertCircle, Loader2, Circle } from "lucide-react";

interface AIAgentCardProps {
  name: string;
  icon: LucideIcon;
  description?: string;
  confidence?: number;
  status: "idle" | "processing" | "complete" | "error";
  finding?: string;
  color?: string;
}

export function AIAgentCard({
  name,
  icon: Icon,
  description,
  confidence,
  status,
  finding,
  color = "#3B82F6",
}: AIAgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative bg-card border rounded-xl p-4 transition-all",
        {
          "border-border": status === "idle",
          "border-primary shadow-lg shadow-primary/20": status === "processing",
          "border-success": status === "complete",
          "border-destructive": status === "error",
        }
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium">{name}</h4>
            {status === "processing" && (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            )}
            {status === "complete" && (
              <CheckCircle className="w-4 h-4 text-success" />
            )}
            {status === "error" && (
              <AlertCircle className="w-4 h-4 text-destructive" />
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}
          {finding && (
            <p className="text-sm mt-2">{finding}</p>
          )}
          {confidence !== undefined && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-medium">{confidence}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 0.5 }}
                  className={cn("h-full", {
                    "bg-success": confidence >= 80,
                    "bg-warning": confidence >= 60 && confidence < 80,
                    "bg-destructive": confidence < 60,
                  })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
