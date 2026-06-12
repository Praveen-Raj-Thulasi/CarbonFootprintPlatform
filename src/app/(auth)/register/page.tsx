"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { registerUser } from "@/app/actions/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-6">
      <Link href="/" className="fixed top-12 left-12 flex items-center gap-2 text-sm font-bold text-[#86868B] hover:text-black transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to product
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px]"
      >
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
             <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-[#1D1D1F] tracking-tight mb-3">Join CarbonIQ.</h1>
          <p className="text-[#86868B] font-medium text-lg">Start building your climate future.</p>
        </div>

        <Card className="p-10 rounded-[2.5rem] bg-white border-none shadow-2xl shadow-black/5">
          <form action={async (formData) => { await registerUser(formData); }} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#86868B] uppercase tracking-widest px-1">Full name</label>
                <Input 
                  name="name"
                  placeholder="Alex Rivet" 
                  className="h-14 rounded-2xl bg-slate-50 border-none px-6 text-lg font-medium focus-visible:ring-2 focus-visible:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#86868B] uppercase tracking-widest px-1">Email address</label>
                <Input 
                  name="email"
                  type="email" 
                  required
                  placeholder="alex@example.com" 
                  className="h-14 rounded-2xl bg-slate-50 border-none px-6 text-lg font-medium focus-visible:ring-2 focus-visible:ring-black"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#86868B] uppercase tracking-widest px-1">Password</label>
                <Input 
                  name="password"
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="h-14 rounded-2xl bg-slate-50 border-none px-6 text-lg font-medium focus-visible:ring-2 focus-visible:ring-black"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-16 rounded-2xl bg-black hover:bg-zinc-800 text-white font-bold text-lg mt-4 shadow-xl shadow-black/10">
              Create account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-center text-sm font-medium text-[#86868B] pt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-bold hover:underline">Sign in</Link>
            </p>
          </form>
        </Card>

        <div className="mt-12 text-center text-xs font-bold text-[#86868B] uppercase tracking-[0.2em] opacity-50">
          CarbonIQ • Privacy Policy • Terms
        </div>
      </motion.div>
    </div>
  );
}
