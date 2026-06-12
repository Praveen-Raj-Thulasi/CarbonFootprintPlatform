import Link from "next/link";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/Navbar";
import { getPlatformStats } from "@/lib/stats";

const Hero = dynamic(() => import("@/components/landing/Hero").then(mod => mod.Hero));
const InteractiveDemo = dynamic(() => import("@/components/landing/InteractiveDemo").then(mod => mod.InteractiveDemo));
const Features = dynamic(() => import("@/components/landing/Features").then(mod => mod.Features));
const SocialProof = dynamic(() => import("@/components/landing/SocialProof").then(mod => mod.SocialProof));

export default async function Home() {
  const platformStats = await getPlatformStats();
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <InteractiveDemo />
      <Features />
      <SocialProof stats={platformStats} />
      
      {/* Footer */}
      <footer className="py-24 px-6 bg-[#F5F5F7] border-t border-black/[0.03]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white text-xs shadow-xl">C</div>
            <span className="text-xl font-bold tracking-tight text-[#1D1D1F]">CarbonIQ</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm font-bold text-[#86868B] uppercase tracking-widest">
            <Link href="#" className="hover:text-black transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-black transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-black transition-colors">Status</Link>
            <Link href="#" className="hover:text-black transition-colors">Contact</Link>
          </div>
          <p className="text-[#86868B] text-sm font-medium">
            © 2026 CarbonIQ Inc. All rights reserved. <br className="md:hidden" />
            Designed in California. Built for the Planet.
          </p>
        </div>
      </footer>
    </main>
  );
}
