import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    id: "p1", title: "Village Road Construction", location: "Ward 1 & 2",
    progress: 75, color: "bg-brand-green",
    expected: "Jun 15, 2025", img: "🛣️",
    bg: "from-green-100 to-green-200",
  },
  {
    id: "p2", title: "Water Tank Installation", location: "Ward 3",
    progress: 60, color: "bg-brand-blue",
    expected: "Jul 10, 2025", img: "🏗️",
    bg: "from-blue-100 to-blue-200",
  },
  {
    id: "p3", title: "Community Hall Renovation", location: "Village Center",
    progress: 80, color: "bg-brand-orange",
    expected: "May 30, 2025", img: "🏛️",
    bg: "from-orange-100 to-orange-200",
  },
  {
    id: "p4", title: "School Building Upgrade", location: "Primary School",
    progress: 40, color: "bg-brand-purple",
    expected: "Aug 20, 2025", img: "🏫",
    bg: "from-purple-100 to-purple-200",
  },
];

export default function DevelopmentProjects() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="section-title">Ongoing Development Projects</p>
        <Link href="/projects" className="section-link flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {PROJECTS.map(p => (
          <Link key={p.id} href={`/projects/${p.id}`}
            className="group flex flex-col rounded-2xl overflow-hidden border border-surface-border hover:shadow-card-md transition-all">
            {/* Image placeholder */}
            <div className={cn("h-28 flex items-center justify-center text-5xl bg-gradient-to-br", p.bg)}>
              {p.img}
            </div>
            {/* Info */}
            <div className="p-3 flex-1 flex flex-col gap-2">
              <div>
                <p className="text-xs font-bold text-text-primary leading-snug group-hover:text-brand-green transition-colors">{p.title}</p>
                <p className="text-2xs text-text-muted mt-0.5">{p.location}</p>
              </div>
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-2xs text-text-muted font-medium">Progress</span>
                  <span className="text-2xs font-bold text-text-primary">{p.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className={cn("progress-fill", p.color)} style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <p className="text-2xs text-text-light">Expected: {p.expected}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
