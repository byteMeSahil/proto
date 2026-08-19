import { Users, Calendar, MapPin } from "lucide-react";

const MEETINGS = [
  { id: 1, title: "Monthly Gram Sabha", date: "25 May 2025", time: "11:00 AM", location: "Village Hall", agenda: ["Budget review", "Road project update", "New scheme enrollment"], status: "upcoming" },
  { id: 2, title: "Special Session – Water Crisis", date: "10 May 2025", time: "10:00 AM", location: "Open Ground", agenda: ["Water shortage in Ward 3", "Emergency fund allocation"], status: "completed" },
];

export default function GramSabhaPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-text-primary">Gram Sabha</h1>
        <p className="text-text-muted text-sm mt-0.5">Meetings, decisions, and activities</p>
      </div>
      <div className="space-y-4">
        {MEETINGS.map(m => (
          <div key={m.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`badge ${m.status === "upcoming" ? "badge-green" : "bg-surface-muted text-text-muted"}`}>
                    {m.status === "upcoming" ? "Upcoming" : "Completed"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-text-primary">{m.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{m.date} · {m.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{m.location}</span>
                </div>
              </div>
              {m.status === "upcoming" && <button className="btn-primary">RSVP</button>}
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border">
              <p className="text-xs font-semibold text-text-muted mb-2">Agenda</p>
              <ul className="space-y-1">
                {m.agenda.map((a, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
