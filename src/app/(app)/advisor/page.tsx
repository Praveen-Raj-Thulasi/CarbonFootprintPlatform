"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { chatWithAI } from "@/app/actions/ai";

type Message = {
  role: "user" | "model";
  content: string;
};

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Hello Alex. I'm your CarbonIQ Climate Advisor. Looking at your current path, I can see a few ways we could lower your 5-year trajectory. What would you like to explore first?" }
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await chatWithAI([...messages, userMessage]);
    
    setMessages(prev => [...prev, { role: "model", content: response }]);
    setLoading(false);
  };

  const prompts = [
    "Reduce my footprint by 20%",
    "How sustainable am I?",
    "What's my biggest carbon problem?"
  ];

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-200px)]">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#1D1D1F] tracking-tight mb-4">Climate Intelligence.</h1>
        <p className="text-lg text-[#86868B] font-medium">Ask anything about your climate twin and your future impact.</p>
      </div>

      <div className="flex-1 space-y-12 mb-32">
        <AnimatePresence mode="popLayout">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-start gap-6 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                m.role === "user" ? "bg-slate-100" : "bg-black"
              }`}>
                {m.role === "user" ? <User className="w-5 h-4 text-slate-500" /> : <Sparkles className="w-5 h-4 text-white hover:animate-pulse" />}
              </div>
              <div className={`max-w-[85%] ${m.role === "user" ? "text-right" : "text-left"}`}>
                <p className={`text-xl font-medium leading-relaxed ${
                  m.role === "user" ? "text-black" : "text-[#1D1D1F]"
                }`}>{m.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center shrink-0">
               <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="fixed bottom-12 left-0 right-0 px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-2 rounded-[2rem] bg-white border border-black/5 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message CarbonIQ..."
                className="flex-1 bg-transparent border-none focus-visible:ring-0 text-lg font-medium px-6 h-14"
              />
              <Button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-12 h-12 rounded-full bg-black hover:bg-zinc-800 text-white shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
              {prompts.map((p) => (
                <button
                  key={p}
                  onClick={() => setInput(p)}
                  className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-50 border border-black/5 text-[#86868B] text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

