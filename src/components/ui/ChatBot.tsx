"use client";

import { useState, useRef, useEffect } from "react";
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
  Sparkles
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
  "🚀 What is BlackOriginX?",
  "⚡ Tell me about Torkk",
  "💼 How to invest or partner?",
  "✉️ Contact details & location"
];

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "assistant",
  content: "Welcome to **BlackOriginX**! 👋\n\nHi! How can I help you?",
  suggestions: INITIAL_SUGGESTIONS,
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

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
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([GREETING_MESSAGE]);
  };

  // Helper to format bold text & markdown links inside messages
  const renderFormattedContent = (content: string, isAssistant: boolean) => {
    const lines = content.split("\n");
    return lines.map((line, lIdx) => {
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
      return (
        <span key={lIdx} className="block min-h-[1rem]">
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong
                  key={pIdx}
                  className={isAssistant ? "font-bold text-[#111111] dark:text-white" : "font-bold text-white"}
                >
                  {part.slice(2, -2)}
                </strong>
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
                  className="font-semibold underline text-[#b87333] dark:text-[#e5a93c] hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                >
                  {label} {isExternal && <ExternalLink size={12} />}
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="chatbot-window pointer-events-auto w-[92vw] sm:w-[410px] h-[580px] max-h-[82vh] rounded-3xl flex flex-col overflow-hidden mb-4 relative shadow-2xl"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#e5a93c]/10 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#b87333]/10 to-transparent blur-3xl pointer-events-none" />

            {/* Chat Header */}
            <div className="chatbot-header relative z-10 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] p-[1.5px] shadow-lg">
                    <div className="w-full h-full bg-[#1c1c1f] rounded-[14px] flex items-center justify-center text-[#e5a93c]">
                      <Bot size={20} />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1c1c1f] shadow-sm" />
                </div>
                <div>
                  <h3 className="chatbot-title font-bold text-sm">BlackOriginX AI</h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Clear Chat"
                  className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="relative z-10 flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-xl bg-[#b87333]/20 border border-[#b87333]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0 mt-1">
                        <Bot size={15} />
                      </div>
                    )}

                    <div className={`max-w-[85%] flex flex-col ${isAssistant ? "items-start" : "items-end"}`}>
                      <div
                        className={`group relative p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${isAssistant
                            ? "chatbot-msg-bot rounded-tl-sm shadow-sm"
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
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-white transition-opacity bg-black/5 dark:bg-black/20"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                          </button>
                        )}
                      </div>

                      <span className="chatbot-timestamp text-[10px] mt-1 px-1">{msg.timestamp}</span>

                      {/* Prompt Suggestions */}
                      {isAssistant && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {msg.suggestions.map((sug, i) => (
                            <button
                              key={i}
                              onClick={() => handleSend(sug)}
                              className="chatbot-chip text-[11px] px-2.5 py-1 rounded-full font-medium transition-all duration-200 text-left"
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {!isAssistant && (
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                        <User size={14} />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 items-center">
                  <div className="w-7 h-7 rounded-xl bg-[#b87333]/20 border border-[#b87333]/40 flex items-center justify-center text-[#e5a93c] flex-shrink-0">
                    <Bot size={15} />
                  </div>
                  <div className="chatbot-msg-bot px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Box */}
            <div className="relative z-10 p-3.5 border-t border-black/10 dark:border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="chatbot-input-container flex items-center gap-2 rounded-2xl px-3 py-1.5 transition-colors"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question about BlackOriginX or Torkk..."
                  className="chatbot-input-field flex-1 bg-transparent text-xs md:text-sm focus:outline-none py-2 px-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#b87333] to-[#e5a93c] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center text-white shadow-md transition-all hover:scale-105"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button with Smooth Bobbing Motion */}
      <motion.button
        animate={
          isOpen
            ? { y: 0, rotate: 0 }
            : {
              y: [0, -8, 0],
              rotate: [0, -2, 2, 0],
            }
        }
        transition={
          isOpen
            ? { duration: 0.2 }
            : {
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            }
        }
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto relative group w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] p-[2px] shadow-[0_10px_30px_rgba(184,115,51,0.45)] transition-all duration-300"
      >
        {/* Radar Pulse Expanding Wave Ring */}
        {!isOpen && (
          <motion.span
            animate={{ scale: [1, 1.45], opacity: [0.55, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
            className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] pointer-events-none"
          />
        )}

        <div className="w-full h-full bg-[#18181b] group-hover:bg-[#141416] rounded-[14px] flex items-center justify-center text-[#e5a93c] group-hover:text-white transition-colors relative z-10">
          {isOpen ? (
            <X size={24} />
          ) : (
            <motion.div
              animate={{ rotate: [0, -14, 14, -8, 8, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 1.2 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </div>

        {/* Ambient Glow behind button */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#b87333] to-[#e5a93c] opacity-40 blur-md animate-pulse pointer-events-none group-hover:opacity-80 transition-opacity" />
        )}

        {/* Unread Counter Badge */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-[#18181b] shadow-md animate-bounce z-20">
            {unreadCount}
          </span>
        )}
      </motion.button>
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
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#b87333]/20 hover:bg-[#b87333]/35 text-[#b87333] dark:text-[#e5a93c] border border-[#b87333]/40 transition-colors"
      >
        {action.label} <ExternalLink size={12} />
      </a>
    );
  }

  return (
    <Link
      href={action.href}
      className="chatbot-action-btn-internal inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
    >
      {action.label} <ArrowRight size={12} />
    </Link>
  );
}
