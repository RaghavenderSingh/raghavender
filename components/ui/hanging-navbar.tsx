"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

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
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="relative flex flex-col items-center w-full max-w-xs mx-auto px-4">

        <div className="flex justify-between w-[90%] md:w-[80%] absolute top-0 pointer-events-none z-0">

          <div className="flex flex-col items-center">
            <div className="h-4  bg-neutral-800/50" />
            <div className="w-1.5 h-1.5 bg-neutral-900 border-neutral-800/50 rounded-full -mt-0.5 z-10" />
          </div>
   
          <div className="flex flex-col items-center">
            <div className="h-4  bg-neutral-800/50" />
            <div className="w-1.5 h-1.5 bg-neutral-900  border-neutral-800/50 rounded-full -mt-0.5 z-10" />
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
            stiffness: 150,
            damping: 20,
            mass: 0.8,
          }}
          className="mt-3 pointer-events-auto w-full z-20"
        >
          <div className="bg-white border border-neutral-200 rounded-2xl p-1.5 shadow-xl flex items-center justify-between gap-2 relative overflow-hidden backdrop-blur-md">
        
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-black/5 to-transparent opacity-30" />

            <div className="bg-[#151515] h-9 flex-1 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all hover:bg-[#1a1a1a] active:scale-[0.99] border border-white/[0.02]">
               <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-100" />
              <div className="relative z-10 font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors tracking-wide text-xs uppercase">
               Home
              </div>
            </div>

            <div className="w-px h-4 bg-neutral-200" />

             <div className="bg-[#151515] h-9 flex-1 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all hover:bg-[#1a1a1a] active:scale-[0.99] border border-white/[0.02]">
                <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-100" />
                <div className="relative z-10 font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors tracking-wide text-xs uppercase">
               Blog
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
