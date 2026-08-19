import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Priority = "HIGH" | "MEDIUM" | "LOW";

const GRIEVANCES = [
  { id: "GRV-2025-001", title: "Water shortage in Ward 3", priority: "HIGH",   time: "2 hrs ago" },
  { id: "GRV-2025-002", title: "Street light not working",  priority: "MEDIUM", time: "5 hrs ago" },
  { id: "GRV-2025-003", title: "Garbage not collected",     priority: "LOW",    time: "1 day ago" },
];

const PRIORITY_STYLE: Record<Priority, string> = {
  HIGH:   "bg-brand-red-light text-brand-red",
  MEDIUM: "bg-brand-amber-light text-brand-amber",
  LOW:    "bg-surface-muted text-text-muted",
};

export default function GrievanceQueue() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="section-title">Grievance Priority Queue</p>
        <Link href="/grievance" className="section-link flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {GRIEVANCES.map(g => (
          <Link key={g.id} href={`/grievance?id=${g.id}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-muted transition-colors group">
            <span className={cn("badge flex-shrink-0 font-bold text-2xs tracking-wide", PRIORITY_STYLE[g.priority as Priority])}>
              {g.priority}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary group-hover:text-brand-green transition-colors truncate">{g.title}</p>
              <p className="text-xs text-text-light mt-0.5">#{g.id}</p>
            </div>
            <span className="text-xs text-text-light flex-shrink-0">{g.time}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
