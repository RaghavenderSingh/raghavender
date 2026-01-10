export function WorkExperienceCard() {
    const experiences = [
        {
            role: "Tech Lead",
            company: "JOGGF",
            period: "01/2025 – present",
            description: "Led development of in-house IVR & calling infrastructure handling 1Cr+ calls/day. Designed and shipped RBAC-based multilingual dashboards used by 75K+ users."
        },
        {
            role: "Founder",
            company: "CoinWala",
            period: "05/2024 – 12/2024",
            description: "Founded and built a self-custodial Solana wallet using MPC-based key management. Awarded a $4,000 Superteam grant."
        },
        {
            role: "Founding Software Engineer",
            company: "MedQCX",
            period: "01/2023 – 04/2024",
            description: "Built a hospital equipment management SaaS from scratch. Improved client–server performance by ~35% using GraphQL."
        },
        {
            role: "Software Development Engineer",
            company: "Reevooy",
            period: "03/2022 – 12/2022",
            description: "Built core features for a B2B import/export platform. Engineered a high-throughput payout pipeline, cutting disbursal time by ~90%."
        }
    ];

    return (
        <div className="glass rounded-2xl p-6 h-full relative overflow-hidden group">
            <h2 className="text-xl font-bold mb-8 tracking-tight text-foreground">Work Experience</h2>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-1 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary/20 before:via-primary/10 before:to-transparent">
                {experiences.map((exp, i) => (
                    <div key={i} className="relative pl-8 group/item">
                        <div className="absolute left-0 top-1.5 size-2.5 rounded-full border-2 border-primary/20 bg-background group-hover/item:border-primary group-hover/item:scale-110 transition-all duration-300" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                            <h3 className="font-bold text-foreground/90 group-hover/item:text-foreground transition-colors tracking-tight">
                                {exp.role}
                            </h3>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest glass px-2 py-1 rounded-lg border border-white/5 whitespace-nowrap">
                                {exp.period}
                            </span>
                        </div>
                        
                        <p className="text-sm font-semibold text-primary/80 mb-3 tracking-wide">{exp.company}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="absolute -top-12 -left-12 size-24 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
    );
}
