import { Users, BookOpen, Landmark, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  {
    label: "Population",
    value: "1,250",
    sub: "Total",
    change: "+3.2%",
    positive: true,
    icon: Users,
    iconBg: "bg-brand-green/10",
    iconColor: "text-brand-green",
  },
  {
    label: "Active Schemes",
    value: "18",
    sub: "Running",
    change: null,
    positive: true,
    icon: BookOpen,
    iconBg: "bg-brand-blue/10",
    iconColor: "text-brand-blue",
  },
  {
    label: "Ongoing Projects",
    value: "14",
    sub: "In Progress",
    change: null,
    positive: true,
    icon: Landmark,
    iconBg: "bg-brand-orange/10",
    iconColor: "text-brand-orange",
  },
  {
    label: "Gram Sabha",
    value: "3",
    sub: "This Month",
    change: null,
    positive: true,
    icon: Mic,
    iconBg: "bg-brand-purple/10",
    iconColor: "text-brand-purple",
  },
];

export default function StatsRow() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {STATS.map(s => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="card px-5 py-4 flex items-center gap-4">
            <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0", s.iconBg)}>
              <Icon className={cn("w-5 h-5", s.iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text-muted text-xs font-medium">{s.label}</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <p className="text-2xl font-black text-text-primary">{s.value}</p>
                {s.change && (
                  <span className={cn("text-xs font-semibold", s.positive ? "text-brand-green" : "text-brand-red")}>
                    {s.change}
                  </span>
                )}
              </div>
              <p className="text-xs text-text-light mt-0.5">{s.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
