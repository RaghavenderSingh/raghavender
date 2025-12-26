export interface Project {
  slug: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  longDescription?: string;
  features?: string[];
  techStack?: string[];
}

export const projects: Project[] = [
  {
    slug: "vercel-clone",
    title: "Vercel Clone",
    description: "Built a full-stack cloud deployment platform for modern web applications, similar to Vercel, supporting Next.js, Vite, and React projects.",
    longDescription:
      "Built a full-stack cloud deployment platform for modern web applications, similar to Vercel, supporting Next.js, Vite, and React projects. Designed a distributed architecture with an API server, background build workers, and a Redis-backed job queue, enabling 20+ concurrent builds with isolation and retries. Implemented an automated CI/CD pipeline that clones GitHub repositories, installs dependencies, runs builds, and deploys artifacts without manual intervention. Streamed real-time build logs and deployment status to the dashboard using WebSockets, delivering sub-second log updates. Deployed build artifacts to AWS S3 and served them globally via CloudFront CDN, improving asset delivery latency and reliability. Built a project management dashboard with deployment history, environment configuration, and build status monitoring.",
    link: "#",
    github: "#",
    features: [
      "Distributed Architecture with Redis Queue",
      "Automated CI/CD Pipeline",
      "Real-time Logs via WebSockets",
      "Global CDN Delivery (AWS S3 + CloudFront)",
      "Project Management Dashboard",
    ],
    techStack: ["Next.js", "Docker", "AWS S3", "Redis", "Kafka", "WebSockets"],
  },
  {
    slug: "coinwala",
    title: "CoinWala",
    description: "Self-custodial Solana wallet using MPC-based key management and OAuth login.",
    longDescription:
      "CoinWala is a user-friendly, self-custodial wallet for the Solana blockchain. It leverages Multi-Party Computation (MPC) for secure key management, allowing users to sign in with familiar OAuth providers (Google, Twitter) while maintaining full control over their assets without managing complex seed phrases.",
    link: "#",
    github: "#",
    features: [
      "MPC-based Key Management",
      "OAuth Social Login",
      "Self-Custodial",
      "Solana Blockchain Support",
    ],
    techStack: ["Solana Web3.js", "Next.js", "TSS-Lib", "Firebase Auth"],
  },
  {
    slug: "coinwala-wallet-adapter",
    title: "CoinWala Wallet Adapter SDK",
    description: "A Solana wallet adapter that seamlessly integrates CoinWala Wallet functionality into Solana dApps.",
    longDescription:
      "The CoinWala Wallet Adapter SDK enables Solana developers to easily integrate CoinWala wallet support into their decentralized applications (dApps). It adheres to the standard Solana Wallet Adapter interface, ensuring compatibility with the broader Solana ecosystem.",
    link: "#",
    github: "#",
    features: [
      "Standard Wallet Adapter Interface",
      "Easy Integration",
      "Support for Signing Transactions & Messages",
    ],
    techStack: ["TypeScript", "Solana Wallet Adapter Base", "Web3.js"],
  },
  {
    slug: "bridge-vault",
    title: "Bridge Vault",
    description: "A cross-chain styling application on Solana.",
    longDescription:
      "Bridge Vault is a specialized application on Solana designed for cross-chain asset management and styling. It provides secure vaults for bridging assets across different blockchain networks, emphasizing security and ease of use.",
    link: "#",
    github: "#",
    features: [
      "Cross-chain Bridging",
      "Secure Vaults",
      "Solana-based",
    ],
    techStack: ["Rust", "Anchor", "React", "Wormhole"],
  },
];
