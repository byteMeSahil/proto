"use client";
import { useState } from "react";
import { Search, Bell, Globe, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useRouter } from "next/navigation";

const NOTIFICATIONS = [
  { id: 1, title: "New Gram Sabha scheduled", time: "2 hrs ago", unread: true },
  { id: 2, title: "PM-KISAN instalment released", time: "5 hrs ago", unread: true },
  { id: 3, title: "Grievance #GRV-001 resolved", time: "1 day ago", unread: false },
];

export default function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <header
      className="fixed top-0 right-0 z-20 bg-surface-card border-b border-surface-border flex items-center gap-4 px-6"
      style={{ left: "var(--sidebar-width)", height: "var(--header-height)" }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && query.trim()) { router.push(`/schemes?q=${encodeURIComponent(query.trim())}`); } }}
          placeholder="Search for services, schemes, documents…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-surface-border bg-surface-muted text-sm text-text-primary placeholder:text-text-light focus:outline-none focus:border-brand-green focus:bg-white transition-colors"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X className="w-3.5 h-3.5 text-text-light hover:text-text-primary" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Language */}
        <div className="relative">
          <button className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors">
            <Globe className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(o => !o)}
            className="relative p-2 rounded-xl hover:bg-surface-muted text-text-muted hover:text-text-primary transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-orange text-white text-2xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-full mt-2 w-72 card shadow-card-md z-50 animate-fade-in overflow-hidden">
              <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between">
                <p className="text-sm font-bold text-text-primary">Notifications</p>
                <button onClick={() => setShowNotif(false)}><X className="w-4 h-4 text-text-light" /></button>
              </div>
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className={cn("px-4 py-3 border-b border-surface-border last:border-0 flex items-start gap-3", n.unread && "bg-brand-green/5")}>
                  {n.unread && <div className="w-2 h-2 rounded-full bg-brand-green mt-1.5 flex-shrink-0" />}
                  {!n.unread && <div className="w-2 h-2 flex-shrink-0" />}
                  <div>
                    <p className="text-sm text-text-primary font-medium">{n.title}</p>
                    <p className="text-xs text-text-light mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl hover:bg-surface-muted transition-colors border border-surface-border ml-1">
          <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>
          <div className="text-left">
            <p className="text-xs font-bold text-text-primary leading-none">Sarpanch</p>
            <p className="text-2xs text-text-muted mt-0.5">Lokmanya Village</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-text-light ml-1" />
        </button>
      </div>
    </header>
  );
}
