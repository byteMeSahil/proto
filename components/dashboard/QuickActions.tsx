import { UserPlus, FolderPlus, AlertTriangle, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { label: "Add Citizen",    icon: UserPlus,      href: "/citizens/new",   bg: "bg-brand-green/10",  color: "text-brand-green" },
  { label: "New Project",    icon: FolderPlus,    href: "/projects/new",   bg: "bg-brand-blue/10",   color: "text-brand-blue" },
  { label: "Report Issue",   icon: AlertTriangle, href: "/grievance",      bg: "bg-brand-amber/10",  color: "text-brand-amber" },
  { label: "Download Forms", icon: Download,      href: "/documents",      bg: "bg-brand-purple/10", color: "text-brand-purple" },
];

export default function QuickActions() {
  return (
    <div className="card p-5">
      <p className="section-title mb-4">Quick Actions</p>
      <div className="grid grid-cols-4 gap-3">
        {ACTIONS.map(a => {
          const Icon = a.icon;
          return (
            <Link key={a.label} href={a.href}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-surface-muted active:scale-95 transition-all cursor-pointer group">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", a.bg, "group-hover:scale-105")}>
                <Icon className={cn("w-5 h-5", a.color)} />
              </div>
              <span className="text-xs font-semibold text-text-secondary text-center leading-tight">{a.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
