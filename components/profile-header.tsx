import { USER } from "@/features/portfolio/data/user";
import { VerifiedIcon } from "./verified-icon";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Mail, Calendar } from "lucide-react";





export function ProfileHeader() {
    return (
        <div className="flex flex-col md:flex-row h-full min-h-[220px] glass rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
           
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-700" />
            
            <div className="flex flex-col items-center justify-center space-y-4 shrink-0 md:pr-8 md:border-r border-edge">
                <div className="relative">
                    <img
                        className="size-24 sm:size-32 rounded-2xl ring-1 ring-border shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                        alt={`${USER.displayName}'s avatar`}
                        src={USER.avatar}
                        fetchPriority="high"
                    />
                    <div className="absolute -bottom-2 -right-2 glass size-8 rounded-lg flex items-center justify-center shadow-lg">
                        <VerifiedIcon className="size-5 text-info" aria-label="Verified" />
                    </div>
                </div>
                
                <div className="flex items-center gap-1.5 glass px-3 py-1.5 rounded-xl border border-white/10 shadow-sm">
                    {USER.socials.github && (
                        <a
                            href={USER.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                            aria-label="GitHub"
                        >
                            <SiGithub className="size-4" />
                        </a>
                    )}
                    {USER.socials.linkedin && (
                        <a
                            href={USER.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <SiLinkedin className="size-4" />
                        </a>
                    )}
                    {USER.socials.x && (
                        <a
                            href={USER.socials.x}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                            aria-label="X (Twitter)"
                        >
                            <SiX className="size-4" />
                        </a>
                    )}
                    {USER.email && (
                        <a
                            href={`mailto:${Buffer.from(USER.email, 'base64').toString()}`}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                            aria-label="Email"
                        >
                            <Mail className="size-4" />
                        </a>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center mt-6 md:mt-0 md:pl-8 text-center md:text-left">
                <div className="space-y-1">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        {USER.displayName}
                    </h1>
                    <p className="font-mono text-sm text-muted-foreground">@raghav</p>
                </div>

                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
                    Senior engineer with 4+ years of experience designing and owning 
                    <span className="text-foreground font-medium"> high-throughput, production systems </span> 
                    across infrastructure, healthcare SaaS, and B2B platforms.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <a
                        href="/resume"
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/95 transition-all active:scale-95"
                    >
                        View Resume
                    </a>
                    {USER.socials.cal && (
                        <a
                            href={USER.socials.cal}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-xl glass px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-white/10 transition-all border border-white/5 active:scale-95 gap-2"
                        >
                            <Calendar className="size-4" />
                            Book a Call
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}