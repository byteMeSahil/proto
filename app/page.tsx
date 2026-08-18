"use client";
import { useState } from "react";
import { ArrowRight, Search, FileText, MapPin, Shield, ChevronRight, Phone } from "lucide-react";
import VoiceSearchBar from "@/components/VoiceSearchBar";
import SchemeCard from "@/components/SchemeCard";
import { SCHEME_CATEGORIES, searchSchemes } from "@/lib/data/schemes";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";
import Link from "next/link";

const QUICK_ACTIONS = [
  { icon: Search,       label: "Find Schemes",       href: "/schemes",            color: "bg-kriya-indigo-light text-kriya-indigo",  emoji: "🔍" },
  { icon: FileText,     label: "File Grievance",      href: "/grievance",          color: "bg-red-50 text-red-700",                  emoji: "📝" },
  { icon: MapPin,       label: "Track Application",   href: "/track",              color: "bg-green-50 text-green-700",              emoji: "📍" },
  { icon: Phone,        label: "Helplines",           href: "/helplines",          color: "bg-amber-50 text-amber-700",              emoji: "📞" },
];

const STATS = [
  { value: "10+",        label: "Languages",     icon: "🌏" },
  { value: "₹5 lakh",   label: "Max Health Cover", icon: "🏥" },
  { value: "100 days",  label: "NREGA Guarantee",  icon: "💼" },
  { value: "₹6,000",   label: "PM-KISAN/year",    icon: "🌾" },
];

export default function HomePage() {
  const { t, lang } = useLanguageStore();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const displayedSchemes = searchSchemes(searchQuery, activeCategory === "all" ? undefined : activeCategory).slice(0, 4);

  return (
    <div className="max-w-2xl mx-auto">
      {/* ── Hero Banner ── */}
      <section className="bg-kriya-hero px-4 pt-6 pb-10 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -left-8 w-52 h-52 rounded-full bg-white/5" />
        <div className="absolute top-16 right-4 w-20 h-20 rounded-full bg-kriya-saffron/20" />

        <div className="relative z-10">
          {/* Trust strip */}
          <div className="flex items-center gap-1.5 mb-4">
            <Shield className="w-3.5 h-3.5 text-kriya-gold" />
            <span className="text-xs font-semibold text-kriya-gold">Official Government Schemes · Verified Data</span>
          </div>

          <h1 className="text-2xl font-black text-white leading-tight mb-2 text-balance">
            {t.heroTitle}
          </h1>
          <p className="text-white/75 text-sm leading-relaxed mb-6">{t.heroSubtitle}</p>

          {/* Voice + Text Search */}
          <VoiceSearchBar
            onSearch={(q) => setSearchQuery(q)}
            large
          />

          {/* Quick suggestion pills */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {["PM-KISAN", "PMAY Housing", "Ayushman Card", "NREGA Job"].map(q => (
              <button key={q}
                onClick={() => setSearchQuery(q)}
                className="text-xs bg-white/15 hover:bg-white/25 text-white rounded-full px-3 py-1.5 transition-colors border border-white/20">
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="bg-white border-b border-kriya-border-gray px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-base">{s.icon}</p>
              <p className="text-sm font-black text-kriya-saffron leading-none">{s.value}</p>
              <p className="text-2xs text-kriya-warm-gray mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="px-4 py-5 space-y-6">
        {/* ── Quick Actions ── */}
        <section>
          <h2 className="kriya-section-title mb-3">{t.quickActions}</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map(a => {
              return (
                <Link key={a.href} href={a.href}
                  className="kriya-card p-4 flex items-center gap-3 hover:shadow-card-hover active:scale-95 transition-all">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg", a.color)}>
                    {a.emoji}
                  </div>
                  <span className="text-sm font-semibold text-kriya-indigo-dark leading-snug">{a.label}</span>
                  <ChevronRight className="w-4 h-4 text-kriya-warm-gray ml-auto flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Action of the day ── */}
        <section className="bg-kriya-saffron-gradient rounded-2xl p-4 text-white">
          <div className="flex items-start gap-3">
            <div className="text-3xl">⚡</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white/75 uppercase tracking-wider mb-1">Action of the Day</p>
              <p className="font-bold text-base leading-snug">PM-KISAN 17th instalment expected soon</p>
              <p className="text-sm text-white/80 mt-1">Complete your e-KYC now to ensure you receive your ₹2,000 payment.</p>
              <a href="https://pmkisan.gov.in/ekyc.aspx" target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 bg-white text-kriya-saffron-dark text-sm font-bold rounded-xl px-4 py-2 hover:bg-kriya-saffron-light transition-colors">
                Complete e-KYC <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Category filter ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="kriya-section-title">{t.popularSchemes}</h2>
            <Link href="/schemes" className="text-xs font-semibold text-kriya-saffron flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1">
            {SCHEME_CATEGORIES.map(cat => (
              <button key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                  activeCategory === cat.key
                    ? "bg-kriya-saffron text-white shadow-sm"
                    : "bg-white border border-kriya-border-gray text-kriya-warm-gray hover:border-kriya-saffron"
                )}>
                <span>{cat.icon}</span>
                <span>{lang === "hi" ? cat.labelHi : cat.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Scheme cards */}
          <div className="mt-4 space-y-3">
            {displayedSchemes.length === 0 ? (
              <div className="kriya-card p-8 text-center">
                <p className="text-2xl mb-2">🔍</p>
                <p className="text-sm text-kriya-warm-gray">No schemes found for &quot;{searchQuery}&quot;</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="mt-2 text-xs text-kriya-saffron underline">Clear search</button>
              </div>
            ) : (
              displayedSchemes.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} eligibilityStatus="unknown" />
              ))
            )}
          </div>
        </section>

        {/* ── Trust indicators ── */}
        <section className="kriya-card p-4 space-y-3">
          <h2 className="kriya-section-title">Why Trust Kriya?</h2>
          <div className="space-y-2.5">
            {[
              { icon: "🛡️", title: "Verified Information", desc: "All scheme data sourced from official government portals (GOI, NIC, Ministry websites)" },
              { icon: "🔒", title: "No Login Required", desc: "Browse all schemes and check eligibility anonymously. No account, no OTP." },
              { icon: "📡", title: "Offline Support", desc: "Core scheme information available offline. No internet needed for basic queries." },
              { icon: "🌐", title: "10 Indian Languages", desc: "Hindi, Marathi, Telugu, Tamil, Bengali, Kannada, Gujarati, Malayalam, Punjabi + English" },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-kriya-indigo-dark">{item.title}</p>
                  <p className="text-xs text-kriya-warm-gray mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Helpline strip ── */}
        <section className="bg-kriya-green-light rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-kriya-green flex items-center justify-center flex-shrink-0">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-kriya-green-dark">Government Helplines</p>
            <div className="mt-1 space-y-0.5">
              <p className="text-xs text-kriya-warm-gray"><strong>PM-KISAN:</strong> 155261</p>
              <p className="text-xs text-kriya-warm-gray"><strong>Ayushman Bharat:</strong> 14555</p>
              <p className="text-xs text-kriya-warm-gray"><strong>DARPG Grievance:</strong> 1800-11-1555</p>
            </div>
          </div>
          <Link href="/helplines" className="kriya-btn-green text-xs py-2 px-3 whitespace-nowrap">
            All Lines
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="text-2xs text-center text-kriya-warm-gray leading-relaxed">{t.disclaimer}</p>
      </div>
    </div>
  );
}
