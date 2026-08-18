import { Phone } from "lucide-react";

const HELPLINES = [
  { scheme: "PM-KISAN",              number: "155261",       dept: "Ministry of Agriculture" },
  { scheme: "Ayushman Bharat PMJAY", number: "14555",        dept: "National Health Authority" },
  { scheme: "MGNREGS / NREGA",       number: "1800-111-555", dept: "Ministry of Rural Development" },
  { scheme: "PMAY-Gramin",           number: "1800-11-6446", dept: "Ministry of Rural Development" },
  { scheme: "PM Ujjwala Yojana",     number: "1800-233-3555",dept: "Ministry of Petroleum" },
  { scheme: "PDS / Ration",          number: "14445",        dept: "Dept of Food & Public Distribution" },
  { scheme: "CPGRAMS Grievance",     number: "1800-11-1555", dept: "DARPG" },
  { scheme: "Jan Dhan / Banking",    number: "1800-11-0001", dept: "Dept of Financial Services" },
  { scheme: "Kisan Call Centre",     number: "1800-180-1551",dept: "Ministry of Agriculture" },
  { scheme: "COVID / Health",        number: "104",          dept: "Ministry of Health" },
  { scheme: "Women Helpline",        number: "181",          dept: "Ministry of Women & Child Development" },
  { scheme: "Child Helpline",        number: "1098",         dept: "Ministry of Women & Child Development" },
];

export default function HelplinesPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-4">
      <div>
        <h1 className="text-xl font-black text-kriya-indigo-dark mb-1">Government Helplines</h1>
        <p className="text-sm text-kriya-warm-gray">All helplines are toll-free and available pan-India.</p>
      </div>

      <div className="space-y-2">
        {HELPLINES.map(h => (
          <a key={h.number + h.scheme} href={`tel:${h.number.replace(/-/g, "")}`}
            className="kriya-card p-4 flex items-center gap-4 hover:shadow-card-hover active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-xl bg-kriya-green-light flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-kriya-green" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-kriya-indigo-dark text-sm">{h.scheme}</p>
              <p className="text-xs text-kriya-warm-gray mt-0.5">{h.dept}</p>
            </div>
            <span className="font-black text-kriya-green text-sm flex-shrink-0">{h.number}</span>
          </a>
        ))}
      </div>
      <p className="text-xs text-center text-kriya-warm-gray">All calls are free from any phone in India.</p>
    </div>
  );
}
