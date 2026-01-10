import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";

export function ProjectsCard() {
    return (
        <div className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Projects</h2>
                <div className="size-2 rounded-full bg-primary/20 animate-pulse" />
            </div>

            <div className="grid gap-4 flex-1">
                {projects.map((project, i) => {
                    const CardContent = (
                        <div className={`p-4 rounded-xl border border-white/5 transition-all duration-300 relative overflow-hidden h-full ${project.isComingSoon ? 'opacity-80' : 'hover:bg-white/5 group/item cursor-pointer'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <h3 className={`font-bold tracking-tight transition-colors ${project.isComingSoon ? 'text-foreground/40' : 'text-foreground/80 group-hover/item:text-foreground'}`}>
                                        {project.title}
                                    </h3>
                                    {project.isComingSoon && (
                                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary border border-primary/20 uppercase tracking-tighter">
                                            Soon
                                        </span>
                                    )}
                                </div>
                                {!project.isComingSoon && (
                                    <ArrowUpRight className="size-4 text-muted-foreground group-hover/item:text-primary transition-all group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                                )}
                            </div>
                            <p className={`text-sm leading-relaxed line-clamp-2 ${project.isComingSoon ? 'text-muted-foreground/50 italic' : 'text-muted-foreground'}`}>
                                {project.description}
                            </p>
                            {project.isComingSoon && (
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <div className="size-2 rounded-full bg-primary animate-pulse" />
                                </div>
                            )}
                        </div>
                    );

                    if (project.isComingSoon) {
                        return (
                            <div key={i} className="block relative">
                                {CardContent}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={i}
                            href={`/projects/${project.slug}`}
                            className="block"
                        >
                            {CardContent}
                        </Link>
                    );
                })}
            </div>
            
            <div className="absolute -bottom-12 -right-12 size-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
    );
}

