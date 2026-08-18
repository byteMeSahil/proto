"use client";
import { useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, ChevronRight, ExternalLink, Shield, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Scheme, type EligibilityStatus } from "@/lib/data/schemes";
import { useLanguageStore } from "@/store/languageStore";
import Link from "next/link";

const STATUS_CONFIG: Record<EligibilityStatus, { icon: typeof CheckCircle2; label: string; color: string; bg: string; border: string }> = {
  eligible:     { icon: CheckCircle2, label: "Likely Eligible",     color: "text-kriya-green",  bg: "bg-kriya-green-light",  border: "border-kriya-green" },
  maybe:        { icon: AlertCircle,  label: "Partially Eligible",  color: "text-kriya-gold",   bg: "bg-kriya-gold-light",   border: "border-kriya-gold" },
  not_eligible: { icon: XCircle,      label: "Not Eligible",        color: "text-red-600",      bg: "bg-red-50",             border: "border-red-300" },
  unknown:      { icon: Info,         label: "Check Eligibility",   color: "text-kriya-indigo", bg: "bg-kriya-indigo-light", border: "border-kriya-indigo" },
};

const CATEGORY_COLORS: Record<string, string> = {
  agriculture: "bg-green-100 text-green-800",
  housing:     "bg-orange-100 text-orange-800",
  health:      "bg-red-100 text-red-800",
  education:   "bg-blue-100 text-blue-800",
  finance:     "bg-yellow-100 text-yellow-800",
  women:       "bg-pink-100 text-pink-800",
  employment:  "bg-purple-100 text-purple-800",
  social:      "bg-teal-100 text-teal-800",
};

interface Props {
  scheme: Scheme;
  eligibilityStatus?: EligibilityStatus;
  onCheckEligibility?: (schemeId: string) => void;
  compact?: boolean;
}

export default function SchemeCard({ scheme, eligibilityStatus = "unknown", onCheckEligibility, compact = false }: Props) {
  const { t } = useLanguageStore();
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[eligibilityStatus];
  const StatusIcon = status.icon;

  return (
    <article className={cn(
      "kriya-card overflow-hidden transition-all duration-200 hover:shadow-card-hover",
      compact ? "p-3" : "p-4"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={cn("kriya-badge text-xs", CATEGORY_COLORS[scheme.category])}>
              {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
            </span>
            <span className={cn("kriya-badge text-xs",
              scheme.level === "central" ? "bg-kriya-indigo-light text-kriya-indigo" :
              scheme.level === "state"   ? "bg-amber-100 text-amber-800" :
              "bg-green-100 text-green-800"
            )}>
              {scheme.level === "central" ? t.centralScheme : scheme.level === "state" ? t.stateScheme : t.panchayatScheme}
            </span>
            {scheme.isVerified && (
              <span className="flex items-center gap-0.5 text-2xs font-semibold text-kriya-green">
                <Shield className="w-3 h-3" />{t.verifiedLabel}
              </span>
            )}
          </div>
          <h3 className={cn("font-bold text-kriya-indigo-dark leading-snug", compact ? "text-sm" : "text-base")}>
            {scheme.name}
          </h3>
          {scheme.nameHi && <p className="text-xs text-kriya-warm-gray font-medium mt-0.5">{scheme.nameHi}</p>}
        </div>

        {/* Eligibility badge */}
        <div className={cn("flex-shrink-0 flex items-center gap-1 rounded-xl px-2.5 py-1.5 border text-xs font-semibold", status.bg, status.border, status.color)}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{status.label}</span>
        </div>
      </div>

      {/* Benefit highlight */}
      {scheme.benefitAmount && (
        <div className="bg-kriya-saffron-light rounded-xl px-3 py-2 mb-3 flex items-center gap-2">
          <span className="text-lg">💰</span>
          <div>
            <p className="text-xs text-kriya-warm-gray font-medium">{t.benefits}</p>
            <p className="text-sm font-bold text-kriya-saffron-dark">{scheme.benefitAmount}</p>
          </div>
        </div>
      )}

      {/* Description */}
      <p className={cn("text-kriya-warm-gray leading-relaxed mb-3", compact ? "text-xs line-clamp-2" : "text-sm line-clamp-3")}>
        {scheme.shortDescription}
      </p>

      {/* Ministry */}
      <p className="text-2xs text-kriya-warm-gray mb-3">
        <span className="font-semibold">Ministry: </span>{scheme.ministry}
      </p>

      {/* Expanded details */}
      {expanded && !compact && (
        <div className="border-t border-kriya-border-gray pt-3 mt-3 space-y-3 animate-slide-down">
          <div>
            <p className="kriya-label mb-1.5">{t.eligibilityCheck}</p>
            <p className="text-sm text-kriya-indigo-dark leading-relaxed">{scheme.eligibilitySummary}</p>
          </div>
          {scheme.helplineNumber && (
            <div className="flex items-center gap-2 bg-kriya-green-light rounded-xl px-3 py-2">
              <span className="text-base">📞</span>
              <div>
                <p className="text-2xs font-semibold text-kriya-warm-gray">{t.helpline}</p>
                <p className="text-sm font-bold text-kriya-green">{scheme.helplineNumber}</p>
              </div>
            </div>
          )}
          {scheme.requiresLiveVerification && (
            <div className="flex items-start gap-2 bg-amber-50 rounded-xl px-3 py-2 border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">{t.liveVerificationNeeded}</p>
            </div>
          )}
          <p className="text-2xs text-kriya-warm-gray">
            <span className="font-semibold">{t.sourceLabel}: </span>
            <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer"
               className="text-kriya-indigo underline underline-offset-2 hover:text-kriya-saffron">
              {scheme.officialUrl}
            </a>
            {" · "}<span className="font-semibold">{t.lastVerified}: </span>{scheme.lastVerified}
          </p>
          <p className="text-2xs italic text-kriya-warm-gray">{scheme.citation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {!compact && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-kriya-indigo hover:text-kriya-saffron transition-colors"
          >
            {expanded ? "Hide details" : t.learnMore}
            <ChevronRight className={cn("w-3.5 h-3.5 transition-transform", expanded && "rotate-90")} />
          </button>
        )}
        <div className="flex-1" />
        {onCheckEligibility && eligibilityStatus === "unknown" && (
          <button
            onClick={() => onCheckEligibility(scheme.id)}
            className="kriya-btn-secondary text-xs py-2 px-3"
          >
            {t.eligibilityCheck}
          </button>
        )}
        <Link
          href={`/schemes/${scheme.id}`}
          className="kriya-btn-primary text-xs py-2 px-3 flex items-center gap-1"
        >
          {t.applyNow}
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
