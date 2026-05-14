"use client";

import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, use } from "react";
import { ArrowLeft, ExternalLink, Github, Server, Workflow, ShieldCheck, Zap, Database, Cpu, Cloud, Settings, Layers, PlayCircle, BookOpen, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TitanArchitecture } from "@/components/titan-architecture";
import { CoinWalaArchitecture } from "@/components/coinwala-architecture";
import { GenericArchitecture } from "@/components/generic-architecture";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical'>('overview');
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

  if (!project) {
    notFound();
  }

  if (project.isComingSoon) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
            <div className="size-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 animate-pulse">
                <Workflow className="size-10 text-primary" />
            </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">{project.title}</h1>
          <p className="text-muted-foreground font-medium">
            This project is currently in stealth mode. I'm building something awesome here—stay tuned!
          </p>
          <div className="pt-4">
            <Link href="/">
                <Button className="rounded-full px-8 font-bold">
                    <ArrowLeft className="mr-2 size-4" /> Back to Dashboard
                </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8 pt-24 md:pt-28 max-w-7xl mx-auto space-y-8 pb-20">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors rounded-full border border-border">
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>
        </Link>
        
        <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-full border border-border overflow-hidden backdrop-blur-sm">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => { setActiveTab('overview'); setSelectedBlog(null); }}
                    className={`rounded-full text-[10px] h-7 px-3 font-bold transition-all ${activeTab === 'overview' ? 'bg-background shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    OVERVIEW
                </Button>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveTab('technical')}
                    className={`rounded-full text-[10px] h-7 px-3 font-bold transition-all ${activeTab === 'technical' ? 'bg-background shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    TECHNICAL
                </Button>
            </div>
        </div>

        <div className="flex items-center gap-2">
            {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="rounded-full text-[10px] h-8 px-4 font-bold border border-border bg-background/50 hover:bg-background transition-all">
                        LIVE LINK <ExternalLink className="ml-2 size-3" />
                    </Button>
                </a>
            )}
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost" className="rounded-full text-[10px] h-8 px-4 font-bold border border-border bg-background/50 hover:bg-background transition-all">
                        SOURCE <Github className="ml-2 size-3" />
                    </Button>
                </a>
            )}
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min animate-in fade-in duration-500">
          {/* Left Column - Demo Video & Architecture */}
          <div className="md:col-span-8 flex flex-col gap-4">
            {/* Product Demo Video */}
            <div className="aspect-video relative rounded-3xl overflow-hidden border border-border bg-black shadow-xl">
              {project.demoVideo ? (
                  project.demoVideo.startsWith('http') || project.demoVideo.includes('youtube') ? (
                    <iframe
                        src={`${project.demoVideo}${project.demoVideo.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${project.demoVideo.split('/').pop()?.split('?')[0]}`}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                  ) : (
                    <video 
                        src={project.demoVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                  )
              ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-4">
                      <PlayCircle className="size-16 opacity-10" />
                      <p className="text-sm font-medium">Demo Video Coming Soon</p>
                  </div>
              )}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 text-white text-[10px] font-bold backdrop-blur-md border border-white/10 uppercase tracking-widest">
                  <PlayCircle className="size-3" /> Product Demo
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className={`flex-1 min-h-[400px] relative rounded-3xl overflow-hidden group ${['titan', 'coinwala'].includes(project.slug) ? '' : 'border border-border bg-zinc-50 dark:bg-zinc-950 shadow-inner'}`}>
               {project.slug === 'titan' ? (
                   <TitanArchitecture />
               ) : project.slug === 'coinwala' ? (
                   <CoinWalaArchitecture />
               ) : project.architectureDiagram ? (
                   <div className="relative w-full h-full p-8 flex items-center justify-center">
                       <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold backdrop-blur-md border border-primary/20 uppercase tracking-widest">
                           <Layers className="size-3" /> System Architecture
                       </div>
                       <Image
                           src={project.architectureDiagram}
                           alt={`${project.title} Architecture Diagram`}
                           fill
                           className="object-contain p-12 group-hover:scale-[1.02] transition-transform duration-700"
                       />
                   </div>
               ) : (
                   <GenericArchitecture 
                       microservices={project.architecture?.microservices}
                       dataFlow={project.architecture?.dataFlow}
                       title={project.title}
                   />
               )}
            </div>
          </div>

          {/* Right Column - Title & Info */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Title & "What is this" */}
            <div className="p-8 rounded-3xl border border-border bg-card shadow-lg flex-1">
              <h1 className="text-5xl font-black italic tracking-tighter mb-6 bg-linear-to-br from-foreground to-foreground/50 bg-clip-text text-transparent uppercase">
                  {project.title}
              </h1>
              <div className="space-y-6">
                  <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Mission</p>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium italic">
                          {project.longDescription || project.description}
                      </p>
                  </div>
                  
                  {project.features && (
                      <div className="space-y-3 pt-4 border-t border-border">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Core Capabilities</p>
                          <ul className="space-y-2">
                              {project.features.map((feature, i) => (
                                  <li key={i} className="text-[11px] font-bold text-foreground/80 flex gap-2 items-center">
                                      <div className="size-1 rounded-full bg-primary" />
                                      {feature}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}

                  {project.keyHighlights && (
                      <div className="space-y-3 pt-4 border-t border-border">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Key Highlights</p>
                          <ul className="space-y-2">
                              {project.keyHighlights.map((highlight, i) => (
                                  <li key={i} className="text-[11px] font-bold text-foreground/80 flex gap-2 items-center">
                                      <div className="size-1 rounded-full bg-emerald-500" />
                                      {highlight}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </div>
            </div>

            {/* Spec: Tech Stack */}
            <div className="p-6 rounded-3xl border border-border bg-zinc-50/50 dark:bg-zinc-900/50 shadow-inner">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.slice(0, 8).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-background border border-border rounded-lg text-[10px] font-bold">
                          {tech}
                      </span>
                  ))}
              </div>
            </div>

            {/* Spec: Infrastructure */}
            <div className="p-6 rounded-3xl border border-border bg-zinc-50/50 dark:bg-zinc-900/50 shadow-inner">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Infrastructure</p>
              <div className="space-y-3">
                  {project.architecture?.infrastructure.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex gap-3 items-center">
                          <div className="size-8 rounded-xl bg-background border border-border flex items-center justify-center shrink-0">
                              {i === 0 ? <Cloud className="size-4 text-primary" /> : <Database className="size-4 text-emerald-500" />}
                          </div>
                          <div className="min-w-0">
                              <p className="text-[9px] font-black uppercase text-muted-foreground truncate">{item.category}</p>
                              <p className="text-[11px] font-bold truncate">{item.items.join(", ")}</p>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Bottom Row Specs */}
          <div className="md:col-span-3">
               <div className="h-full p-6 rounded-3xl border border-border bg-card shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                      <ShieldCheck className="size-3 text-emerald-500" /> Security
                  </p>
                  <ul className="space-y-3">
                      {project.architecture?.security.slice(0, 3).map((sec, i) => (
                          <li key={i} className="text-[11px] font-medium text-muted-foreground flex gap-2">
                              <div className="size-1 rounded-full bg-emerald-500/50 mt-1.5 shrink-0" />
                              {sec}
                          </li>
                      ))}
                  </ul>
              </div>
          </div>

          <div className="md:col-span-9">
              <div className="h-full p-6 rounded-3xl border border-border bg-zinc-50/50 dark:bg-zinc-900/50 shadow-inner flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-4 text-center md:text-left">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 flex items-center justify-center md:justify-start gap-2">
                          <Zap className="size-3" /> Performance Strategy
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                           {project.architecture?.performance.map((perf, i) => (
                              <div key={i} className="px-4 py-2 bg-background border border-border rounded-2xl text-xs font-bold shadow-sm">
                                  {perf}
                              </div>
                          ))}
                      </div>
                  </div>
                  {project.slug === 'titan' && (
                      <div className="hidden md:flex flex-col items-end gap-1 shrink-0 opacity-20">
                          <div className="h-0.5 w-24 bg-foreground" />
                          <div className="h-0.5 w-16 bg-foreground" />
                          <div className="h-0.5 w-20 bg-foreground" />
                      </div>
                  )}
              </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {selectedBlog !== null ? (
                <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <Button variant="ghost" onClick={() => setSelectedBlog(null)} className="mb-4 text-primary font-bold">
                        <ArrowLeft className="mr-2 size-4" /> Back to Blogs
                    </Button>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <span className="flex items-center gap-1"><Calendar className="size-3" /> {project.blogs![selectedBlog].date}</span>
                            <span className="flex items-center gap-1"><Clock className="size-3" /> {project.blogs![selectedBlog].readingTime} read</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-tight uppercase">
                            {project.blogs![selectedBlog].title}
                        </h1>
                    </div>
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium italic mb-12">
                            {project.blogs![selectedBlog].excerpt}
                        </p>
                        <div className="text-lg leading-relaxed space-y-6 text-foreground/90 whitespace-pre-wrap font-medium">
                            {project.blogs![selectedBlog].content}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-12">
                    <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
                        <h2 className="text-5xl font-black italic tracking-tighter uppercase">Technical Deep Dives</h2>
                        <p className="text-muted-foreground font-medium">Inside the engineering challenges, trade-offs, and \"aha\" moments that built Titan.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {project.blogs?.map((blog, i) => (
                            <div 
                                key={i} 
                                onClick={() => setSelectedBlog(i)}
                                className="group cursor-pointer p-8 rounded-4xl border border-border bg-card hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col h-full"
                            >
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center justify-between text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                        <span>{blog.readingTime}</span>
                                        <BookOpen className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h3 className="text-2xl font-black italic leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-3">
                                        {blog.excerpt}
                                    </p>
                                </div>
                                <div className="pt-8 flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                                    Read Full Post <ArrowLeft className="size-3 rotate-180 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      )}
    </main>
  );
}
