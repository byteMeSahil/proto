"use client";
import { useState } from "react";
import { Send, Save, CheckCircle2, Copy, AlertTriangle, Mic, ChevronDown } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "scheme_not_received", label: "Benefits Not Received", icon: "💸" },
  { value: "application_pending", label: "Application Pending Too Long", icon: "⏳" },
  { value: "document_rejection", label: "Document/Application Rejected Wrongly", icon: "📄" },
  { value: "corruption", label: "Bribery / Corruption by Official", icon: "⚠️" },
  { value: "ration_shop", label: "Ration Shop Issue", icon: "🏪" },
  { value: "nrega_wages", label: "NREGA Wages Not Paid", icon: "💰" },
  { value: "aadhaar_issue", label: "Aadhaar Linking Problem", icon: "🔗" },
  { value: "other", label: "Other", icon: "📋" },
];

const DEPARTMENTS = [
  "Gram Panchayat", "Block Development Office", "District Collectorate",
  "State Government", "Central Ministry", "Bank/Post Office", "FPS/Ration Shop",
];

interface FormData {
  name: string; mobile: string; village: string; district: string;
  state: string; category: string; department: string;
  description: string; schemeName: string; applicationNo: string;
}

type SubmitState = "idle" | "submitting" | "success" | "draft";

function generateGrievanceId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `KRY-${ts}-${rand}`;
}

