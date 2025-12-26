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
        <div className="border border-edge rounded-xl bg-card p-6 h-full">
            <h2 className="text-xl font-semibold mb-6">Work Experience</h2>

            <div className="space-y-8">
                {experiences.map((exp, i) => (
                    <div key={i} className="group relative border-l-2 border-edge pl-4 pb-2 last:pb-0">
                        <div className="absolute -left-[5px] top-1.5 size-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h3 className="font-medium">{exp.role}</h3>
                            <span className="text-xs text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded w-fit">
                                {exp.period}
                            </span>
                        </div>
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{exp.company}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
