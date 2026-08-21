"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface Action {
  label: string;
  href: string;
  external?: boolean;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: Action[];
  suggestions?: string[];
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  "⚡ Tell me about Torkk",
  "🚀 What is BlackOriginX?",
  "💼 How to invest or partner?",
  "✉️ Contact details & location",
  "🔒 Privacy & security policy",
];

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Welcome to **BlackOriginX**! 👋\n\nI am your AI Assistant. How can I help you explore our smart mobility solutions and technology platforms today?",
  suggestions: INITIAL_SUGGESTIONS,
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

const STORAGE_KEY = "blackoriginx_chat_history";
const SOUND_STORAGE_KEY = "blackoriginx_chat_sound_enabled";

// Helper for Web Audio API sound effects
function playSynthAudio(type: "send" | "receive") {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "send") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch {
    // Ignore audio context errors if blocked by browser policy
  }
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history & settings from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setUnreadCount(0);
        }
      }

      const savedSound = localStorage.getItem(SOUND_STORAGE_KEY);
      if (savedSound !== null) {
        setSoundEnabled(savedSound === "true");
      }
    } catch (e) {
      console.warn("Could not load chat history from localStorage", e);
    }
  }, []);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (e) {
      console.warn("Could not save chat history", e);
    }
  }, [messages]);

  const scrollToBottom = useCallback((smooth = true) => {
    chatEndRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  }, []);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollBtn(isUp);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, scrollToBottom]);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    localStorage.setItem(SOUND_STORAGE_KEY, String(nextState));
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    if (soundEnabled) playSynthAudio("send");

    const userTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
      timestamp: userTimestamp,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      const assistantTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "I am here to help you navigate BlackOriginX.",
        actions: data.actions,
        suggestions: data.suggestions,
        timestamp: assistantTimestamp,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (soundEnabled) playSynthAudio("receive");
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I am having trouble connecting right now. Please try again shortly!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollToBottom(true), 100);
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([GREETING_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Rich markdown & list formatting parser
  const renderFormattedContent = (content: string, isAssistant: boolean) => {
    const lines = content.split("\n");
    return lines.map((line, lIdx) => {
      const trimmedLine = line.trim();

      // Heading 1 or 2
      if (trimmedLine.startsWith("### ") || trimmedLine.startsWith("## ") || trimmedLine.startsWith("# ")) {
        const titleText = trimmedLine.replace(/^#+\s*/, "");
        return (
          <h4
            key={lIdx}
            className={`font-bold my-1 text-xs md:text-sm ${
              isAssistant ? "text-[#b87333] dark:text-[#e5a93c]" : "text-white"
            }`}
          >
            {titleText}
          </h4>
        );
      }

      // Bullet Point
      const isBullet = trimmedLine.startsWith("• ") || trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ");
      const lineContent = isBullet ? trimmedLine.slice(2) : line;

      // Parse bold **text**, `code`, and markdown links [label](url)
      const parts = lineContent.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

      return (
        <span
          key={lIdx}
          className={`block min-h-[1.2rem] ${isBullet ? "pl-3 relative my-0.5" : "my-0.5"}`}
        >
          {isBullet && (
            <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[#e5a93c] inline-block" />
          )}

          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong
                  key={pIdx}
                  className={isAssistant ? "font-semibold text-[#111111] dark:text-white" : "font-bold text-white"}
                >
                  {part.slice(2, -2)}
                </strong>
              );
            }

            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={pIdx}
                  className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[11px] font-mono text-[#b87333] dark:text-[#e5a93c]"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }

            const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
            if (linkMatch) {
              const [, label, href] = linkMatch;
              const isExternal = href.startsWith("http");
              return (
                <a
                  key={pIdx}
                  href={href}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="font-semibold underline text-[#b87333] dark:text-[#e5a93c] hover:opacity-80 transition-opacity inline-flex items-center gap-1 mx-0.5"
                >
                  {label} {isExternal && <ExternalLink size={11} className="inline" />}
                </a>
              );
            }

            return part;
          })}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9, filter: "blur(8px)", transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 18, scale: 0.92, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="chatbot-window pointer-events-auto w-[92vw] sm:w-[420px] h-[600px] max-h-[82vh] rounded-3xl flex flex-col overflow-hidden mb-4 relative shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-[#b87333]/25 backdrop-blur-xl"
          >
            {/* Ambient Background Glow Particles */}
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#e5a93c]/20 to-transparent blur-3xl pointer-events-none"
            />
            <motion.div
              animate={{ opacity: [0.1, 0.25, 0.1], scale: [1.1, 0.9, 1.1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-0 left-0 w-80 h-80 bg-radial from-[#b87333]/20 to-transparent blur-3xl pointer-events-none"
            />

            {/* Chat Header */}
            <div className="chatbot-header relative z-10 px-5 py-3.5 flex items-center justify-between border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] p-[1.5px] shadow-lg">
                    <div className="w-full h-full bg-[#18181b] rounded-[14px] flex items-center justify-center text-[#e5a93c]">
                      <Bot size={20} />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#18181b] shadow-sm animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="chatbot-title font-bold text-sm tracking-tight">BlackOriginX AI</h3>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-medium bg-[#b87333]/20 text-[#e5a93c] border border-[#b87333]/30">
                      v2.0
                    </span>
                  </div>
                  <p className="chatbot-subtitle text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Online • Instant Support
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={toggleSound}
                  title={soundEnabled ? "Mute audio chimes" : "Enable audio chimes"}
                  aria-label="Toggle Sound"
                  className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  {soundEnabled ? <Volume2 size={16} className="text-[#e5a93c]" /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={handleReset}
                  title="Clear Chat History"
                  aria-label="Clear Chat History"
                  className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Chat (Esc)"
                  aria-label="Close Chat"
                  className="p-2 rounded-xl text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Action Shortcuts Bar */}
            <div className="relative z-10 px-4 py-2 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
              <span className="text-gray-400 font-medium whitespace-nowrap flex items-center gap-1">
                <Sparkles size={12} className="text-[#e5a93c]" /> Prompts:
              </span>
              <button
                onClick={() => handleSend("⚡ Tell me about Torkk")}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#b87333]/15 hover:bg-[#b87333]/30 text-[#b87333] dark:text-[#e5a93c] font-medium transition-colors border border-[#b87333]/30"
              >
                ⚡ Torkk Mobility
              </button>
              <button
                onClick={() => handleSend("🚀 What is BlackOriginX?")}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium transition-colors"
              >
                🚀 About Us
              </button>
              <button
                onClick={() => handleSend("💼 How to invest or partner?")}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium transition-colors"
              >
                💼 Investors
              </button>
              <button
                onClick={() => handleSend("✉️ Contact details & location")}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-medium transition-colors"
              >
                ✉️ Contact
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="relative z-10 flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin"
            >
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-xl bg-[#b87333]/20 border border-[#b87333]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0 mt-1 shadow-sm">
                        <Bot size={15} />
                      </div>
                    )}

                    <div className={`max-w-[86%] flex flex-col ${isAssistant ? "items-start" : "items-end"}`}>
                      <div
                        className={`group relative p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                          isAssistant
                            ? "chatbot-msg-bot rounded-tl-sm shadow-sm border border-black/5 dark:border-white/10"
                            : "chatbot-msg-user rounded-tr-sm font-medium shadow-md"
                        }`}
                      >
                        {renderFormattedContent(msg.content, isAssistant)}

                        {/* Action buttons embedded in response */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-black/10 dark:border-white/10">
                            {msg.actions.map((act, idx) => (
                              <ButtonAction key={idx} action={act} />
                            ))}
                          </div>
                        )}

                        {/* Copy Button for Assistant */}
                        {isAssistant && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white transition-all bg-black/5 dark:bg-black/40"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? (
                              <Check size={13} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        )}
                      </div>

                      <span className="chatbot-timestamp text-[10px] mt-1 px-1">{msg.timestamp}</span>

                      {/* Prompt Suggestions */}
                      {isAssistant && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleSend(sug)}
                              className="chatbot-chip text-[11px] px-2.5 py-1 rounded-full font-medium transition-all duration-150 text-left shadow-sm"
                            >
                              {sug}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>

                    {!isAssistant && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                        <User size={14} />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex gap-3 items-center"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#b87333]/20 border border-[#b87333]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0">
                    <Bot size={15} />
                  </div>
                  <div className="chatbot-msg-bot px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-bounce [animation-delay:0.3s]" />
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Scroll To Bottom Button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  onClick={() => scrollToBottom(true)}
                  className="absolute bottom-16 right-6 z-20 w-8 h-8 rounded-full bg-[#b87333] text-white flex items-center justify-center shadow-lg hover:bg-[#e5a93c] transition-colors"
                >
                  <ChevronDown size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Input Box */}
            <div className="relative z-10 p-3.5 border-t border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/[0.02]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="chatbot-input-container flex items-center gap-2 rounded-2xl px-3 py-1.5 transition-colors border border-black/10 dark:border-white/10"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about BlackOriginX or Torkk..."
                  className="chatbot-input-field flex-1 bg-transparent text-xs md:text-sm focus:outline-none py-2 px-1"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-white shadow-md transition-all"
                >
                  <Send size={14} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        animate={{ y: isOpen ? 0 : [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        className="relative pointer-events-auto"
      >
        {/* Pulsing Outer Aura when closed */}
        {!isOpen && (
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] blur-lg pointer-events-none"
          />
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Close Chat (Esc)" : "Open Chat Assistant"}
          aria-label={isOpen ? "Close Chat Assistant" : "Open Chat Assistant"}
          className="relative group w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#b87333] via-[#e5a93c] to-[#b87333] p-[2px] shadow-[0_10px_35px_rgba(184,115,51,0.45)] hover:shadow-[0_15px_40px_rgba(229,169,60,0.6)] transition-all duration-300"
        >
          <div className="w-full h-full bg-[#18181b] group-hover:bg-[#121214] rounded-[14px] flex items-center justify-center text-[#e5a93c] group-hover:text-white transition-colors relative z-10 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: isOpen ? -120 : 120, scale: 0.4, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: isOpen ? 120 : -120, scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex items-center justify-center"
              >
                {isOpen ? (
                  <X size={22} className="text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all duration-150" />
                ) : (
                  <MessageSquare size={22} className="text-[#e5a93c] group-hover:text-white group-hover:scale-110 transition-all duration-150" />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Ambient Glow behind button */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] opacity-30 blur-md pointer-events-none group-hover:opacity-60 transition-opacity" />
          )}

          {/* Unread Counter Badge with Spring & Pulse */}
          {!isOpen && unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="absolute -top-1.5 -right-1.5 z-20"
            >
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
              <span className="relative w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-[#18181b] shadow-lg">
                {unreadCount}
              </span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}

function ButtonAction({ action }: { action: Action }) {
  const isMailto = action.href.startsWith("mailto:");
  const isExternal = action.external || isMailto || action.href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={action.href}
        target={isMailto ? "_self" : "_blank"}
        rel={isMailto ? undefined : "noopener noreferrer"}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#b87333]/20 hover:bg-[#b87333]/35 text-[#b87333] dark:text-[#e5a93c] border border-[#b87333]/40 transition-colors shadow-sm"
      >
        {isMailto && <Mail size={12} />}
        {action.label} {!isMailto && <ExternalLink size={12} />}
      </a>
    );
  }

  return (
    <Link
      href={action.href}
      className="chatbot-action-btn-internal inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shadow-sm"
    >
      {action.label} <ArrowRight size={12} />
    </Link>
  );
}

