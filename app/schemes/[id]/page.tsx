"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { ArrowLeft, ExternalLink, Phone, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getSchemeById } from "@/lib/data/schemes";
import EligibilityChecker from "@/components/EligibilityChecker";
import DocumentGuide from "@/components/DocumentGuide";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";
import type { EligibilityStatus } from "@/lib/data/schemes";

const TABS = ["overview", "eligibility", "documents", "apply"] as const;
type Tab = (typeof TABS)[number];

interface Props { params: Promise<{ id: string }> }

export default function SchemeDetailPage({ params }: Props) {
  const { id } = use(params);
  const scheme = getSchemeById(id);
  if (!scheme) notFound();

  const { t } = useLanguageStore();
  const [tab, setTab] = useState<Tab>("overview");
  const [eligResult, setEligResult] = useState<EligibilityStatus | null>(null);

  const TAB_LABELS: Record<Tab, string> = {
    overview:    "Overview",
    eligibility: t.eligibilityCheck,
    documents:   t.documents,
    apply:       t.howToApply,
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back + header */}
      <div className="bg-kriya-indigo px-4 pt-4 pb-6">
        <Link href="/schemes" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 w-fit">
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </Link>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs bg-white/20 text-white rounded-full px-2.5 py-0.5 font-semibold capitalize">{scheme.category}</span>
              <span className="text-xs bg-white/10 text-white/80 rounded-full px-2.5 py-0.5 capitalize">{scheme.level}</span>
              {scheme.isVerified && (
                <span className="flex items-center gap-1 text-xs text-kriya-gold font-semibold">
                  <Shield className="w-3 h-3" />{t.verifiedLabel}
                </span>
              )}
            </div>
            <h1 className="text-lg font-black text-white leading-snug">{scheme.name}</h1>
            <p className="text-sm text-white/70 mt-0.5">{scheme.nameHi}</p>
          </div>
        </div>
        {scheme.benefitAmount && (
          <div className="mt-3 inline-flex items-center gap-2 bg-kriya-saffron rounded-xl px-3 py-2">
            <span className="text-lg">💰</span>
            <div>
              <p className="text-2xs text-white/80 font-medium">Benefit</p>
              <p className="text-sm font-bold text-white">{scheme.benefitAmount}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-kriya-border-gray sticky top-[64px] z-20">
        <div className="flex overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                "flex-shrink-0 px-4 py-3 text-sm font-semibold transition-all border-b-2",
                tab === t ? "border-kriya-saffron text-kriya-saffron" : "border-transparent text-kriya-warm-gray hover:text-kriya-indigo"
              )}>
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-4 animate-fade-in">
            <div className="kriya-card p-4">
              <p className="kriya-label mb-2">About This Scheme</p>
              <p className="text-sm text-kriya-indigo-dark leading-relaxed">{scheme.shortDescription}</p>
            </div>
            <div className="kriya-card p-4 space-y-3">
              <p className="kriya-label">Key Details</p>
              <div className="space-y-2">
                {[
                  ["Ministry", scheme.ministry],
                  ["Benefit Type", scheme.benefitType],
                  ["Launched", String(scheme.launchYear)],
                  ...(scheme.beneficiariesCount ? [["Beneficiaries", scheme.beneficiariesCount]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm gap-3">
                    <span className="text-kriya-warm-gray font-medium flex-shrink-0">{k}</span>
                    <span className="text-kriya-indigo-dark font-semibold text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            {scheme.helplineNumber && (
              <a href={`tel:${scheme.helplineNumber}`} className="kriya-card p-4 flex items-center gap-3 hover:shadow-card-hover transition-all">
                <div className="w-10 h-10 rounded-xl bg-kriya-green-light flex items-center justify-center"><Phone className="w-5 h-5 text-kriya-green" /></div>
                <div><p className="text-xs text-kriya-warm-gray">{t.helpline}</p><p className="font-bold text-kriya-green">{scheme.helplineNumber}</p></div>
              </a>
            )}
            {scheme.requiresLiveVerification && (
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800">{t.liveVerificationNeeded}</p>
              </div>
            )}
            <div className="kriya-card p-4 space-y-1">
              <p className="kriya-label">{t.sourceLabel}</p>
              <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-kriya-indigo font-semibold hover:text-kriya-saffron transition-colors">
                {scheme.officialUrl} <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-2xs text-kriya-warm-gray">{t.lastVerified}: {scheme.lastVerified}</p>
              <p className="text-2xs italic text-kriya-warm-gray">{scheme.citation}</p>
            </div>
          </div>
        )}

        {/* Eligibility */}
        {tab === "eligibility" && (
          <div className="space-y-4 animate-fade-in">
            <div className="kriya-card p-4">
              <p className="kriya-label mb-2">Eligibility Summary</p>
              <p className="text-sm text-kriya-indigo-dark leading-relaxed">{scheme.eligibilitySummary}</p>
            </div>
            {eligResult && (
              <div className={cn("flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold text-sm",
                eligResult === "eligible" ? "bg-kriya-green-light text-kriya-green border border-kriya-green" :
                eligResult === "maybe"    ? "bg-amber-50 text-amber-700 border border-amber-300" :
                "bg-red-50 text-red-700 border border-red-300"
              )}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                {eligResult === "eligible" ? t.eligibleLabel : eligResult === "maybe" ? t.maybeEligibleLabel : t.notEligibleLabel}
              </div>
            )}
            <EligibilityChecker scheme={scheme} onResult={setEligResult} />
          </div>
        )}

        {/* Documents */}
        {tab === "documents" && (
          <div className="animate-fade-in">
            <DocumentGuide documents={scheme.documents} />
          </div>
        )}

        {/* Apply */}
        {tab === "apply" && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-3">
              {scheme.applicationSteps.map(step => (
                <div key={step.step} className="kriya-card p-4 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-kriya-saffron text-white font-black text-sm flex items-center justify-center flex-shrink-0">{step.step}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-kriya-indigo-dark text-sm">{step.title}</p>
                    <p className="text-xs text-kriya-warm-gray mt-1 leading-relaxed">{step.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={cn("text-2xs font-semibold rounded-full px-2 py-0.5",
                        step.mode === "online" ? "bg-blue-100 text-blue-700" :
                        step.mode === "offline" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"
                      )}>
                        {step.mode === "both" ? "Online & Offline" : step.mode.charAt(0).toUpperCase() + step.mode.slice(1)}
                      </span>
                      {step.url && (
                        <a href={step.url} target="_blank" rel="noopener noreferrer"
                          className="text-2xs text-kriya-indigo underline underline-offset-2 flex items-center gap-0.5 hover:text-kriya-saffron transition-colors">
                          Open Portal <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer"
              className="kriya-btn-primary w-full flex items-center justify-center gap-2 text-sm">
              Apply on Official Portal <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-center text-kriya-warm-gray">{t.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
