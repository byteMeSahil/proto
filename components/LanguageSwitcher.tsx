"use client";
import { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { LANGUAGES, type LangCode } from "@/lib/i18n/languages";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguageStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1.5 rounded-xl font-medium transition-all",
          "bg-white/10 hover:bg-white/20 text-white border border-white/20",
          compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
        )}
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
        <span className="hidden sm:inline">{current.nativeName}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 rounded-2xl bg-white shadow-card-hover border border-kriya-border-gray overflow-hidden animate-slide-down">
          <div className="px-3 py-2 bg-kriya-indigo-light border-b border-kriya-border-gray">
            <p className="text-xs font-semibold text-kriya-indigo uppercase tracking-wider">Select Language</p>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code as LangCode); setOpen(false); }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors",
                  "hover:bg-kriya-saffron-light",
                  lang === l.code ? "bg-kriya-saffron-light" : ""
                )}
              >
                <span className="text-base w-6 text-center">{l.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className={cn("text-sm font-semibold text-kriya-indigo-dark", l.fontClass)}>
                    {l.nativeName}
                  </div>
                  <div className="text-xs text-kriya-warm-gray">{l.name}</div>
                </div>
                {lang === l.code && <Check className="w-4 h-4 text-kriya-saffron flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
