"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

export function HangingNavbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none p-4">
      <div className="relative flex flex-col items-center w-full max-w-md mx-auto">
        {/* The "Wires" */}
        <div className="flex justify-between w-[85%] absolute top-0 pointer-events-none z-0 px-8">
          <div className="flex flex-col items-center">
            <div className="h-4 w-px bg-linear-to-b from-transparent to-primary/20" />
            <div className="size-1.5 bg-primary/40 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
          </div>
          <div className="flex flex-col items-center">
            <div className="h-4 w-px bg-linear-to-b from-transparent to-primary/20" />
            <div className="size-1.5 bg-primary/40 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)]" />
          </div>
        </div>

        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0 
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          }}
          className="mt-3 pointer-events-auto w-full z-20"
        >
          <div className="glass rounded-2xl p-1.5 shadow-2xl flex items-center justify-between gap-1.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/5 to-transparent opacity-50" />

            <button className="h-10 flex-1 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all hover:bg-white/10 active:scale-[0.98] border border-white/5">
              <div className="relative z-10 font-bold text-foreground/60 group-hover:text-foreground transition-all tracking-[0.15em] text-[10px] uppercase">
                Home
              </div>
            </button>

            <div className="w-px h-4 bg-primary/10 shadow-sm" />

            <button className="h-10 flex-1 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all hover:bg-white/10 active:scale-[0.98] border border-white/5">
              <div className="relative z-10 font-bold text-foreground/60 group-hover:text-foreground transition-all tracking-[0.15em] text-[10px] uppercase">
                Blog
              </div>
            </button>

            <div className="w-px h-4 bg-primary/10 shadow-sm" />

            <ThemeToggle />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
