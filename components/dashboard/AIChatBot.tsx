"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────
interface SpeechRecognitionResult {
  [index: number]: { transcript: string; confidence: number };
  isFinal: boolean;
  length: number;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResult[];
  resultIndex: number;
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: Event) => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

// ── Data ──────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  time: string;
}

const SUGGESTIONS = [
  "How to apply for PM Kisan?",
  "Check my ration card status",
  "Documents required for caste certificate",
  "Eligibility for Ayushman Bharat",
];

const BOT_RESPONSES: Record<string, string> = {
  default: "I can help you with government schemes, eligibility checks, document requirements, and application processes. What would you like to know?",
  "pm kisan": "PM-KISAN gives ₹6,000/year to small & marginal farmers in 3 instalments of ₹2,000. You need: Aadhaar, land records, and a linked bank account. Register at pmkisan.gov.in or your nearest CSC.",
  "ration": "To check your ration card status, visit your state's Food & Civil Supplies portal or call the PDS helpline 14445. You can also check at your nearest Fair Price Shop.",
  "caste certificate": "For a caste certificate you need: Aadhaar card, birth certificate, parent's caste certificate, and a self-declaration form. Apply at your Tehsil office or online via your state portal.",
  "ayushman": "Ayushman Bharat PMJAY provides ₹5 lakh/year health cover. Check eligibility by SMSing 'PMJAY' to 56167 or visit pmjay.gov.in. Get your Ayushman Card at any empanelled hospital or CSC.",
  "pmay": "PMAY-Gramin gives ₹1.20–1.30 lakh for rural house construction. Check if your name is in SECC 2011 list at your Gram Panchayat, then apply at pmayg.nic.in.",
  "nrega": "MGNREGS guarantees 100 days of wage employment to rural households. Register at your Gram Panchayat with Aadhaar and a bank account to get a job card.",
  "scheme": "There are 10+ major central government schemes available. Use the Schemes section to browse by category, or tell me what kind of help you need (farming, housing, health, etc.).",
};

function getBotResponse(query: string): string {
  const q = query.toLowerCase();
  for (const [key, response] of Object.entries(BOT_RESPONSES)) {
    if (key !== "default" && q.includes(key)) return response;
  }
  return BOT_RESPONSES.default;
}

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function getSR(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// ── Component ──────────────────────────────────────────
export default function AIChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "bot", text: "🙏 Namaste! How can I help you today?", time: nowTime() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [sttSupported, setSttSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSttSupported(!!getSR());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", text: trimmed, time: nowTime() }]);
    setInput("");
    setTyping(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "bot", text: getBotResponse(trimmed), time: nowTime() }]);
    setTyping(false);
  }, []);

  const startListening = useCallback(() => {
    const SR = getSR();
    if (!SR) return;
    const rec = new SR();
    rec.lang = "hi-IN";
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.onstart = () => setListening(true);
    rec.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "", final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t; else interim += t;
      }
      setInput(final || interim);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  return (
    <div className="card flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border flex-shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-green to-brand-green-light flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary">AI Chat Bot</p>
          <p className="text-xs text-text-muted">Your intelligent assistant for village services</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-brand-green font-medium">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex gap-2", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
              msg.role === "bot" ? "bg-brand-green" : "bg-brand-orange")}>
              {msg.role === "bot" ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
            </div>
            <div className={cn("max-w-[80%] rounded-2xl px-3.5 py-2.5",
              msg.role === "bot" ? "bg-surface-muted text-text-primary rounded-tl-sm" : "bg-brand-green text-white rounded-tr-sm")}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className={cn("text-2xs mt-1", msg.role === "bot" ? "text-text-light" : "text-white/60")}>{msg.time}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="bg-surface-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => sendMessage(s)}
              className="text-xs text-brand-green bg-brand-green/10 hover:bg-brand-green hover:text-white rounded-full px-3 py-1.5 transition-colors font-medium">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-3 pb-3 flex-shrink-0">
        <div className={cn("flex items-center gap-2 rounded-xl border-2 bg-white px-3 py-2 transition-colors",
          listening ? "border-brand-green shadow-[0_0_0_3px_rgba(45,106,79,0.12)]" : "border-surface-border focus-within:border-brand-green")}>
          {listening && (
            <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
              {[1,2,3,4].map(i => <div key={i} className="voice-bar h-4" style={{ animationDelay: `${(i-1)*0.15}s` }} />)}
            </div>
          )}
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder={listening ? "Listening…" : "Type your question…"}
            className={cn("flex-1 text-sm bg-transparent outline-none text-text-primary placeholder:text-text-light",
              listening && "italic text-brand-green")} />
          {sttSupported && (
            <button onClick={() => listening ? stopListening() : startListening()}
              className={cn("flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all",
                listening ? "bg-brand-green text-white animate-pulse" : "text-text-muted hover:text-brand-green hover:bg-brand-green/10")}>
              {listening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>
          )}
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || typing}
            className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-green text-white flex items-center justify-center hover:bg-brand-green-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {typing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
