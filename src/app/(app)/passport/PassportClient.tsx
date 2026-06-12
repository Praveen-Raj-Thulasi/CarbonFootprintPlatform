"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Share2, 
  CheckCircle2, 
  TreePine, 
  Zap, 
  Car, 
  Award,
  QrCode,
  ArrowRight
} from "lucide-react";

interface PassportClientProps {
  user: {
    name: string;
    email: string;
    _id?: string;
  };
  stats: any;
}

export default function PassportClient({ user, stats }: PassportClientProps) {
  // Use real data to derive some dummy-like achievements for the passport if impactMetrics is not populated
  const trees = Math.floor(stats.sustainabilityScore / 5) || 12;
  const km = Math.floor((10 - stats.currentFootprint) * 100) || 450;
  
  const achievements = [
    { icon: TreePine, label: `${trees} Trees Saved`, color: "text-emerald-500" },
    { icon: Car, label: `${km} km Avoided`, color: "text-blue-500" },
    { icon: Zap, label: "Energy Optimized", color: "text-amber-500" },
  ];

  const passportId = `CIQ • ${user._id?.toString().slice(-4).toUpperCase() || "8829"}`;

  return (
    <div className="space-y-24 pb-32">
      <div className="text-center pt-8">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1D1D1F] tracking-tight mb-6">Your identity.</h1>
        <p className="text-xl text-[#86868B] max-w-2xl mx-auto font-medium leading-relaxed">
          The CarbonIQ Passport is a verified credential of your commitment to the planet.
        </p>
      </div>

      <div className="flex flex-col items-center gap-16">
        {/* The Passport Card */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="w-full max-w-[440px]"
        >
          <Card className="aspect-[1/1.58] rounded-[3rem] bg-white border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex flex-col p-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
            
            <div className="flex justify-between items-start mb-16">
              <div>
                <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-[0.2em] mb-1">Passport</p>
                <h3 className="text-xl font-bold text-[#1D1D1F]">CarbonIQ</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                <Award className="text-emerald-500 w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col items-center mb-16">
               <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6 overflow-hidden border-4 border-white shadow-sm">
                 <div className="w-full h-full bg-cover" style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}')` }} />
               </div>
               <h2 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">{user.name}</h2>
               <div className="flex items-center gap-2 mt-2">
                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                 <span className="text-xs font-bold text-[#86868B] uppercase tracking-widest">Verified Account</span>
               </div>
            </div>

            <div className="space-y-4 mb-auto">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-black/[0.02]">
                  <div className="flex items-center gap-3">
                    <a.icon className={`w-4 h-4 ${a.color}`} />
                    <span className="text-sm font-bold text-[#1D1D1F]">{a.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-end pt-12 border-t border-slate-50">
               <div>
                  <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest mb-1">Passport ID</p>
                  <p className="text-sm font-mono font-bold text-black">{passportId}</p>
               </div>
               <div className="w-12 h-12 bg-black rounded-xl p-2">
                  <QrCode className="text-white w-full h-full" />
               </div>
            </div>
          </Card>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="rounded-full border-black/5 bg-white py-6 px-10 h-auto font-bold text-lg hover:bg-slate-50">
            <Download className="mr-2 w-5 h-5" />
            Download PDF
          </Button>
          <Button className="rounded-full bg-black text-white py-6 px-10 h-auto font-bold text-lg hover:bg-zinc-800">
            <Share2 className="mr-2 w-5 h-5" />
            Share Passport
          </Button>
        </div>
      </div>
    </div>
  );
}