export default function GrievanceForm() {
  const { t } = useLanguageStore();
  const [form, setForm] = useState<FormData>({
    name: "", mobile: "", village: "", district: "", state: "",
    category: "", department: "", description: "", schemeName: "", applicationNo: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [grievanceId, setGrievanceId] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const set = (key: keyof FormData, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.trim())) e.mobile = "Valid 10-digit mobile required";
    if (!form.category) e.category = "Please select a category";
    if (!form.description.trim() || form.description.trim().length < 20) e.description = "Please describe the issue (min 20 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (isDraft = false) => {
    if (!isDraft && !validate()) return;
    setSubmitState("submitting");
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    const id = generateGrievanceId();
    setGrievanceId(id);
    setSubmitState(isDraft ? "draft" : "success");
    // In production: POST to /api/grievances
  };

  const copyId = () => {
    navigator.clipboard?.writeText(grievanceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitState === "success" || submitState === "draft") {
    const isDraft = submitState === "draft";
    return (
      <div className="kriya-card p-6 text-center space-y-4 animate-fade-in">
        <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto",
          isDraft ? "bg-amber-100" : "bg-kriya-green-light")}>
          {isDraft ? <Save className="w-8 h-8 text-amber-600" /> : <CheckCircle2 className="w-8 h-8 text-kriya-green" />}
        </div>
        <div>
          <h3 className="text-lg font-bold text-kriya-indigo-dark">
            {isDraft ? "Draft Saved" : "Grievance Submitted!"}
          </h3>
          <p className="text-sm text-kriya-warm-gray mt-1">
            {isDraft ? "Your grievance draft has been saved. Submit when ready." : "Your complaint has been registered. You will receive updates on your mobile."}
          </p>
        </div>
        <div className="bg-kriya-saffron-light rounded-xl px-4 py-3">
          <p className="text-xs text-kriya-warm-gray font-medium mb-1">{t.grievanceId}</p>
          <div className="flex items-center justify-center gap-2">
            <code className="text-base font-bold text-kriya-saffron tracking-widest">{grievanceId}</code>
            <button onClick={copyId} className="text-kriya-warm-gray hover:text-kriya-saffron transition-colors">
              {copied ? <CheckCircle2 className="w-4 h-4 text-kriya-green" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="bg-kriya-indigo-light rounded-xl px-4 py-3 text-left space-y-1">
          <p className="text-xs font-semibold text-kriya-indigo">What happens next:</p>
          <p className="text-xs text-kriya-warm-gray">• Your grievance is forwarded to the concerned department</p>
          <p className="text-xs text-kriya-warm-gray">• Expected resolution: 30–60 working days</p>
          <p className="text-xs text-kriya-warm-gray">• Track status under the &quot;Track&quot; tab using your Grievance ID</p>
          <p className="text-xs text-kriya-warm-gray">• Escalate to <strong>CPGRAMS</strong> (pgportal.gov.in) if not resolved</p>
        </div>
        <button onClick={() => { setSubmitState("idle"); setForm({ name:"",mobile:"",village:"",district:"",state:"",category:"",department:"",description:"",schemeName:"",applicationNo:"" }); }}
          className="kriya-btn-secondary w-full">
          File Another Grievance
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800">
          This is a prototype. In production, grievances are routed to CPGRAMS (pgportal.gov.in). For urgent issues, call{" "}<strong>1800-11-1555</strong> (DARPG Helpline).
        </p>
      </div>

      {/* Personal Info */}
      <div className="kriya-card p-4 space-y-3">
        <p className="kriya-section-title">Your Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="kriya-label block mb-1">Full Name *</label>
            <input className={cn("kriya-input", errors.name && "border-red-400")} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="kriya-label block mb-1">Mobile Number *</label>
            <input className={cn("kriya-input", errors.mobile && "border-red-400")} value={form.mobile} onChange={e => set("mobile", e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="10-digit mobile" type="tel" maxLength={10} />
            {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <label className="kriya-label block mb-1">Village / Town</label>
            <input className="kriya-input" value={form.village} onChange={e => set("village", e.target.value)} placeholder="Your village or town" />
          </div>
          <div>
            <label className="kriya-label block mb-1">District</label>
            <input className="kriya-input" value={form.district} onChange={e => set("district", e.target.value)} placeholder="Your district" />
          </div>
          <div>
            <label className="kriya-label block mb-1">State</label>
            <input className="kriya-input" value={form.state} onChange={e => set("state", e.target.value)} placeholder="Your state" />
          </div>
        </div>
      </div>

      {/* Grievance Details */}
      <div className="kriya-card p-4 space-y-3">
        <p className="kriya-section-title">Grievance Details</p>

        <div>
          <label className="kriya-label block mb-1">{t.grievanceCategory} *</label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.value} type="button"
                onClick={() => set("category", cat.value)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left transition-all text-sm",
                  form.category === cat.value ? "border-kriya-saffron bg-kriya-saffron-light font-semibold" : "border-kriya-border-gray hover:border-kriya-saffron"
                )}
              >
                <span>{cat.icon}</span>
                <span className="text-xs leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="kriya-label block mb-1">Department / Office</label>
          <div className="relative">
            <select className="kriya-input appearance-none pr-8" value={form.department} onChange={e => set("department", e.target.value)}>
              <option value="">Select department…</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-kriya-warm-gray pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="kriya-label block mb-1">Scheme Name (if applicable)</label>
          <input className="kriya-input" value={form.schemeName} onChange={e => set("schemeName", e.target.value)} placeholder="e.g. PM-KISAN, PMAY-G…" />
        </div>

        <div>
          <label className="kriya-label block mb-1">Application / Reference Number (if any)</label>
          <input className="kriya-input" value={form.applicationNo} onChange={e => set("applicationNo", e.target.value)} placeholder="Your application ID or reference" />
        </div>

        <div>
          <label className="kriya-label block mb-1 flex items-center justify-between">
            <span>{t.grievanceDescription} *</span>
            <button className="text-kriya-saffron hover:text-kriya-saffron-dark transition-colors" title="Dictate grievance">
              <Mic className="w-4 h-4" />
            </button>
          </label>
          <textarea
            className={cn("kriya-input resize-none h-32", errors.description && "border-red-400")}
            value={form.description}
            onChange={e => set("description", e.target.value)}
            placeholder="Describe your problem clearly. Include dates, amounts, and names of officials if known…"
          />
          <div className="flex justify-between mt-1">
            {errors.description ? <p className="text-xs text-red-500">{errors.description}</p> : <span />}
            <p className="text-xs text-kriya-warm-gray">{form.description.length} chars</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => handleSubmit(true)}
          disabled={submitState === "submitting"}
          className="flex-1 kriya-btn-secondary flex items-center justify-center gap-2 text-sm"
        >
          <Save className="w-4 h-4" />{t.grievanceDraft}
        </button>
        <button
          onClick={() => handleSubmit(false)}
          disabled={submitState === "submitting"}
          className="flex-1 kriya-btn-green flex items-center justify-center gap-2 text-sm"
        >
          {submitState === "submitting" ? (
            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Submitting…</span>
          ) : (
            <><Send className="w-4 h-4" />{t.grievanceSubmit}</>
          )}
        </button>
      </div>

      <p className="text-xs text-center text-kriya-warm-gray">{t.disclaimer}</p>
    </div>
  );
}
