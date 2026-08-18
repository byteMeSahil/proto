"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("[Kriya] Service Worker registered"))
        .catch((e) => console.error("[Kriya] SW registration failed:", e));
    }
  }, []);
  return null;
}
