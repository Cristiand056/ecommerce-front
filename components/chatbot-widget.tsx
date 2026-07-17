"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "bot";
  text: string;
  route?: string; 
}

export function ChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "bot", 
      text: "¡Hola! Soy el asistente virtual de Distribuidora X. ¿En qué puedo ayudarte hoy?" 
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { 
          role: "bot", 
          text: data.reply || "No pude procesar tu mensaje.",
          route: data.route || undefined 
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Hubo un error de conexión. Intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border border-brand-cream-dark rounded-xl bg-brand-cream shadow-md overflow-hidden">
      <div className="bg-brand-red text-brand-cream px-4 py-3.5 font-bold flex items-center justify-between border-b border-brand-red-dark">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-gold animate-pulse" />
          <span className="tracking-wide">Asistente Virtual</span>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-red-dark text-brand-cream/80">
          En línea
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`rounded-full p-1.5 shadow-sm ${
                msg.role === "user" ? "bg-brand-cream-dark" : "bg-brand-red/10"
              }`}
            >
              {msg.role === "user" ? (
                <User className="h-4 w-4 text-brand-red" />
              ) : (
                <Bot className="h-4 w-4 text-brand-red" />
              )}
            </div>

            <div className="flex flex-col gap-1.5 max-w-[75%]">
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand-red text-brand-cream rounded-tr-none"
                    : "bg-brand-cream-dark/60 text-gray-800 border border-brand-cream-dark rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>

              {msg.role === "bot" && msg.route && (
                <Button
                  size="sm"
                  variant="outline"
                  className="self-start mt-0.5 border-brand-red text-brand-red hover:bg-brand-red hover:text-brand-cream font-medium rounded-xl text-xs gap-1 py-1 h-auto shadow-sm transition-all animate-in fade-in zoom-in-95 duration-200"
                  asChild
                >
                  <Link href={msg.route}>
                    Ir a la sección aquí
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium pl-10 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block animate-bounce delay-75"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block animate-bounce delay-150"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block animate-bounce delay-300"></span>
            Escribiendo...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-brand-cream-dark/60 bg-brand-cream p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu pregunta..."
          className="flex-1 border border-brand-cream-dark/80 rounded-full px-4 py-2 text-sm bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
        />
        <Button
          size="icon"
          className="rounded-full bg-brand-red text-brand-cream hover:bg-brand-red-dark hover:text-brand-gold transition-all duration-200 shadow-sm"
          onClick={sendMessage}
          disabled={loading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}