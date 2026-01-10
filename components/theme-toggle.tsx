"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 opacity-50">
        <Sun className="h-4 w-4" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-10 w-10 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer transition-all hover:bg-white/10 active:scale-[0.98] border border-white/5"
      aria-label="Toggle theme"
    >
      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Moon className="h-4 w-4 text-foreground/60 group-hover:text-foreground transition-all" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Sun className="h-4 w-4 text-foreground/60 group-hover:text-foreground transition-all" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
