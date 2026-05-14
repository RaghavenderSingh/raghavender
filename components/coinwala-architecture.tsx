"use client";

import { Cpu, Link as LinkIcon, Shield, Wallet, Globe, ArrowRight, Zap, Code2 } from "lucide-react";

export function CoinWalaArchitecture() {
  const paradigms = [
    {
      title: "Link-based Wallet",
      icon: <LinkIcon className="size-5 text-amber-500" />,
      description: "Keys derived entirely from URL hash fragment using Argon2 KDF. Server never sees the private key.",
      details: ["Libsodium Argon2", "Zero-Knowledge", "Bearer Instrument"]
    },
    {
      title: "Embedded Wallet",
      icon: <Globe className="size-5 text-blue-500" />,
      description: "MPC-based deterministic key reconstruction via Web3Auth SFA and Google OAuth.",
      details: ["Web3Auth MPC", "postMessage Bridge", "Secure Iframe"]
    },
    {
      title: "Standard Adapter",
      icon: <Wallet className="size-5 text-emerald-500" />,
      description: "Compatible with Phantom, Solflare, and other Solana wallets via official adapter standard.",
      details: ["Solana Web3.js", "v0 Transactions", "Standard UI"]
    }
  ];

  return (
    <div className="w-full h-full p-8 flex flex-col gap-8 bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black border border-primary/20 uppercase tracking-widest w-fit">
          <Cpu className="size-3" /> Multi-Paradigm Wallet Engine
        </div>
        <h3 className="text-2xl font-black italic tracking-tight uppercase">CoinWala Core Architecture</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paradigms.map((p, i) => (
          <div key={i} className="p-6 rounded-3xl border border-border bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group">
            <div className="size-10 rounded-2xl bg-background border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {p.icon}
            </div>
            <h4 className="text-sm font-black uppercase mb-2 tracking-tight">{p.title}</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 font-medium italic">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50">
              {p.details.map((detail, j) => (
                <span key={j} className="px-2 py-0.5 rounded-md bg-muted text-[9px] font-bold text-muted-foreground uppercase">
                  {detail}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl border border-border bg-primary/5 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
            <Shield className="size-3" /> Security Data Flow
          </p>
          <div className="flex items-center gap-3 text-xs font-bold text-foreground/80 italic">
             Password/Salt <ArrowRight className="size-3 text-muted-foreground" /> Argon2 KDF <ArrowRight className="size-3 text-muted-foreground" /> Solana Keypair <ArrowRight className="size-3 text-muted-foreground" /> devnet/mainnet
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-background border border-border">
          <div className="text-right">
            <p className="text-[9px] font-black text-muted-foreground uppercase">Onboarding Speed</p>
            <p className="text-xl font-black italic tracking-tighter text-emerald-500">{"< 30 SEC"}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <p className="text-[9px] font-black text-muted-foreground uppercase">Network</p>
            <p className="text-xl font-black italic tracking-tighter text-primary">SOLANA</p>
          </div>
        </div>
      </div>
    </div>
  );
}
