"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 mb-8 text-[13px] font-bold tracking-tight text-primary bg-primary/10 rounded-full">
            The Future of Impact
          </span>
          <h1 className="text-6xl md:text-[100px] font-bold tracking-[-0.04em] text-[#1D1D1F] mb-12 leading-[1.05]">
            See your future <br />
            footprint. Today.
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-[#86868B] mb-16 leading-relaxed font-medium">
            CarbonIQ creates an AI-powered Climate Twin that predicts future emissions 
            and helps you find the path to net-zero.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register">
              <Button size="lg" className="rounded-full bg-black hover:bg-black/90 text-white px-10 h-16 text-lg font-bold group">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="rounded-full text-[#06c] hover:text-[#06c] px-10 h-16 text-lg font-bold hover:bg-transparent group">
              Learn more
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
