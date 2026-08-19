import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SCHEMES = [
  { id: "pm-kisan",        emoji: "🌾", name: "PM Kisan Samman Nidhi",    desc: "Financial assistance to farmers",         color: "bg-brand-green/10",  dot: "bg-brand-green" },
  { id: "ayushman-bharat", emoji: "🏥", name: "Ayushman Bharat Yojana",   desc: "Free health insurance up to ₹5 lakhs",    color: "bg-brand-red/10",    dot: "bg-brand-red" },
  { id: "pmay-gramin",     emoji: "🏠", name: "PM Awas Yojana",           desc: "Housing for all",                         color: "bg-brand-orange/10", dot: "bg-brand-orange" },
  { id: "mnregs",          emoji: "💼", name: "MGNREGA",                  desc: "100 days employment guarantee",           color: "bg-brand-amber/10",  dot: "bg-brand-amber" },
];

export default function PopularSchemes() {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="section-title">Popular Schemes</p>
        <Link href="/schemes" className="section-link flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {SCHEMES.map(s => (
          <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-muted transition-colors group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg ${s.color}`}>
              {s.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary truncate">{s.name}</p>
              <p className="text-xs text-text-muted truncate">{s.desc}</p>
            </div>
            <Link href={`/schemes/${s.id}`}
              className="flex-shrink-0 btn-apply opacity-0 group-hover:opacity-100 transition-opacity">
              Apply
            </Link>
          </div>
        ))}
      </div>

      <Link href="/schemes"
        className="flex items-center justify-center gap-2 pt-2 border-t border-surface-border text-sm font-semibold text-brand-green hover:text-brand-green-dark transition-colors">
        Explore all 42 schemes <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
