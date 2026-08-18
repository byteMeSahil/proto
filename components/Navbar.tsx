"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, MapPin, MessageSquare, Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguageStore } from "@/store/languageStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/",          icon: Home,           key: "home" },
  { href: "/schemes",   icon: BookOpen,       key: "schemes" },
  { href: "/track",     icon: MapPin,         key: "track" },
  { href: "/grievance", icon: MessageSquare,  key: "grievance" },
];

export function TopNav() {
  const { t } = useLanguageStore();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-kriya-indigo shadow-md" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center justify-between h-full px-4 max-w-2xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-kriya-saffron flex items-center justify-center">
              <span className="text-white font-black text-base">K</span>
            </div>
            <div>
              <p className="text-white font-black text-lg leading-none tracking-tight">{t.appName}</p>
              <p className="text-white/60 text-2xs leading-none">{t.tagline}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <button onClick={() => setMobileOpen(o => !o)} className="sm:hidden text-white/80 hover:text-white p-1">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="fixed top-[64px] left-0 right-0 z-30 bg-kriya-indigo-dark border-t border-white/10 shadow-xl animate-slide-down sm:hidden">
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const label = t[item.key as keyof typeof t] as string;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn("flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors",
                  active ? "text-kriya-saffron bg-white/5" : "text-white/80 hover:text-white hover:bg-white/5"
                )}>
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export function BottomNav() {
  const { t } = useLanguageStore();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-kriya-border-gray bottom-nav safe-bottom">
      <div className="flex items-stretch max-w-2xl mx-auto h-[68px]">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const label = t[item.key as keyof typeof t] as string;
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 transition-colors text-center",
                active ? "text-kriya-saffron" : "text-kriya-warm-gray hover:text-kriya-indigo"
              )}>
              <div className={cn("rounded-xl p-1.5 transition-colors", active && "bg-kriya-saffron-light")}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-2xs font-semibold leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
