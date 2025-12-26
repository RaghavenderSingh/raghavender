export function SkillsCard() {
    const skills = [
        { category: "Languages", items: ["TypeScript", "JavaScript", "Rust"] },
        { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Flutter", "React Native"] },
        { category: "Backend", items: ["Node.js", "REST", "GraphQL", "WebSockets", "Distributed Systems"] },
        { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM"] },
        { category: "Cloud & Infrastructure", items: ["AWS (S3, CloudFront)", "Docker", "CI/CD", "Redis"] },
    ];

    return (
        <div className="border border-edge rounded-xl bg-card p-6 h-full">
            <h2 className="text-xl font-semibold mb-6">Skills</h2>
            <div className="space-y-6">
                {skills.map((skillGroup, i) => (
                    <div key={i}>
                        <h3 className="text-sm font-medium text-zinc-500 mb-2">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.items.map((skill, j) => (
                                <span
                                    key={j}
                                    className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded text-sm border border-edge"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
