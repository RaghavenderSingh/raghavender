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
        <div className="border border-edge rounded-xl bg-card p-6 h-full">
            <h2 className="text-xl font-semibold mb-6">Achievements</h2>
            <div className="space-y-4">
                {achievements.map((achievement, i) => (
                    <a
                        key={i}
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-transparent hover:border-edge transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <GitMerge className="size-4 text-purple-500" />
                            <h3 className="font-medium">{achievement.title}</h3>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {achievement.description}
                        </p>
                    </a>
                ))}
            </div>
        </div>
    );
}
