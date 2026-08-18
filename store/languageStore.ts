"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LangCode } from "@/lib/i18n/languages";
import { getT, type Translations } from "@/lib/i18n/translations";

interface LanguageState {
  lang: LangCode;
  t: Translations;
  setLang: (lang: LangCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      t: getT("en"),
      setLang: (lang) => set({ lang, t: getT(lang) }),
    }),
    { name: "kriya-lang" }
  )
);
