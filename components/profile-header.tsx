import { USER } from "@/features/portfolio/data/user";
import { VerifiedIcon } from "./verified-icon";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Mail, Calendar } from "lucide-react";





export function ProfileHeader() {
    return (
        <div className="flex h-full border border-edge rounded-xl bg-card p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center border-r border-edge pr-4 sm:pr-6 shrink-0 gap-2">
                <img
                    className="size-24 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-32 object-cover"
                    alt={`${USER.displayName}'s avatar`}
                    src={USER.avatar}
                    fetchPriority="high"
                />
                <div className="flex items-center gap-1">
                    {USER.socials.github && (
                        <a
                            href={USER.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-zinc-500 hover:text-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <SiGithub className="size-5" />
                        </a>
                    )}
                    {USER.socials.linkedin && (
                        <a
                            href={USER.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-zinc-500 hover:text-foreground transition-colors"
                            aria-label="LinkedIn"
                        >
                            <SiLinkedin className="size-5" />
                        </a>
                    )}
                    {USER.socials.x && (
                        <a
                            href={USER.socials.x}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-zinc-500 hover:text-foreground transition-colors"
                            aria-label="X (Twitter)"
                        >
                            <SiX className="size-5" />
                        </a>
                    )}
                    {USER.socials.cal && (
                        <a
                            href={USER.socials.cal}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-zinc-500 hover:text-foreground transition-colors"
                            aria-label="Cal.com"
                        >
                            <Calendar className="size-5" />
                        </a>
                    )}
                    {USER.email && (
                        <a
                            href={`mailto:${Buffer.from(USER.email, 'base64').toString()}`}
                            className="p-2 text-zinc-500 hover:text-foreground transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="size-5" />
                        </a>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center min-w-0 pl-4 sm:pl-6">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl sm:text-3xl font-bold truncate">
                        {USER.displayName}
                    </h1>
                    <div className="flex items-center gap-2 text-zinc-500">
                        <span className="font-mono text-sm">@raghav</span>
                        <VerifiedIcon
                            className="size-4 text-info select-none"
                            aria-label="Verified"
                        />
                    </div>
                </div>

                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 max-w-lg">
                    Senior engineer with 4+ years of experience designing and owning high-throughput, production systems across infrastructure, healthcare SaaS, and B2B platforms.
                </p>

                <div className="mt-4 flex items-center gap-4">
                    <a
                        href="/resume"
                        className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        View Resume
                    </a>

                </div>
            </div>
        </div>
    );
}