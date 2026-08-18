"use client";
import { useState } from "react";
import { CheckCircle2, AlertCircle, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { type Scheme, type EligibilityStatus, type EligibilityCriteria } from "@/lib/data/schemes";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

interface Answers { [field: string]: string | number | boolean }

function scoreEligibility(scheme: Scheme, answers: Answers): EligibilityStatus {
  let pass = 0; let total = 0;
  for (const c of scheme.eligibilityCriteria) {
    if (!(c.field in answers)) continue;
    total++;
    const val = answers[c.field];
    if (c.type === "boolean") {
      // For fields like "hasPuccaHouse" or "hasLPG" or "hasBankAccount", the logic depends on field intent
      const negativeFields = ["hasPuccaHouse", "hasLPG", "hasBankAccount_existing"];
      if (negativeFields.includes(c.field)) {
        if (val === false || val === "false") pass++;
      } else {
        if (val === true || val === "true") pass++;
      }
    } else if (c.type === "number_range") {
      const n = Number(val);
      if ((c.min === undefined || n >= c.min) && (c.max === undefined || n <= c.max)) pass++;
    } else if (c.type === "select") {
      if (val !== "" && val !== undefined) pass++;
    }
  }
  if (total === 0) return "unknown";
  const ratio = pass / total;
  if (ratio >= 0.85) return "eligible";
  if (ratio >= 0.5)  return "maybe";
  return "not_eligible";
}

interface Props {
  scheme: Scheme;
  onResult?: (status: EligibilityStatus) => void;
}

export default function EligibilityChecker({ scheme, onResult }: Props) {
  const { t } = useLanguageStore();
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<EligibilityStatus | null>(null);
  const [step, setStep] = useState(0);
  const criteria = scheme.eligibilityCriteria;

  const handleAnswer = (field: string, value: string | number | boolean) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);
    if (step < criteria.length - 1) {
      setStep(step + 1);
    } else {
      const status = scoreEligibility(scheme, newAnswers);
      setResult(status);
      onResult?.(status);
    }
  };

  const reset = () => { setAnswers({}); setResult(null); setStep(0); };

  if (result) {
    const configs = {
      eligible:     { icon: CheckCircle2, color: "text-kriya-green",  bg: "bg-kriya-green-light",  border: "border-kriya-green",  msg: "Based on your answers, you are likely eligible for this scheme. Visit the official portal or nearest CSC to apply." },
      maybe:        { icon: AlertCircle,  color: "text-amber-600",    bg: "bg-amber-50",           border: "border-amber-300",    msg: "You may partially qualify. Some criteria need verification. We recommend visiting your Gram Panchayat or CSC for confirmation." },
      not_eligible: { icon: XCircle,      color: "text-red-600",      bg: "bg-red-50",             border: "border-red-300",      msg: "Based on your answers, you may not be eligible for this scheme right now. Explore similar schemes below." },
      unknown:      { icon: AlertCircle,  color: "text-kriya-indigo", bg: "bg-kriya-indigo-light", border: "border-kriya-indigo", msg: "Unable to determine eligibility. Please visit your nearest CSC or Gram Panchayat for guidance." },
    };
    const cfg = configs[result];
    const Icon = cfg.icon;
    return (
      <div className={cn("rounded-2xl border p-5 text-center space-y-4", cfg.bg, cfg.border)}>
        <Icon className={cn("w-12 h-12 mx-auto", cfg.color)} />
        <div>
          <p className={cn("text-lg font-bold", cfg.color)}>
            {result === "eligible" ? t.eligibleLabel : result === "maybe" ? t.maybeEligibleLabel : t.notEligibleLabel}
          </p>
          <p className="text-sm text-kriya-warm-gray mt-1 leading-relaxed">{cfg.msg}</p>
        </div>
        <p className="text-xs italic text-kriya-warm-gray">{t.disclaimer}</p>
        <button onClick={reset} className="flex items-center gap-2 mx-auto text-sm font-semibold text-kriya-indigo hover:text-kriya-saffron transition-colors">
          <RotateCcw className="w-4 h-4" />{t.retry}
        </button>
      </div>
    );
  }

  const current: EligibilityCriteria = criteria[step];
  const progress = Math.round((step / criteria.length) * 100);

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-kriya-warm-gray mb-1.5">
          <span>Question {step + 1} of {criteria.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-kriya-light-gray rounded-full overflow-hidden">
          <div className="h-full bg-kriya-saffron rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="kriya-card p-5 space-y-4">
        <p className="text-base font-semibold text-kriya-indigo-dark leading-snug">{current.label}</p>

        {current.type === "boolean" && (
          <div className="flex gap-3">
            {["Yes", "No"].map((opt) => (
              <button key={opt}
                onClick={() => handleAnswer(current.field, opt === "Yes")}
                className={cn(
                  "flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all",
                  "hover:border-kriya-saffron hover:bg-kriya-saffron-light",
                  "active:scale-95"
                )}
              >
                {opt === "Yes" ? "✅ Yes" : "❌ No"}
              </button>
            ))}
          </div>
        )}

        {current.type === "number_range" && (
          <div className="space-y-2">
            <input
              type="number"
              min={current.min}
              max={current.max}
              className="kriya-input"
              placeholder={`Enter value${current.min !== undefined ? ` (min: ${current.min})` : ""}${current.max !== undefined ? ` (max: ${current.max})` : ""}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = parseFloat((e.target as HTMLInputElement).value);
                  if (!isNaN(val)) handleAnswer(current.field, val);
                }
              }}
            />
            <button
              className="w-full kriya-btn-primary flex items-center justify-center gap-2"
              onClick={(e) => {
                const input = (e.currentTarget.parentElement?.querySelector("input")) as HTMLInputElement;
                const val = parseFloat(input?.value);
                if (!isNaN(val)) handleAnswer(current.field, val);
              }}
            >
              {t.next} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {current.type === "select" && current.options && (
          <div className="grid grid-cols-2 gap-2">
            {current.options.map((opt) => (
              <button key={opt}
                onClick={() => handleAnswer(current.field, opt)}
                className="py-2.5 rounded-xl border-2 border-kriya-border-gray hover:border-kriya-saffron hover:bg-kriya-saffron-light text-sm font-medium transition-all active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
