"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  TreePine, 
  ArrowRight,
  Zap,
  Lightbulb,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateStats } from "@/app/actions/stats";
import { toast } from "sonner";

export default function SimulatorPage() {
  const [commute, setCommute] = useState(40); // km/day
  const [evMode, setEvMode] = useState(false);
  const [diet, setDiet] = useState(50); // 0: Vegan, 50: Flexi, 100: Heavy Meat
  const [energyBill, setEnergyBill] = useState(150); // $/month
  const [renewable, setRenewable] = useState(false);
  const [loading, setLoading] = useState(false);

  const energyCarbonSaved = renewable ? (energyBill * 12 * 0.4) : 0;
  const energyMoneySaved = renewable ? (energyBill * 12 * 0.15) : 0;

  const saved = (commute * 365 * (evMode ? 0.15 : 0)) + (diet * 2.5) + energyCarbonSaved;
  const moneySaved = (commute * 365 * (evMode ? 0.13 : 0)) + energyMoneySaved;
  const trees = Math.floor(saved / 20);

  const handleApply = async () => {
    setLoading(true);
    try {
      // Logic to calculate updated stats based on simulation
      const newScore = Math.min(100, 85 + (trees / 5)); // Simplified logic
      const newFootprint = Math.max(1, 12.4 - (saved / 1000));
      
      await updateStats({
        sustainabilityScore: newScore,
        carbonFootprint: newFootprint,
        monthlyTrends: [4.2, 3.8, 3.5, 3.2, 2.9, 2.5], // Illustrative update
        impactMetrics: [
          { label: "Energy", value: `${(2.4 - (saved/2000)).toFixed(1)}t`, trend: "down" },
          { label: "Transport", value: `${(4.8 - (moneySaved/500)).toFixed(1)}t`, trend: "down" },
          { label: "Food", value: `${(3.1 - (diet/100)).toFixed(1)}t`, trend: "down" },
          { label: "Others", value: "2.1t", trend: "down" }
        ],
        twinData: [
          { month: "Jan", actual: 12.4, predicted: 12.4 },
          { month: "Feb", actual: 11.8, predicted: 11.5 },
          { month: "Mar", actual: 11.2, predicted: 10.8 },
          { month: "Apr", actual: 10.5, predicted: 10.1 },
          { month: "May", actual: 9.8, predicted: 9.2 },
          { month: "Jun", actual: newFootprint, predicted: 8.5 }
        ]
      });
      toast.success("Lifestyle choices applied to your Climate Twin!");
    } catch {
      toast.error("Failed to update stats.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-24 pb-32">
      <div className="text-center pt-8">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1D1D1F] tracking-tight mb-6">Compare lifestyles.</h1>
        <p className="text-xl text-[#86868B] max-w-2xl mx-auto font-medium leading-relaxed">
          See the immediate impact of your choices on your Climate Twin and the planet.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Controls Card */}
        <Card className="p-12 rounded-[3.5rem] bg-white border-none shadow-2xl shadow-black/5 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">Transportation</h3>
               <span className="text-sm font-bold text-primary">{evMode ? "Electric" : "Combustion"}</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between text-sm font-bold text-[#86868B] uppercase tracking-widest">
                <span>Daily Distance</span>
                <span>{commute} km</span>
              </div>
              <Slider 
                value={[commute]} 
                onValueChange={(val) => setCommute(Array.isArray(val) ? val[0] : val)} 
                max={150} 
                className="[&_.relative]:bg-slate-100 [&_.absolute]:bg-black"
              />
            </div>

            <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                <span className="font-bold text-[#1D1D1F]">Electric Vehicle</span>
              </div>
              <Switch aria-label="Toggle Electric Vehicle" checked={evMode} onCheckedChange={setEvMode} className="data-[state=checked]:bg-black" />
            </div>
          </div>

          <div className="space-y-8 pt-12 border-t border-slate-50">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">Nutrition</h3>
               <span className="text-sm font-bold text-emerald-500">
                  {diet < 30 ? "Sustainable" : diet < 70 ? "Balanced" : "High Impact"}
               </span>
            </div>
            <Slider 
              value={[diet]} 
              onValueChange={(val) => setDiet(Array.isArray(val) ? val[0] : val)} 
              max={100} 
              className="[&_.relative]:bg-slate-100 [&_.absolute]:bg-black"
            />
          </div>

          <div className="space-y-8 pt-12 border-t border-slate-50">
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">Home Energy</h3>
               <span className="text-sm font-bold text-amber-500">{renewable ? "100% Renewable" : "Standard Grid"}</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between text-sm font-bold text-[#86868B] uppercase tracking-widest">
                <span>Monthly Bill (EB)</span>
                <span>${energyBill}</span>
              </div>
              <Slider 
                value={[energyBill]} 
                onValueChange={(val) => setEnergyBill(Array.isArray(val) ? val[0] : val)} 
                max={600} 
                className="[&_.relative]:bg-slate-100 [&_.absolute]:bg-black"
              />
            </div>

            <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-bold text-[#1D1D1F]">Renewable Provider</span>
              </div>
              <Switch aria-label="Toggle Renewable Energy Provider" checked={renewable} onCheckedChange={setRenewable} className="data-[state=checked]:bg-black" />
            </div>
          </div>
        </Card>

        {/* Results Showcase */}
        <div className="space-y-8">
           <Card className="p-12 rounded-[3.5rem] bg-black text-white border-none shadow-2xl flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-[2rem] bg-emerald-500 flex items-center justify-center mb-8">
                <TreePine className="text-white w-10 h-10" />
              </div>
              <h4 className="text-5xl font-bold mb-4 tracking-tight">{trees} Trees.</h4>
              <p className="text-xl text-white/60 font-medium leading-relaxed max-w-xs">
                Your simulated changes are equivalent to planting {trees} mature trees and growing them for a year.
              </p>

              <div className="w-full mt-12 grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Carbon Saved</p>
                  <p className="text-2xl font-bold">{Math.round(saved)}kg</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Money Saved</p>
                  <p className="text-2xl font-bold">${Math.round(moneySaved)}</p>
                </div>
              </div>
           </Card>

           <Card className="p-12 rounded-[3.5rem] bg-white border-none shadow-xl shadow-black/5 flex items-center justify-between group">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-widest">Next Step</p>
                <h4 className="text-2xl font-bold text-[#1D1D1F]">Apply to Climate Twin</h4>
              </div>
              <Button 
                onClick={handleApply}
                disabled={loading}
                size="icon" 
                aria-label="Apply to Climate Twin"
                className="w-16 h-16 rounded-full bg-black hover:bg-zinc-800 text-white"
              >
                {loading ? <CheckCircle2 className="w-6 h-6 animate-pulse" /> : <ArrowRight className="w-6 h-6" />}
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
}
