"use client";
import { useState } from "react";
import { Search, CheckCircle2, Clock, FileText, ThumbsUp, Banknote, XCircle, ChevronDown, Phone, AlertCircle } from "lucide-react";
import { TRACKING_STEPS, SAMPLE_APPLICATIONS, type ApplicationTrack, type TrackStatus } from "@/lib/data/trackingData";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

const STATUS_ORDER: TrackStatus[] = ["submitted", "under_review", "doc_verification", "approved", "disbursed"];

const STATUS_ICONS: Record<TrackStatus, typeof CheckCircle2> = {
  submitted: FileText, under_review: Clock, doc_verification: FileText,
  approved: ThumbsUp, disbursed: Banknote, rejected: XCircle, pending: Clock,
};

const STATUS_COLORS: Record<TrackStatus, string> = {
  submitted: "text-blue-600 bg-blue-50 border-blue-200",
  under_review: "text-amber-600 bg-amber-50 border-amber-200",
  doc_verification: "text-purple-600 bg-purple-50 border-purple-200",
  approved: "text-kriya-green bg-kriya-green-light border-kriya-green",
  disbursed: "text-kriya-green bg-kriya-green-light border-kriya-green",
  rejected: "text-red-600 bg-red-50 border-red-200",
  pending: "text-gray-600 bg-gray-50 border-gray-200",
};

