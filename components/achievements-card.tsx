import { GitMerge } from "lucide-react";

export function AchievementsCard() {
    const achievements = [
        {
            title: "MUI Contributor",
            description: "Merged PR #40754 to update Array to ReadonlyArray in Base UI, enhancing type safety.",
            link: "https://github.com/mui/material-ui/pull/40754"
        },
        {
            title: "Rust Cargo Contributor",
            description: "Merged PR #15281 to fix a symlink bug in cargo add, including test coverage.",
            link: "https://github.com/rust-lang/cargo/pull/15281"
        },
        {
            title: "Solana SDK Contributor",
            description: "Working on PR #187 to update declare_id! macro for compatibility.",
            link: "https://github.com/solana-labs/solana/pull/187"
        }
    ];

    return (
        <div className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
            <h2 className="text-xl font-bold mb-8 tracking-tight text-foreground">Achievements</h2>
            <div className="space-y-4 flex-1">
                {achievements.map((achievement, i) => (
                    <a
                        key={i}
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item block p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover/item:scale-110 transition-transform">
                                <GitMerge className="size-4" />
                            </div>
                            <h3 className="font-bold text-foreground/80 group-hover/item:text-foreground transition-colors tracking-tight">
                                {achievement.title}
                            </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {achievement.description}
                        </p>
                    </a>
                ))}
            </div>
            <div className="absolute -top-12 -right-12 size-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
    );
}
