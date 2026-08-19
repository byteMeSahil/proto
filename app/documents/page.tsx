import { FileText, Download, Search } from "lucide-react";

const DOCS = [
  { name: "Aadhaar Card",         dept: "UIDAI",             url: "https://myaadhaar.uidai.gov.in" },
  { name: "Ration Card",          dept: "State PDS",         url: "https://nfsa.gov.in" },
  { name: "Birth Certificate",    dept: "Municipal / Panchayat", url: "#" },
  { name: "Caste Certificate",    dept: "Tehsil Office",     url: "#" },
  { name: "Income Certificate",   dept: "Tehsil Office",     url: "#" },
  { name: "Land Records (Khasra)",dept: "State Revenue Dept",url: "#" },
  { name: "Domicile Certificate", dept: "District Office",   url: "#" },
  { name: "PM-KISAN Status",      dept: "Ministry of Agriculture", url: "https://pmkisan.gov.in" },
];

export default function DocumentsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-text-primary">Documents & Certificates</h1>
        <p className="text-text-muted text-sm mt-0.5">Quick access to government certificates and records</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
        <input placeholder="Search documents…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-surface-border bg-white text-sm focus:outline-none focus:border-brand-green" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {DOCS.map(d => (
          <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer"
            className="card p-4 flex items-center gap-4 hover:shadow-card-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-brand-green" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-text-primary group-hover:text-brand-green transition-colors">{d.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{d.dept}</p>
            </div>
            <Download className="w-4 h-4 text-text-light group-hover:text-brand-green transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
