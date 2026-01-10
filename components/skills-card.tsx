export function SkillsCard() {
    const skills = [
        { category: "Languages", items: ["TypeScript", "JavaScript", "Rust"] },
        { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Flutter", "React Native"] },
        { category: "Backend", items: ["Node.js", "REST", "GraphQL", "WebSockets", "Distributed Systems"] },
        { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM"] },
        { category: "Cloud & Infrastructure", items: ["AWS (S3, CloudFront)", "Docker", "CI/CD", "Redis"] },
    ];

    return (
        <div className="glass rounded-2xl p-6 h-full flex flex-col relative overflow-hidden group">
            <h2 className="text-xl font-bold mb-8 tracking-tight text-foreground">Skills & Expertise</h2>
            <div className="space-y-6 flex-1">
                {skills.map((skillGroup, i) => (
                    <div key={i} className="group/item">
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 group-hover/item:text-primary transition-colors">
                            {skillGroup.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.items.map((skill, j) => (
                                <span
                                    key={j}
                                    className="glass px-3 py-1 rounded-xl text-xs font-bold text-foreground/80 hover:text-foreground hover:scale-105 transition-all border border-white/5 shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute -bottom-12 -left-12 size-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
    );
}
