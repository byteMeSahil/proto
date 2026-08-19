"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import SchemeCard from "@/components/SchemeCard";
import VoiceSearchBar from "@/components/VoiceSearchBar";
import { SCHEME_CATEGORIES, searchSchemes } from "@/lib/data/schemes";
import { cn } from "@/lib/utils";

function SchemesContent() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const results = searchSchemes(query, category === "all" ? undefined : category)
    .filter(s => level === "all" || s.level === level);

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-black text-text-primary">Government Schemes</h1>
        <p className="text-text-muted text-sm mt-0.5">Browse and find schemes you are eligible for</p>
      </div>

      <VoiceSearchBar onSearch={setQuery} />

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
        </div>
        <div className="flex gap-2 flex-wrap">
          {SCHEME_CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setCategory(cat.key)}
              className={cn("flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                category === cat.key ? "bg-brand-green text-white" : "bg-white border border-surface-border text-text-muted hover:border-brand-green"
              )}>
              {cat.icon} {cat.labelEn}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          {["all", "central", "state"].map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={cn("rounded-full px-3 py-1.5 text-xs font-semibold transition-all capitalize",
                level === l ? "bg-brand-green text-white" : "bg-white border border-surface-border text-text-muted hover:border-brand-green"
              )}>
              {l === "all" ? "All Levels" : l === "central" ? "Central" : "State"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-text-muted">
        Showing <strong className="text-text-primary">{results.length}</strong> scheme{results.length !== 1 ? "s" : ""}
        {query && <> for &quot;<strong className="text-brand-green">{query}</strong>&quot;</>}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {results.length === 0 ? (
          <div className="card p-10 text-center col-span-3">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-text-primary">No schemes found</p>
            <p className="text-sm text-text-muted mt-1">Try different keywords or clear filters.</p>
            <button onClick={() => { setQuery(""); setCategory("all"); setLevel("all"); }}
              className="mt-3 btn-secondary text-sm py-2 px-4">Clear Filters</button>
          </div>
        ) : (
          results.map(s => <SchemeCard key={s.id} scheme={s} />)
        )}
      </div>
    </div>
  );
}

export default function SchemesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-text-muted">Loading schemes…</div>}>
      <SchemesContent />
    </Suspense>
  );
}
