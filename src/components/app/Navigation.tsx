"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Zap, 
  CreditCard,
  User,
  LogOut
} from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Advisor", href: "/advisor", icon: MessageSquare },
  { label: "Simulator", href: "/simulator", icon: Zap },
  { label: "Passport", href: "/passport", icon: CreditCard },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6">
      <nav className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full shadow-lg shadow-black/5">
        <div className="flex items-center gap-3 pr-4 border-r border-black/5">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center font-bold text-white text-xs">C</div>
          <span className="text-sm font-bold tracking-tight text-black">CarbonIQ</span>
        </div>

        <div className="flex items-center gap-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                  isActive ? "text-black" : "text-slate-500 hover:text-black"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-black/5">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
             <User className="w-4 h-4 text-slate-400" />
          </div>
          <button onClick={() => logoutUser()} className="text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
