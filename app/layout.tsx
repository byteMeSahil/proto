import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav, BottomNav } from "@/components/Navbar";
import OfflineBanner from "@/components/OfflineBanner";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kriya – Your Government, Your Rights",
  description: "India's mobile-first rural citizen governance app. Find government schemes, check eligibility, track applications, and file grievances in 10 Indian languages.",
  keywords: "government schemes, PM-KISAN, PMAY, Ayushman Bharat, rural India, Panchayat, eligibility checker",
  authors: [{ name: "Kriya Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kriya",
  },
  openGraph: {
    title: "Kriya – Your Government, Your Rights",
    description: "Find government schemes you qualify for. Check eligibility, track applications, file grievances.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#2D3A8C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;500;600;700&family=Noto+Sans+Kannada:wght@400;500;600;700&family=Noto+Sans+Malayalam:wght@400;500;600;700&family=Noto+Sans+Gujarati:wght@400;500;600;700&family=Noto+Sans+Gurmukhi:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} antialiased bg-kriya-cream`}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ServiceWorkerRegistrar />
        <OfflineBanner />
        <TopNav />
        <main
          id="main-content"
          className="min-h-screen page-content"
          style={{ paddingTop: "var(--nav-height)" }}
        >
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
