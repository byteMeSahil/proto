import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "Kriya – Rural Citizen Governance Dashboard",
  description: "India's governance platform for rural citizens. Find schemes, check eligibility, track applications, file grievances in 10 languages.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Kriya" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B4332",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ServiceWorkerRegistrar />
        <Sidebar />
        <div style={{ marginLeft: "var(--sidebar-width)" }}>
          <Header />
          <main
            style={{ paddingTop: "var(--header-height)" }}
            className="min-h-screen bg-surface-bg"
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
