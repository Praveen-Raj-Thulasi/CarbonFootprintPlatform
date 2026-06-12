"use client";

import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
  unit: string;
}

interface SocialProofProps {
  stats: Stat[];
}

export function SocialProof({ stats }: SocialProofProps) {
  return (
    <section className="py-40 bg-white border-t border-black/[0.03]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-6xl font-bold text-[#1D1D1F] mb-4 tracking-tight tabular-nums">
                {s.value}
                <span className="text-emerald-500 ml-0.5">{s.unit}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#86868B]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

