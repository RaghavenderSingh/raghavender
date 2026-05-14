"use client";

import { ArchitectureComponent, DataFlowStep } from "@/lib/projects";
import { Cpu, Server, Workflow, Database, ShieldCheck, Zap, ArrowRight, Layers } from "lucide-react";

interface GenericArchitectureProps {
  microservices?: ArchitectureComponent[];
  dataFlow?: {
    deployment: DataFlowStep[];
    errorHandling: DataFlowStep[];
  };
  title: string;
}

export function GenericArchitecture({ microservices, dataFlow, title }: GenericArchitectureProps) {
  if (!microservices && !dataFlow) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-4">
          <Layers className="size-16 opacity-10" />
          <p className="text-sm font-medium">Architecture Overview Coming Soon</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 flex flex-col gap-8 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto max-h-[600px] scrollbar-hide">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black border border-primary/20 uppercase tracking-widest w-fit">
          <Workflow className="size-3" /> Technical Infrastructure
        </div>
        <h3 className="text-2xl font-black italic tracking-tight uppercase">{title} System Design</h3>
      </div>

      {microservices && microservices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {microservices.map((service, i) => (
            <div key={i} className="p-6 rounded-3xl border border-border bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="size-10 rounded-2xl bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Server className="size-5 text-primary" />
                </div>
                {service.port && (
                  <span className="text-[9px] font-black px-2 py-1 rounded-lg bg-muted border border-border text-muted-foreground">
                    PORT {service.port}
                  </span>
                )}
              </div>
              <h4 className="text-sm font-black uppercase mb-1 tracking-tight">{service.title}</h4>
              <p className="text-[10px] font-bold text-primary mb-4 italic">{service.tech}</p>
              
              <ul className="space-y-2">
                {service.responsibilities.map((resp, j) => (
                  <li key={j} className="text-[10px] text-muted-foreground leading-relaxed flex gap-2 font-medium">
                    <div className="size-1 rounded-full bg-primary/30 mt-1.5 shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {dataFlow && dataFlow.deployment.length > 0 && (
        <div className="p-6 rounded-3xl border border-border bg-background/50 backdrop-blur-sm space-y-6">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
            <Cpu className="size-3" /> Data Propagation Flow
          </p>
          <div className="space-y-4">
            {dataFlow.deployment.map((step, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="size-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary shrink-0">
                  {step.step}
                </div>
                <p className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  {step.description}
                </p>
                {i < dataFlow.deployment.length - 1 && (
                  <div className="hidden md:block flex-1 border-t border-dashed border-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
