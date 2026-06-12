"use client";

import { motion } from "framer-motion";
import { 
  Target,
  Brain,
  Repeat,
  Share2
} from "lucide-react";

const features = [
  {
    title: "Climate Twin",
    description: "A digital replica of your environmental path. See your impact years into the future.",
    icon: Target,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    title: "AI Advisor",
    description: "Personalized coaching that understands your lifestyle and habits.",
    icon: Brain,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    title: "Simulator",
    description: "Test lifestyle changes before you make them. See the outcome instantly.",
    icon: Repeat,
    color: "text-orange-500",
    bg: "bg-orange-50"
  },
  {
    title: "Passport",
    description: "A verified digital identity for your sustainability journey.",
    icon: Share2,
    color: "text-purple-500",
    bg: "bg-purple-50"
  }
];

export function Features() {
  return (
    <section id="features" className="py-40 px-6 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-[#1D1D1F] tracking-tight mb-6">Built for clarity.</h2>
          <p className="text-xl text-[#86868B] max-w-2xl mx-auto font-medium">
            Every tool is designed to help you explore your future without the complexity of traditional carbon data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-12 rounded-[2rem] bg-white border border-black/[0.03] shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${f.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                <f.icon className={`w-8 h-8 ${f.color}`} />
              </div>
              <h3 className="text-3xl font-bold text-[#1D1D1F] mb-4 tracking-tight">{f.title}</h3>
              <p className="text-lg text-[#86868B] leading-relaxed font-medium">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
