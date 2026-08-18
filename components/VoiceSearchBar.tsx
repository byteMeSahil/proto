"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff, Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/languageStore";
import { useRouter } from "next/navigation";

type ListenState = "idle" | "listening" | "processing" | "error";

// Web Speech API type declarations
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}
interface SpeechRecognition extends EventTarget {
  lang: string; continuous: boolean; interimResults: boolean; maxAlternatives: number;
  start(): void; stop(): void; abort(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}
interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
  length: number;
}
interface SpeechRecognitionAlternative {
  transcript: string; confidence: number;
}
interface SpeechRecognitionErrorEvent extends Event { error: string; }

const LANG_BCP47: Record<string, string> = {
  en: "en-IN", hi: "hi-IN", mr: "mr-IN", te: "te-IN",
  ta: "ta-IN", bn: "bn-IN", kn: "kn-IN", gu: "gu-IN", ml: "ml-IN", pa: "pa-IN",
};

interface Props {
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
  large?: boolean;
}

export default function VoiceSearchBar({ onSearch, autoFocus = false, large = false }: Props) {
  const { lang, t } = useLanguageStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [listenState, setListenState] = useState<ListenState>("idle");
  const [interimText, setInterimText] = useState("");
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    setSupported(!!SR);
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListenState("idle");
    setInterimText("");
  }, []);

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = LANG_BCP47[lang] ?? "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListenState("listening");

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      setInterimText(interim);
      if (final) { setQuery(final); setInterimText(""); }
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error !== "aborted") setListenState("error");
      setTimeout(() => setListenState("idle"), 2000);
    };

    recognition.onend = () => {
      setListenState("idle");
      setInterimText("");
    };

    recognitionRef.current = recognition;
    setListenState("listening");
    recognition.start();
  }, [lang]);

  const toggleVoice = useCallback(() => {
    if (listenState === "listening") stopListening();
    else startListening();
  }, [listenState, startListening, stopListening]);

  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    const q = query.trim();
    if (!q) return;
    if (onSearch) { onSearch(q); }
    else { router.push(`/schemes?q=${encodeURIComponent(q)}`); }
  }, [query, onSearch, router]);

  const displayText = interimText || query;
  const isListening = listenState === "listening";

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className={cn(
        "relative flex items-center gap-2 w-full",
        "bg-white rounded-2xl border-2 transition-all duration-200",
        isListening ? "border-kriya-saffron shadow-glow" : "border-kriya-border-gray focus-within:border-kriya-saffron focus-within:shadow-glow",
        large ? "px-4 py-3.5" : "px-3 py-2.5"
      )}>
        {/* Voice animation or search icon */}
        <div className="flex-shrink-0">
          {isListening ? (
            <div className="flex items-end gap-0.5 h-6">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="voice-bar h-4" style={{ animationDelay: `${(i-1)*0.12}s` }} />
              ))}
            </div>
          ) : (
            <Search className={cn("text-kriya-warm-gray", large ? "w-5 h-5" : "w-4 h-4")} />
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={displayText}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isListening ? t.listeningLabel : t.textPlaceholder}
          className={cn(
            "flex-1 bg-transparent outline-none text-kriya-indigo-dark placeholder:text-kriya-warm-gray",
            large ? "text-base" : "text-sm",
            isListening && "italic text-kriya-saffron placeholder:text-kriya-saffron"
          )}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {/* Clear button */}
        {query && !isListening && (
          <button type="button" onClick={() => setQuery("")}
            className="flex-shrink-0 text-kriya-warm-gray hover:text-kriya-indigo-dark transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Voice button */}
        {supported && (
          <button
            type="button"
            onClick={toggleVoice}
            aria-label={isListening ? "Stop listening" : t.tapToSpeak}
            className={cn(
              "flex-shrink-0 rounded-xl p-2 transition-all duration-200",
              isListening
                ? "bg-kriya-saffron text-white animate-pulse"
                : "bg-kriya-saffron-light text-kriya-saffron hover:bg-kriya-saffron hover:text-white"
            )}
          >
            {listenState === "processing" ? <Loader2 className="w-4 h-4 animate-spin" /> :
             isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        )}

        {/* Search button */}
        <button
          type="submit"
          className={cn(
            "flex-shrink-0 kriya-btn-primary py-2",
            large ? "px-5 text-sm" : "px-4 text-xs"
          )}
        >
          {t.searchBtn}
        </button>
      </div>

      {listenState === "error" && (
        <p className="mt-1 text-xs text-kriya-error text-center">
          Microphone not available. Please check permissions.
        </p>
      )}
    </form>
  );
}
