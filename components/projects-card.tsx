import { ArrowUpRight } from "lucide-react";

export function ProjectsCard() {
    const projects = [
        {
            title: "Vercel Clone",
            description: "Cloud Deployment Platform supporting Next.js, Vite, and React apps with distributed architecture.",
            link: "#",
        },
        {
            title: "CoinWala",
            description: "Self-custodial Solana wallet using MPC-based key management and OAuth login.",
            link: "#",
        },
        {
            title: "Bridge Vault",
            description: "A cross-chain styling application on Solana.",
            link: "#",
        }
    ];

    return (
        <div className="border border-edge rounded-xl bg-card p-6 h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-6">Projects</h2>

            <div className="grid gap-4">
                {projects.map((project, i) => (
                    <a
                        key={i}
                        href={project.link}
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
                    </a>
                ))}
            </div>
        </div>
    );
}
