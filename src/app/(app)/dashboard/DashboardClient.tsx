"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer 
} from "recharts";
import { Sparkles, TrendingDown, ArrowRight, Leaf, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DashboardClientProps {
  user: {
    name: string;
    email: string;
  };
  stats: {
    sustainabilityScore: number;
    projectedIncrease: number;
    currentFootprint: number;
    targetFootprint: number;
    twinData: { name: string; predicted: number }[];
    topInsight?: {
      title: string;
      description: string;
      actionText: string;
      progress: number;
    };
    topRecommendation?: {
      title: string;
      description: string;
    };
  };
}

export default function DashboardClient({ user, stats }: DashboardClientProps) {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Insight Section */}
      <section className="text-center pt-8">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-4 py-1.5 rounded-full border-none font-bold text-xs mb-8">
            Verified Climate Twin • {user.name}
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-6">
            You&apos;re doing great, <br />
            but your twin is growing.
          </h1>
          <p className="text-xl text-[#86868B] max-w-2xl mx-auto font-medium leading-relaxed">
            Your current lifestyle is {stats.sustainabilityScore}% sustainable. However, based on current consumption trends, your footprint is projected to increase by {stats.projectedIncrease}% over the next 5 years.
          </p>
        </motion.div>

        <div className="mt-16 flex justify-center gap-4">
          <div className="px-8 py-4 bg-white rounded-3xl border border-black/[0.03] shadow-sm flex items-center gap-3">
             <ShieldCheck className="text-emerald-500 w-5 h-5" />
             <span className="text-sm font-bold text-[#1D1D1F]">Climate Health: {stats.sustainabilityScore > 70 ? 'Sustainable' : 'At Risk'}</span>
          </div>
          <div className="px-8 py-4 bg-white rounded-3xl border border-black/[0.03] shadow-sm flex items-center gap-3">
             <TrendingDown className="text-orange-500 w-5 h-5" />
             <span className="text-sm font-bold text-[#1D1D1F]">Risk Level: {stats.projectedIncrease > 50 ? 'Increasing' : 'Stable'}</span>
          </div>
        </div>
      </section>

      {/* Primary Modal Card: Climate Twin Visualization */}
      <section>
        <Card className="p-12 md:p-20 rounded-[3rem] bg-white border-none shadow-2xl shadow-black/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2 space-y-8">
              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-[#1D1D1F]">The 5-Year Trajectory.</h2>
              <p className="text-lg text-[#86868B] font-medium leading-relaxed">
                We&apos;ve analyzed your utility bills, travel patterns, and shopping habits to create a high-fidelity replica of your environmental impact path.
              </p>
              <Link href="/simulator">
                <Button variant="ghost" className="p-0 text-[#06c] hover:text-[#06c] hover:bg-transparent font-bold text-lg group">
                  Deep dive into data
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="lg:col-span-3 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.twinData}>
                  <defs>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#10B981" 
                    strokeWidth={4}
                    fill="url(#colorPredicted)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-between mt-4 px-4">
                 <span className="text-xs font-bold text-[#86868B] uppercase tracking-widest">Now: {stats.currentFootprint}t</span>
                 <span className="text-xs font-bold text-[#86868B] uppercase tracking-widest">Year 5: {stats.targetFootprint}t</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Secondary Insight: Biggest Impact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Card className="p-12 rounded-[3rem] bg-white border-none shadow-xl shadow-black/5 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-8">
              <Zap className="text-orange-500 w-6 h-6" />
            </div>
            <h3 className="text-4xl font-bold tracking-tight text-[#1D1D1F] mb-4">{stats.topInsight?.title || "Energy Use."}</h3>
            <p className="text-lg text-[#86868B] font-medium leading-relaxed">
              {stats.topInsight?.description || "Your home energy consumption is the primary driver of your twin's growth. Last month, your electric heating usage was 34% above average."}
            </p>
          </div>
          <div className="pt-8">
            <span className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] block mb-4">{stats.topInsight?.actionText || "Urgent Action"}</span>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div className="bg-orange-500 h-full" style={{ width: `${stats.topInsight?.progress || 34}%` }} />
            </div>
          </div>
        </Card>

        <Card className="p-12 rounded-[3rem] bg-[#000] border-none shadow-xl shadow-black/5 flex flex-col justify-between min-h-[400px] text-white">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <h3 className="text-4xl font-bold tracking-tight mb-4">{stats.topRecommendation?.title || "The Solution."}</h3>
            <p className="text-lg text-[#F5F5F7]/60 font-medium leading-relaxed">
              {stats.topRecommendation?.description || "\"Switching to a smart thermostat and optimizing your laundry schedule could reduce your total emissions by 12% in just 30 days.\""}
            </p>
          </div>
          <Link href="/simulator">
            <Button className="w-full h-16 bg-white text-black hover:bg-[#F5F5F7] font-bold rounded-2xl text-lg mt-8">
              Run Simulation
            </Button>
          </Link>
        </Card>
      </section>

      {/* Explore More Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold text-[#1D1D1F] mb-12">Explore your footprint.</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Transportation', 'Nutrition', 'Shopping', 'Lifestyle'].map((item) => (
            <Link href={`/${item.toLowerCase()}`} key={item} className="p-8 rounded-[2rem] bg-white border border-black/5 hover:border-black transition-all group text-center">
              <p className="text-sm font-bold text-[#86868B] uppercase tracking-widest group-hover:text-black transition-colors">{item}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
