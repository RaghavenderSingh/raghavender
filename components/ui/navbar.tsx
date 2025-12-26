"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6"
        >
            <div className="flex items-center gap-6 rounded-full border border-white/10 bg-black/50 px-6 py-3 backdrop-blur-md shadow-lg ring-1 ring-white/5">
                <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                    Home
                </Link>
                <Link
                    href="#projects"
                    className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                    Work
                </Link>
                <Link
                    href="#about"
                    className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                    About
                </Link>
                <Link
                    href="#contact"
                    className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                >
                    Contact
                </Link>
            </div>
        </motion.nav>
    );
}