function StepDot({ status, isCurrent, isDone }: { status: TrackStatus; isCurrent: boolean; isDone: boolean }) {
  const Icon = STATUS_ICONS[status] ?? Clock;
  return (
    <div className={cn(
      "w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
      isDone  ? "bg-kriya-green border-kriya-green text-white" :
      isCurrent ? "bg-kriya-saffron border-kriya-saffron text-white animate-pulse-slow" :
      "bg-white border-kriya-border-gray text-kriya-warm-gray"
    )}>
      {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
    </div>
  );
}

export default function ApplicationTracker() {
  const { t } = useLanguageStore();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ApplicationTrack | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true); setNotFound(false); setResult(null);
    await new Promise(r => setTimeout(r, 800));
    const found = SAMPLE_APPLICATIONS.find(a =>
      a.applicationId.toLowerCase() === query.trim().toLowerCase()
    );
    if (found) setResult(found); else setNotFound(true);
    setLoading(false);
  };

  const loadSample = (app: ApplicationTrack) => {
    setQuery(app.applicationId);
    setResult(app);
    setNotFound(false);
  };

  const currentIdx = result ? STATUS_ORDER.indexOf(result.currentStatus) : -1;

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <div className="kriya-card p-4 space-y-3">
        <p className="kriya-section-title">{t.trackingTitle}</p>
        <div className="flex gap-2">
          <input
            className="kriya-input flex-1"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter Application ID (e.g. PMKISAN-2024-MH-0042891)"
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="kriya-btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <Search className="w-4 h-4" />}
            {t.trackApplication}
          </button>
        </div>

        {/* Sample IDs */}
        <div>
          <p className="text-xs text-kriya-warm-gray mb-2">Try sample applications:</p>
          <div className="flex flex-col gap-1.5">
            {SAMPLE_APPLICATIONS.map(app => (
              <button key={app.applicationId} onClick={() => loadSample(app)}
                className="text-left text-xs text-kriya-indigo bg-kriya-indigo-light hover:bg-kriya-saffron-light rounded-lg px-3 py-2 transition-colors font-mono">
                {app.applicationId} — <span className="font-sans text-kriya-warm-gray">{app.schemeName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Not found */}
      {notFound && (
        <div className="kriya-card p-5 text-center space-y-2 border-red-200 bg-red-50">
          <XCircle className="w-10 h-10 text-red-500 mx-auto" />
          <p className="font-semibold text-red-700">Application not found</p>
          <p className="text-sm text-red-600">Check the ID and try again, or contact your Gram Panchayat / CSC.</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Summary card */}
          <div className="kriya-card p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-xs text-kriya-warm-gray font-medium">{t.applicationId}</p>
                <code className="text-sm font-bold text-kriya-indigo-dark">{result.applicationId}</code>
              </div>
              <span className={cn("kriya-badge border text-xs", STATUS_COLORS[result.currentStatus])}>
                {TRACKING_STEPS.find(s => s.id === result.currentStatus)?.label ?? result.currentStatus}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="kriya-label">Scheme</p>
                <p className="font-semibold text-kriya-indigo-dark mt-0.5">{result.schemeName}</p>
              </div>
              <div>
                <p className="kriya-label">Applicant</p>
                <p className="font-semibold text-kriya-indigo-dark mt-0.5">{result.applicantName}</p>
              </div>
              <div>
                <p className="kriya-label">Submitted On</p>
                <p className="font-semibold text-kriya-indigo-dark mt-0.5">{result.submittedDate}</p>
              </div>
              <div>
                <p className="kriya-label">{t.lastUpdated}</p>
                <p className="font-semibold text-kriya-indigo-dark mt-0.5">{result.currentStatusDate}</p>
              </div>
            </div>
            {result.officerName && (
              <div className="mt-3 pt-3 border-t border-kriya-border-gray flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-kriya-indigo-light flex items-center justify-center text-kriya-indigo font-bold text-xs">
                  {result.officerName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-kriya-indigo-dark">{result.officerName}</p>
                  <p className="text-2xs text-kriya-warm-gray">{result.officerDesignation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress stepper */}
          {result.currentStatus !== "rejected" && (
            <div className="kriya-card p-4">
              <p className="kriya-section-title mb-4">Application Progress</p>
              <div className="relative">
                {/* Connector line */}
                <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-kriya-border-gray" />
                <div
                  className="absolute left-[17px] top-0 w-0.5 bg-kriya-green transition-all duration-700"
                  style={{ height: `${Math.max(0, currentIdx) * (100 / (STATUS_ORDER.length - 1))}%` }}
                />

                <div className="space-y-0">
                  {TRACKING_STEPS.map((step, idx) => {
                    const isDone = idx < currentIdx || (result.currentStatus === "disbursed");
                    const isCurrent = idx === currentIdx;
                    const histEntry = result.history.find(h => h.status === step.id);
                    const isExpanded = expandedStep === idx;
                    return (
                      <div key={step.id} className="relative pl-12 pb-5 last:pb-0">
                        <div className="absolute left-0">
                          <StepDot status={step.id} isCurrent={isCurrent} isDone={isDone || (result.currentStatus === "disbursed")} />
                        </div>
                        <button
                          onClick={() => setExpandedStep(isExpanded ? null : idx)}
                          className={cn(
                            "w-full text-left rounded-xl px-3 py-2.5 transition-all",
                            isCurrent ? "bg-kriya-saffron-light border border-kriya-saffron" :
                            isDone || result.currentStatus === "disbursed" ? "bg-kriya-green-light" : "bg-kriya-light-gray"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={cn("text-sm font-semibold",
                                isCurrent ? "text-kriya-saffron-dark" :
                                isDone || result.currentStatus === "disbursed" ? "text-kriya-green" : "text-kriya-warm-gray"
                              )}>
                                {step.icon} {step.label}
                              </p>
                              {histEntry && (
                                <p className="text-xs text-kriya-warm-gray mt-0.5">{histEntry.date}</p>
                              )}
                            </div>
                            {histEntry && <ChevronDown className={cn("w-4 h-4 text-kriya-warm-gray transition-transform", isExpanded && "rotate-180")} />}
                          </div>
                          {isExpanded && histEntry && (
                            <p className="text-xs text-kriya-indigo-dark mt-2 pt-2 border-t border-kriya-border-gray animate-slide-down">
                              {histEntry.remark}
                            </p>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Rejected state */}
          {result.currentStatus === "rejected" && (
            <div className="kriya-card p-4 border-red-200 bg-red-50">
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-red-700">Application Rejected</p>
                  <p className="text-sm text-red-600 mt-1">{result.remarks}</p>
                  <p className="text-xs text-red-500 mt-2">You can appeal this decision at your Block Development Office or re-apply with corrected documents.</p>
                </div>
              </div>
            </div>
          )}

          {/* Remarks / Next action */}
          {result.remarks && result.currentStatus !== "rejected" && (
            <div className={cn("kriya-card p-4", result.currentStatus === "disbursed" ? "border-kriya-green bg-kriya-green-light" : "border-amber-200 bg-amber-50")}>
              <div className="flex items-start gap-3">
                {result.currentStatus === "disbursed"
                  ? <CheckCircle2 className="w-5 h-5 text-kriya-green flex-shrink-0" />
                  : <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                }
                <div>
                  <p className={cn("font-semibold text-sm", result.currentStatus === "disbursed" ? "text-kriya-green" : "text-amber-700")}>
                    {result.currentStatus === "disbursed" ? "Benefits Disbursed" : "Action Required"}
                  </p>
                  <p className="text-sm mt-1 text-kriya-indigo-dark">{result.remarks}</p>
                  {result.nextAction && (
                    <div className="mt-2 bg-white rounded-lg px-3 py-2">
                      <p className="text-xs font-semibold text-kriya-warm-gray">{t.nextStep}</p>
                      <p className="text-sm text-kriya-indigo-dark mt-0.5">{result.nextAction}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Helpline */}
          <div className="kriya-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-kriya-green-light flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-kriya-green" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-kriya-indigo-dark">Need help with your application?</p>
              <p className="text-xs text-kriya-warm-gray">Call the scheme helpline or visit your nearest Gram Panchayat / CSC</p>
            </div>
            <a href="tel:1800111555" className="kriya-btn-green text-xs py-2 px-3 whitespace-nowrap">
              Call 1800-111-555
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
