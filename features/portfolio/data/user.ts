import type { User } from "@/features/portfolio/types/user";

export const USER: User = {
    firstName: "Raghavender",
    lastName: "Singh Chouhan",
    displayName: "Raghavender Singh Chouhan",
    username: "itsrsc_",
    gender: "male",
    pronouns: "he/him",
    bio: "Senior engineer with 4+ years of experience designing and owning high-throughput, production systems.",
    flipSentences: [
        "Building high-throughput systems ",
        "Architecting real-time event-driven apps ",
        "Scaling infrastructure for millions ",
        "Removing friction from Web3 "
    ],
    address: "India",
    phoneNumber: "KzkxIDYzNzgtNTA5NjM1", // +91 6378-509635
    email: "d2F5dG9yYWdoYXZAZ21haWwuY29t", // waytoraghav@gmail.com
    website: "https://github.com/itsrsc_",
    jobTitle: "Tech Lead",
    jobs: [
        {
            title: "Tech Lead",
            company: "JOGGF",
            website: "https://joggf.com", // Placeholder
        },
        {
            title: "Founder",
            company: "CoinWala",
            website: "",
        },
        {
            title: "Founding Software Engineer",
            company: "MedQCX",
            website: "",
        },
        {
            title: "Software Development Engineer",
            company: "Reevooy",
            website: "https://reevooy.com", // Placeholder
        },
    ],
    about: `
## Summary
Senior engineer with 4+ years of experience designing and owning high-throughput, production systems across infrastructure,
healthcare SaaS, and B2B platforms. Built and scaled services handling 1Cr+ calls/day, architected real-time, event-driven systems,
and ensured reliability for 10K+ daily active users.

## Professional Experience

### Tech Lead, JOGGF (01/2025 – present)
• Led development of in-house IVR & calling infrastructure handling 1Cr+ calls/day across statewide campaigns.
• Designed and shipped RBAC-based multilingual dashboards used by 200+ vendors and 75K+ users across 400+ districts.
• Built real-time analytics systems with area-based access control for language, location, and role-specific experiences.
• Owned systems end-to-end across backend APIs, frontend dashboards, and infra reliability.
• Worked directly with leadership on architecture decisions, scalability tradeoffs, and execution timelines.

### Founder, CoinWala (05/2024 – 12/2024)
• Founded and built a self-custodial Solana wallet using MPC-based key management (Web3Auth + Torus), removing seed-phrase friction.
• Reduced wallet onboarding time from 10+ minutes to under 30 seconds via OAuth-based login.
• Built secure link-based P2P transfers using ephemeral keys and encrypted payloads.
• Developed a Solana Wallet Adapter–compatible SDK supporting legacy and v0 transactions with sub-second WS updates.
• Awarded a $4,000 Superteam grant for Web3 onboarding and wallet infrastructure.

### Founding Software Engineer, MedQCX (01/2023 – 04/2024)
• Built a hospital equipment management SaaS from scratch supporting multi-role workflows.
• Improved client–server performance by ~35% using GraphQL with optimized query patterns.
• Implemented real-time alerts and device state updates via WebSockets.
• Integrated Agora RTC audio/video calling in a Flutter app and shipped an AI support chatbot.

### Software Development Engineer, Reevooy (03/2022 – 12/2022)
• Built core features for a B2B import/export & credit platform serving 1,000+ sellers and buyers.
• Reduced catalog creation time from 2–3 hours to under 10 minutes via configurable product catalogs.
• Engineered a high-throughput payout pipeline, cutting disbursal time by ~90%.
• Implemented real-time credit tracking for ₹10L–₹1Cr credit lines, improving ops visibility.

## Skills

*   **Languages**: TypeScript, JavaScript, Rust
*   **Frontend**: React, Next.js, Tailwind, Flutter, React Native
*   **Backend**: Node.js, REST, GraphQL, WebSockets, Distributed Systems
*   **Database**: PostgreSQL, MongoDB, Redis, Prisma ORM
*   **Cloud & Infrastructure**: AWS (S3, CloudFront), Docker, CI/CD, Redis

## Projects

### Titan — Cloud Deployment Platform
• Built a Vercel-like CI/CD platform supporting Next.js, Vite, and React apps.
• Designed distributed architecture with API server, build workers, and Redis-backed job queues supporting 20+
concurrent builds.
• Streamed real-time build logs via WebSockets and deployed assets using AWS S3 + CloudFront.

## Achievements

• **Open Source Contributor – MUI**: Merged PR #40754 to update Array to ReadonlyArray in Base UI, enhancing type safety and
consistency.
• **Rust Contributor – Cargo (Rust Lang)**: Merged PR #15281 to fix a symlink bug in cargo add, including test coverage and
preservation of symlink behavior.
• **Contributor – Solana SDK**: Working on PR #187 to update the declare_id! macro for compatibility with solana_pubkey::Pubkey.

## Education

**Bachelor of Engineering in Computer Science**
Government Engineering College Bikaner
2021
`,
    avatar: "/profile.jpg",
    ogImage: "/og-image.png",
    namePronunciationUrl: "",
    keywords: ["Raghavender Singh Chouhan", "Senior Engineer", "Full Stack", "React", "Rust", "Solana", "Web3", "Distributed Systems"],
    socials: {
        github: "https://github.com/itsrsc_",
        linkedin: "https://linkedin.com/in/raghavender-singh-chouhan",
        x: "https://x.com/itsrsc_",
    },
    timeZone: "Asia/Kolkata",
    dateCreated: "2025-12-26",
};