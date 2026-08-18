"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import VoiceSearchBar from "@/components/VoiceSearchBar";
import SchemeCard from "@/components/SchemeCard";
import { SCHEME_CATEGORIES, searchSchemes } from "@/lib/data/schemes";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

function SchemesContent() {
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const { t, lang } = useLanguageStore();
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const results = searchSchemes(query, category === "all" ? undefined : category)
    .filter(s => level === "all" || s.level === level);

  return (
    <div className="max-w-2xl mx-auto px-4 py-5 space-y-5">
      <div>
        <h1 className="kriya-section-title text-xl mb-1">{t.schemesTitle}</h1>
        <p className="text-sm text-kriya-warm-gray">{t.schemesSubtitle}</p>
      </div>

      <VoiceSearchBar onSearch={setQuery} />

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-kriya-warm-gray">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by Category
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {SCHEME_CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setCategory(cat.key)}
              className={cn("flex-shrink-0 flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                category === cat.key ? "bg-kriya-saffron text-white" : "bg-white border border-kriya-border-gray text-kriya-warm-gray hover:border-kriya-saffron"
              )}>
              {cat.icon} {lang === "hi" ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {["all", "central", "state"].map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={cn("rounded-full px-3 py-1.5 text-xs font-semibold transition-all capitalize",
                level === l ? "bg-kriya-indigo text-white" : "bg-white border border-kriya-border-gray text-kriya-warm-gray hover:border-kriya-indigo"
              )}>
              {l === "all" ? "All Levels" : l === "central" ? t.centralScheme : t.stateScheme}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-kriya-warm-gray">
        Showing <strong className="text-kriya-indigo-dark">{results.length}</strong> scheme{results.length !== 1 ? "s" : ""}
        {query && <> for "<strong className="text-kriya-saffron">{query}</strong>"</>}
      </p>

      {/* Results */}
      <div className="space-y-3">
        {results.length === 0 ? (
          <div className="kriya-card p-10 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-kriya-indigo-dark">No schemes found</p>
            <p className="text-sm text-kriya-warm-gray mt-1">Try different keywords or clear filters.</p>
            <button onClick={() => { setQuery(""); setCategory("all"); setLevel("all"); }}
              className="mt-3 kriya-btn-secondary text-sm py-2 px-4">
              Clear Filters
            </button>
          </div>
        ) : (
          results.map(s => <SchemeCard key={s.id} scheme={s} />)
        )}
      </div>
      {query && results.length > 0 && (
        <p className="text-xs text-center text-kriya-warm-gray">
          Showing results for &quot;{query}&quot;
        </p>
      )}
    </div>
  );
}

export default function SchemesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-kriya-warm-gray">Loading schemes…</div>}>
      <SchemesContent />
    </Suspense>
  );
}
