"use client";
import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown, MapPin, AlertCircle, Download } from "lucide-react";
import { type Document } from "@/lib/data/schemes";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

interface Props {
  documents: Document[];
  onReadyChange?: (readyCount: number, total: number) => void;
}

export default function DocumentGuide({ documents, onReadyChange }: Props) {
  const { t } = useLanguageStore();
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (idx: number) => {
    const next = new Set(checked);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    setChecked(next);
    onReadyChange?.(next.size, documents.length);
  };

  const readyCount = checked.size;
  const total = documents.length;
  const pct = Math.round((readyCount / total) * 100);

  return (
    <div className="space-y-4">
      {/* Progress summary */}
      <div className="kriya-card p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm font-bold text-kriya-indigo-dark">
              {readyCount === total ? "✅ All documents ready!" : `${readyCount} of ${total} documents ready`}
            </p>
            <p className="text-xs text-kriya-warm-gray mt-0.5">
              {total - readyCount === 0 ? "You can proceed to apply." : `${total - readyCount} document${total - readyCount !== 1 ? "s" : ""} still needed`}
            </p>
          </div>
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E0DDD8" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E8670A" strokeWidth="3"
                strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset="0" strokeLinecap="round" />
            </svg>
            <span className="absolute text-xs font-bold text-kriya-saffron">{pct}%</span>
          </div>
        </div>
        <div className="h-2 bg-kriya-light-gray rounded-full overflow-hidden">
          <div className="h-full bg-kriya-saffron rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Document list */}
      <div className="space-y-2">
        {documents.map((doc, idx) => {
          const isReady = checked.has(idx);
          const isOpen = expanded === idx;
          return (
            <div key={idx} className={cn(
              "kriya-card overflow-hidden transition-all",
              isReady ? "border-kriya-green bg-kriya-green-light" : "border-kriya-border-gray"
            )}>
              {/* Row */}
              <div className="flex items-center gap-3 p-3">
                <button onClick={() => toggle(idx)} className="flex-shrink-0" aria-label={isReady ? "Mark not ready" : "Mark ready"}>
                  {isReady
                    ? <CheckCircle2 className="w-5 h-5 text-kriya-green" />
                    : <Circle className="w-5 h-5 text-kriya-warm-gray hover:text-kriya-saffron transition-colors" />
                  }
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={cn("text-sm font-semibold leading-snug", isReady ? "text-kriya-green line-through" : "text-kriya-indigo-dark")}>
                      {doc.name}
                    </p>
                    {doc.isMandatory && (
                      <span className="text-2xs font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">Required</span>
                    )}
                  </div>
                  <p className="text-xs text-kriya-warm-gray mt-0.5 truncate">{doc.description}</p>
                </div>
                <button onClick={() => setExpanded(isOpen ? null : idx)} className="flex-shrink-0 text-kriya-warm-gray hover:text-kriya-indigo transition-colors">
                  <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
                </button>
              </div>

              {/* Expanded info */}
              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-kriya-border-gray bg-white space-y-3 animate-slide-down">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="kriya-label mb-1">Issuing Authority</p>
                      <p className="text-sm text-kriya-indigo-dark font-medium">{doc.issuingAuthority}</p>
                    </div>
                    <div>
                      <p className="kriya-label mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" />{t.whereToGet}</p>
                      <p className="text-sm text-kriya-indigo-dark font-medium">{doc.whereToGet}</p>
                    </div>
                  </div>
                  {!doc.isMandatory && (
                    <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      This document is optional but may speed up your application.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {readyCount < total && (
        <div className="bg-kriya-indigo-light rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-kriya-indigo flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-kriya-indigo-dark">Need help getting documents?</p>
            <p className="text-xs text-kriya-warm-gray mt-1">Visit your nearest Common Service Centre (CSC) or Gram Panchayat. They can help you obtain Aadhaar, caste certificates, and income certificates.</p>
            <button className="mt-2 text-xs font-semibold text-kriya-indigo underline underline-offset-2 hover:text-kriya-saffron transition-colors flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Download Document Checklist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
