import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/projects";

export function ProjectsCard() {
    return (
        <div className="border border-edge rounded-xl bg-card p-6 h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-6">Projects</h2>

            <div className="grid gap-4">
                {projects.map((project, i) => (
                    <Link
                        key={i}
                        href={`/projects/${project.slug}`}
                        className="group block rounded-lg border border-transparent p-4 hover:border-edge hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <ArrowUpRight className="size-4 text-zinc-400 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                            {project.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

