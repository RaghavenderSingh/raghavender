"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Server, 
  Github, 
  User, 
  Globe, 
  Brain,
  Box,
  Cloud,
  Activity,
  Shield,
  Layers
} from "lucide-react";

const Node = ({ icon: Icon, label, tech, x, y, delay = 0, color = "primary" }: any) => {
  const colorMap: Record<string, string> = {
    primary: "var(--primary)",
    emerald: "#10b981",
    amber: "#f59e0b",
    purple: "#a855f7",
    rose: "#f43f5e",
    cyan: "#06b6d4",
  };

  const accent = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group z-30"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay * 1.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative cursor-pointer">
          {/* Subtle Glow */}
          <div 
            className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: accent }}
          />

          {/* Node Body with Site-Wide Glass Style */}
          <div className="size-16 rounded-2xl glass border border-white/10 flex items-center justify-center relative z-10 shadow-sm group-hover:shadow-md group-hover:border-white/20 transition-all duration-300">
            <Icon className="size-7 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
            
            {/* Minimal Inner Reflection */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="mt-4 text-center flex flex-col items-center gap-0.5">
          <span className="text-[9px] font-bold uppercase tracking-widest text-foreground/60 group-hover:text-foreground transition-colors duration-300">
            {label}
          </span>
          <span className="text-[7px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors duration-300 uppercase tracking-tighter">
            {tech}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ConnectionFlow = ({ from, to, color = "primary", bidirectional = false, delay = 0 }: any) => {
  const colorMap: Record<string, string> = {
    primary: "var(--primary)",
    emerald: "#10b981",
    amber: "#f59e0b",
    purple: "#a855f7",
    rose: "#f43f5e",
    cyan: "#06b6d4",
  };

  const accent = colorMap[color] || colorMap.primary;

  // Smoother Path Calculation
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const midX = from.x + dx * 0.5;
  const midY = from.y + dy * 0.5;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const bend = dist > 40 ? 10 : 5;
  const controlY = midY - bend;

  const pathContent = `M ${from.x} ${from.y} Q ${midX} ${controlY} ${to.x} ${to.y}`;

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id={`glow-${from.x}-${from.y}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Static Path Underlay */}
      <motion.path
        d={pathContent}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.1"
        className="text-border opacity-20"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay }}
      />

      {/* Background Animated Flow Dots (Subtle) */}
      <motion.path
        d={pathContent}
        fill="none"
        stroke={accent}
        strokeWidth="0.3"
        strokeDasharray="0.5 6"
        strokeLinecap="round"
        className="opacity-15"
        animate={{ strokeDashoffset: [-24, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

     
    </svg>
  );
};

export const TitanArchitecture = () => {
  const nodes = {
    client: { x: 12, y: 50, icon: User, label: "Client", tech: "React / Next.js", color: "cyan" },
    github: { x: 28, y: 32, icon: Github, label: "GitHub", tech: "Webhooks / CI", color: "purple" },
    api: { x: 38, y: 65, icon: Server, label: "Control Plane", tech: "Bun / Prisma", color: "primary" },
    redis: { x: 55, y: 65, icon: Activity, label: "Job Queue", tech: "BullMQ / Redis", color: "amber" },
    worker: { x: 72, y: 45, icon: Box, label: "Build Worker", tech: "Docker DinD", color: "purple" },
    ai: { x: 80, y: 18, icon: Brain, label: "AI Service", tech: "Gemini Pro", color: "emerald" },
    s3: { x: 88, y: 72, icon: Cloud, label: "Object Storage", tech: "AWS S3 / R2", color: "primary" },
    proxy: { x: 50, y: 88, icon: Globe, label: "Edge Proxy", tech: "Rust / Cloudflare", color: "rose" },
  };

  return (
    <div className="relative w-full h-[600px] glass rounded-[2.5rem] overflow-hidden group/container transition-all duration-500 my-8">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Subtle Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] bg-size-[32px_32px] opacity-10" />
        
        {/* Soft Theme Glows */}
        <div className="absolute -top-[10%] -left-[5%] size-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[0%] right-[0%] size-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Very Subtle Animated Scan Line */}
        <motion.div 
            animate={{ y: ["-20%", "120%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-[150px] bg-linear-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none z-1"
        />
      </div>

      {/* Interface Labels (Top Left) */}
      <div className="absolute top-8 left-10 flex flex-col gap-1 z-40 select-none">
        <div className="flex items-center gap-2.5">
          <div className="size-1.5 rounded-full bg-primary/40 animate-pulse" />
          <span className="text-[10px] font-black text-foreground/40 tracking-[0.4em] uppercase">Architecture Graph</span>
        </div>
        <div className="flex items-center gap-4 mt-1.5">
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-muted-foreground/30 uppercase tracking-widest leading-none">Version</span>
            <span className="text-[9px] font-mono text-muted-foreground/60">V2.0.GLASS</span>
          </div>
          <div className="w-px h-5 bg-border/40" />
          <div className="flex flex-col">
            <span className="text-[7px] font-mono text-muted-foreground/30 uppercase tracking-widest leading-none">Security</span>
            <span className="text-[9px] font-mono text-muted-foreground/60 uppercase">Encrypted</span>
          </div>
        </div>
      </div>

      {/* Info Badges (Top Right) */}
      <div className="absolute right-10 top-8 flex flex-col items-end gap-2.5 z-40 select-none">
        <div className="px-3 py-1 rounded-full glass border border-white/5 flex items-center gap-2">
            <div className="size-1 rounded-full bg-emerald-500/60" />
            <span className="text-[8px] font-mono text-muted-foreground/60 tracking-tight">NODES_ONLINE</span>
        </div>
        <div className="flex gap-1 h-[2px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-3 bg-border/20 rounded-full overflow-hidden">
               <motion.div 
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                className="w-full h-full bg-primary/40"
               />
            </div>
          ))}
        </div>
      </div>

      {/* Prototypes (Bottom Left) */}
      <div className="absolute left-10 bottom-8 flex flex-col gap-2 z-40 select-none opacity-40 hover:opacity-100 transition-opacity duration-500">
        {[
            { label: "TLS v1.3 Standard", icon: Shield },
            { label: "High-Availability Clusters", icon: Layers },
            { label: "Process Isolation Layer", icon: Activity }
        ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 group cursor-default">
              <item.icon className="size-2.5 text-muted-foreground/40 group-hover:text-primary/60 transition-colors" />
              <span className="text-[7.5px] font-mono text-muted-foreground/40 group-hover:text-muted-foreground/80 transition-colors uppercase tracking-widest">{item.label}</span>
            </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative w-full h-full p-20 z-10 select-none">
        {/* Connections Layer */}
        <ConnectionFlow from={nodes.client} to={nodes.api} color="cyan" delay={0.1} />
        <ConnectionFlow from={nodes.github} to={nodes.api} color="purple" delay={0.2} />
        <ConnectionFlow from={nodes.api} to={nodes.redis} bidirectional color="primary" delay={0.3} />
        <ConnectionFlow from={nodes.redis} to={nodes.worker} bidirectional color="amber" delay={0.4} />
        <ConnectionFlow from={nodes.worker} to={nodes.s3} color="purple" delay={0.5} />
        <ConnectionFlow from={nodes.worker} to={nodes.ai} bidirectional color="emerald" delay={0.6} />
        <ConnectionFlow from={nodes.s3} to={nodes.proxy} color="primary" delay={0.7} />
        <ConnectionFlow from={nodes.proxy} to={nodes.client} color="rose" delay={0.8} />

        {/* Nodes Layer */}
        {Object.entries(nodes).map(([key, node], i) => (
          <Node key={key} {...node} delay={i * 0.08} />
        ))}
      </div>

      {/* Minimal Footer (Bottom Right) */}
      <div className="absolute bottom-8 right-10 flex items-center gap-6 z-40 opacity-40 select-none">
        <div className="flex gap-1 items-end h-5">
            {[...Array(6)].map((_, i) => (
                <motion.div 
                    key={i}
                    animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                    className="w-0.5 rounded-full bg-border"
                />
            ))}
        </div>
        <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] italic">System Core Active</span>
      </div>
    </div>
  );
};
