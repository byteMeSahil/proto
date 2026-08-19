"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, MicOff, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ListenState = "idle" | "listening" | "error";


function getSR(): (new () => any) | null {
  if (typeof window === "undefined") return null;
  
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

interface Props {
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

export default function VoiceSearchBar({ onSearch, autoFocus = false }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [listenState, setListenState] = useState<ListenState>("idle");
  const [interimText, setInterimText] = useState("");
  const [supported, setSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSupported(!!getSR());
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListenState("idle");
    setInterimText("");
  }, []);

  const startListening = useCallback(() => {
    const SR = getSR();
    if (!SR) return;
    const rec = new SR();
    rec.lang = "en-IN";
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart = () => setListenState("listening");
    rec.onresult = (e: { resultIndex: number; results: { [i: number]: { isFinal: boolean; [j: number]: { transcript: string } } } }) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < Object.keys(e.results).length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      setInterimText(interim);
      if (final) { setQuery(final); setInterimText(""); }
    };
    rec.onerror = (e: { error: string }) => {
      if (e.error !== "aborted") setListenState("error");
      setTimeout(() => setListenState("idle"), 2000);
    };
    rec.onend = () => { setListenState("idle"); setInterimText(""); };
    recognitionRef.current = rec;
    rec.start();
  }, []);

  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    const q = (query || interimText).trim();
    if (!q) return;
    if (onSearch) onSearch(q);
    else router.push(`/schemes?q=${encodeURIComponent(q)}`);
  }, [query, interimText, onSearch, router]);

  const isListening = listenState === "listening";
  const displayText = interimText || query;

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className={cn(
        "flex items-center gap-2 rounded-xl border-2 bg-white px-4 py-2.5 transition-all",
        isListening
          ? "border-brand-green shadow-[0_0_0_3px_rgba(45,106,79,0.12)]"
          : "border-surface-border focus-within:border-brand-green"
      )}>
        {isListening ? (
          <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
            {[1,2,3,4].map(i => (
              <div key={i} className="voice-bar h-4" style={{ animationDelay: `${(i-1)*0.15}s` }} />
            ))}
          </div>
        ) : (
          <Search className="w-4 h-4 text-text-light flex-shrink-0" />
        )}

        <input
          ref={inputRef}
          type="text"
          value={displayText}
          onChange={e => setQuery(e.target.value)}
          placeholder={isListening ? "Listening…" : "Search schemes, documents, services…"}
          className={cn(
            "flex-1 bg-transparent outline-none text-sm text-text-primary placeholder:text-text-light",
            isListening && "italic text-brand-green"
          )}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />

        {query && !isListening && (
          <button type="button" onClick={() => setQuery("")}
            className="text-text-light hover:text-text-primary transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {supported && (
          <button
            type="button"
            onClick={() => isListening ? stopListening() : startListening()}
            aria-label={isListening ? "Stop" : "Speak"}
            className={cn(
              "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
              isListening
                ? "bg-brand-green text-white animate-pulse"
                : "text-text-muted hover:text-brand-green hover:bg-brand-green/10"
            )}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        )}

        <button type="submit"
          className="flex-shrink-0 btn-primary py-1.5 px-4 text-xs">
          Search
        </button>
      </div>
      {listenState === "error" && (
        <p className="mt-1 text-xs text-red-500 text-center">
          Microphone not available — check browser permissions.
        </p>
      )}
    </form>
  );
}
