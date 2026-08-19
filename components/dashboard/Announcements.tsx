import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ANNOUNCEMENTS = [
  { id: 1, month: "MAY", day: "25", title: "Gram Sabha Meeting", desc: "On 25th May 2025 at 11:00 AM", color: "bg-brand-blue text-white" },
  { id: 2, month: "MAY", day: "20", title: "Water Conservation Drive", desc: "Save water, secure future", color: "bg-brand-green text-white" },
  { id: 3, month: "MAY", day: "18", title: "Village Cleanliness Campaign", desc: "Let's keep our village clean", color: "bg-brand-orange text-white" },
];

export default function Announcements() {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="section-title">Announcements</p>
        <Link href="/announcements" className="section-link flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-3">
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} className="flex items-start gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-center", a.color)}>
              <span className="text-2xs font-semibold leading-none">{a.month}</span>
              <span className="text-sm font-black leading-none mt-0.5">{a.day}</span>
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="text-sm font-semibold text-text-primary leading-snug">{a.title}</p>
              <p className="text-xs text-text-muted mt-0.5">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
