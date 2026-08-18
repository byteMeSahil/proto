export type LangCode = "en" | "hi" | "mr" | "te" | "ta" | "bn" | "kn" | "gu" | "ml" | "pa";

export interface Language {
  code: LangCode;
  name: string;        // English name
  nativeName: string;  // Name in the language itself
  script: string;
  flag: string;
  dir: "ltr" | "rtl";
  fontClass: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English",    nativeName: "English",    script: "Latin",      flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
  { code: "hi", name: "Hindi",      nativeName: "हिन्दी",       script: "Devanagari", flag: "🇮🇳", dir: "ltr", fontClass: "font-devanagari" },
  { code: "mr", name: "Marathi",    nativeName: "मराठी",        script: "Devanagari", flag: "🇮🇳", dir: "ltr", fontClass: "font-devanagari" },
  { code: "te", name: "Telugu",     nativeName: "తెలుగు",        script: "Telugu",     flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
  { code: "ta", name: "Tamil",      nativeName: "தமிழ்",         script: "Tamil",      flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
  { code: "bn", name: "Bengali",    nativeName: "বাংলা",         script: "Bengali",    flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
  { code: "kn", name: "Kannada",    nativeName: "ಕನ್ನಡ",         script: "Kannada",    flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
  { code: "gu", name: "Gujarati",   nativeName: "ગુજરાતી",       script: "Gujarati",   flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
  { code: "ml", name: "Malayalam",  nativeName: "മലയാളം",        script: "Malayalam",  flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
  { code: "pa", name: "Punjabi",    nativeName: "ਪੰਜਾਬੀ",        script: "Gurmukhi",   flag: "🇮🇳", dir: "ltr", fontClass: "font-sans" },
];

export const DEFAULT_LANG: LangCode = "en";
