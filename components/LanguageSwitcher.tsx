"use client";
import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGUAGES, type LangCode } from "@/lib/i18n/languages";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface-muted border border-surface-border transition-all"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{current.nativeName}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 card shadow-card-md z-50 overflow-hidden animate-fade-in">
          <div className="px-3 py-2 border-b border-surface-border bg-surface-muted">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Language / भाषा</p>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {LANGUAGES.map(l => (
              <button key={l.code}
                onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
                className={cn("w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-surface-muted transition-colors",
                  lang === l.code && "bg-brand-green/5"
                )}>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-text-primary">{l.nativeName}</div>
                  <div className="text-xs text-text-muted">{l.name}</div>
                </div>
                {lang === l.code && <Check className="w-4 h-4 text-brand-green flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
