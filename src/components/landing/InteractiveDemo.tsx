"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer 
} from "recharts";
import { Sparkles, TrendingDown, ArrowRight, Zap } from "lucide-react";

const generateData = (reduction = 0) => {
  return [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 420 },
    { name: "Mar", value: 380 },
    { name: "Apr", value: 440 },
    { name: "May", value: 460 },
    { name: "Jun", value: reduction > 0 ? 460 : 480 },
    { name: "Jul", value: reduction > 0 ? 460 - (reduction * 0.5) : 510 },
    { name: "Aug", value: reduction > 0 ? 460 - (reduction * 0.8) : 540 },
    { name: "Sep", value: reduction > 0 ? 460 - reduction : 580 },
  ];
};

export function InteractiveDemo() {
  const [step, setStep] = useState(0);

  const reductionMap = [0, 50, 150, 250];
  const reduction = reductionMap[step] || 0;
  const data = generateData(reduction);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "Baseline", color: "bg-slate-400" },
    { label: "AI Analysis", color: "bg-blue-500" },
    { label: "Future Risk", color: "bg-orange-500" },
    { label: "Impact Path", color: "bg-emerald-500" },
  ];

  return (
    <section id="demo" className="py-40 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] tracking-tight mb-12 leading-[1.1]">See the future of your impact.</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {steps.map((s, i) => (
              <div 
                key={i}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-700 ${
                  step === i ? `${s.color} text-white shadow-xl scale-105` : "bg-slate-50 text-slate-400"
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${step === i ? "bg-white" : s.color}`} />
                <span className="text-[11px] font-bold uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-12 md:p-24 rounded-[3.5rem] bg-white border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 flex items-start gap-6">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Projected Savings</p>
              <p className="text-4xl font-bold text-emerald-500 tracking-tight">
                {Math.round((reduction / 580) * 100)}%
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <TrendingDown className="text-emerald-500 w-7 h-7" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
            <div className="lg:col-span-3 h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={5}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-between mt-6 px-4">
                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">January</span>
                 <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">September</span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">
                     <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#1D1D1F] tracking-tight leading-tight">
                    {step === 0 && "Establishing your environmental baseline."}
                    {step === 1 && "AI identifying high-impact patterns."}
                    {step === 2 && "Visualizing your 5-year growth path."}
                    {step === 3 && "Optimizing for a net-zero future."}
                  </h3>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {step === 0 && "We analyze your travel, energy, and shopping data to create your baseline."}
                    {step === 1 && "Our models found that your residential energy use is 24% above average."}
                    {step === 2 && "Without intervention, your annual footprint will grow by 1.2 tons by 2030."}
                    {step === 3 && "Switching to smart energy optimization reduces your trajectory by 15%."}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between p-8 rounded-[2rem] bg-slate-50 border border-black/[0.03]">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Zap className="w-5 h-5 text-emerald-500" />
                   </div>
                   <span className="font-bold text-[#1D1D1F]">Join 2,400+ Pioneers</span>
                </div>
                <ArrowRight className="text-slate-300 w-5 h-5" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

