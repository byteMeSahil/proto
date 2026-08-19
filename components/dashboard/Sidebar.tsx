"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Bot, BookOpen, FileText, Landmark,
  Users, AlertCircle, UserCircle, Settings, TreePine
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/",           icon: LayoutDashboard, label: "Dashboard",          sub: null },
  { href: "/chat",       icon: Bot,             label: "AI Chat Bot",        sub: "Ask anything about services" },
  { href: "/schemes",    icon: BookOpen,        label: "Schemes",            sub: "All Government Schemes" },
  { href: "/documents",  icon: FileText,        label: "Documents",          sub: "Certificates & Records" },
  { href: "/projects",   icon: Landmark,        label: "Village Development",sub: "Ongoing Projects" },
  { href: "/gramsabha",  icon: Users,           label: "Gram Sabha",         sub: "Meetings & Activities" },
  { href: "/grievance",  icon: AlertCircle,     label: "Grievances",         sub: "Complaints & Tracking" },
];

const BOTTOM_NAV = [
  { href: "/profile",  icon: UserCircle, label: "Village Profile", sub: null },
  { href: "/settings", icon: Settings,   label: "Settings",        sub: null },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-30 overflow-hidden"
      style={{ width: "var(--sidebar-width)", background: "#1B4332" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-brand-orange flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-lg">K</span>
        </div>
        <div>
          <p className="text-white font-black text-base leading-none tracking-tight">Kriya</p>
          <p className="text-white/55 text-xs mt-0.5">हमारा गाँव, हमारा संगम</p>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label, sub }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href}
              className={cn("nav-item group", active && "nav-item-active")}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-white" : "text-white/60 group-hover:text-white")} />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-semibold leading-none", active ? "text-white" : "text-white/80 group-hover:text-white")}>
                  {label}
                </p>
                {sub && (
                  <p className="text-white/45 text-2xs mt-0.5 truncate group-hover:text-white/60">{sub}</p>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-white/10 py-3 space-y-0.5">
        {BOTTOM_NAV.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className={cn("nav-item group", isActive(href) && "nav-item-active")}
          >
            <Icon className="w-4 h-4 flex-shrink-0 text-white/60 group-hover:text-white" />
            <p className="text-sm font-semibold text-white/80 group-hover:text-white">{label}</p>
          </Link>
        ))}
      </div>

      {/* Footer card */}
      <div className="mx-3 mb-3 rounded-2xl overflow-hidden" style={{ background: "#163829" }}>
        <div className="px-4 py-3">
          <TreePine className="w-8 h-8 text-brand-green-light mb-2" />
          <p className="text-white font-bold text-sm leading-snug">Building a Stronger Tomorrow, Together</p>
        </div>
      </div>
    </aside>
  );
}
