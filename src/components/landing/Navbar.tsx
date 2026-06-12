"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 bg-transparent">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full shadow-lg shadow-black/5"
      >
        <div className="flex items-center gap-3 pr-4 border-r border-black/5">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white text-xs">C</div>
          <span className="text-sm font-bold tracking-tight text-black">CarbonIQ</span>
        </div>

        <div className="hidden md:flex items-center gap-1 px-4">
          <Link href="#features" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-black transition-colors rounded-full hover:bg-slate-50">Features</Link>
          <Link href="#demo" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-black transition-colors rounded-full hover:bg-slate-50">Intelligence</Link>
          <Link href="#passport" className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-black transition-colors rounded-full hover:bg-slate-50">Passport</Link>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-black/5">
          <Link href="/login" className="px-4 py-2 text-sm font-bold text-[#86868B] hover:text-black transition-colors">
            Login
          </Link>
          <Link href="/register">
            <Button className="rounded-full bg-black hover:bg-zinc-800 text-white border-none px-6 h-10 font-bold text-xs uppercase tracking-widest">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.nav>
    </header>
  );
}

