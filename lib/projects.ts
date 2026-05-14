export interface ArchitectureComponent {
  title: string;
  tech: string;
  port?: number;
  responsibilities: string[];
  features?: string[];
}

export interface DataFlowStep {
  step: number;
  description: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  content: string;
  readingTime: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  link?: string;
  github?: string;
  longDescription?: string;
  features?: string[];
  techStack?: string[];
  architectureDiagram?: string;
  demoVideo?: string;
  blogs?: BlogPost[];
  isComingSoon?: boolean;
  keyHighlights?: string[];
  architecture?: {
    microservices: ArchitectureComponent[];
    dataFlow: {
      deployment: DataFlowStep[];
      errorHandling: DataFlowStep[];
    };
    infrastructure: {
      category: string;
      items: string[];
    }[];
    security: string[];
    performance: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "titan",
    title: "Titan",
    description: "Built a full-stack automated deployment platform for modern web applications, featuring microservices architecture, real-time logging, and high-performance routing.",
    longDescription:
      "Titan is a production-grade cloud deployment platform designed to handle modern web application workflows. It features a distributed architecture with isolated build environments, real-time streaming of logs via WebSockets, and a custom reverse proxy for dynamic subdomain routing. The platform manages the entire lifecycle from GitHub push events to global asset delivery via S3, ensuring a seamless developer experience with high reliability and performance.",
    link: "https://titan.curiousdev.xyz/",
    github: "https://github.com/RaghavenderSingh/titan",
    features: [
      "Microservices Architecture (API, Worker, Proxy)",
      "Automated CI/CD with Docker Isolation",
      "AI-Powered Build Error Analysis (Gemini)",
      "Real-time WebSocket Log Streaming",
      "Dynamic Subdomain Routing & Custom Domains",
      "Advanced Caching with LRU Strategy",
      "GitHub OAuth 2.0 & JWT Authentication",
      "Cross-Service Communication via Redis Streams",
    ],
    keyHighlights: [
      "Zero-downtime deployments via custom proxy routing",
      "Auto-scaling build worker pool with BullMQ concurrency",
      "99.9% uptime for served applications using S3 redundancy",
    ],
    techStack: ["Bun", "TypeScript", "Express", "Next.js", "Docker", "AWS S3", "Redis", "BullMQ", "Prisma", "PostgreSQL", "Google Gemini"],
    architectureDiagram: "/titan-architecture.png",
    demoVideo: "https://www.youtube.com/embed/ba9X6_ZiT30", // Placeholder for demo
    blogs: [
      {
        title: "The Proxy Nightmare: Why wildcard domains are harder than they look",
        date: "2024-03-15",
        readingTime: "4 min",
        excerpt: "Building a reverse proxy that maps subdomains to S3 buckets is a classic 'weekend project' that turned into a two-week debug session. Here's why.",
        content: `When you build a Vercel clone, the 'magic' is the subdomain. You push code, and you get 'my-app.platform.com'. Sounds easy: just catch the Host header and proxy the request.

But then you hit reality. What happens when a user visits 'my-app.platform.com/static/style.css'? The proxy needs to know exactly which S3 bucket to hit, and it needs to do it in under 10ms. 

I initially tried to use a simple Express middleware for this. Big mistake. The overhead of the Node.js event loop for every single asset request started crawling. I had to move the routing logic into a dedicated, lightweight proxy service. 

The biggest headache? SSL. Handling wildcard certificates for dynamic subdomains while trying to support custom user-owned domains is a different beast entirely. It’s not just about the code; it’s about the infrastructure dance between DNS and your load balancer.`
      },
      {
        title: "Death by 1000 Logs: Scaling real-time build streaming",
        date: "2024-03-20",
        readingTime: "5 min",
        excerpt: "I thought WebSockets were the answer to live logs. I ended up crashing my Redis instance and freezing my browser tabs. This is how I fixed it.",
        content: `In a deployment platform, logs are everything. If the build fails, the user needs to know why, *now*. 

My first attempt: The build worker finishes a line, sends it to the API, which emits a Socket.io event. Total disaster for large projects. Every \`npm install\` generates thousands of lines. 10 users building at once = 50,000 socket events per second. My API server was gasping for air.

The fix was a 'buffer and flush' system. Instead of individual events, I started pushing logs to a Redis stream. A separate consumer picks them up every 200ms, batches them by project ID, and sends them in one big chunk.

On the client side, I had to stop using standard React state for logs. Re-rendering a list of 5,000 items on every new line is a guaranteed browser crash. I switched to a virtualized list that only keeps the last 100 lines in the DOM. Fast, stable, and actually works.`
      },
      {
        title: "Isolation is a Lie: The struggle with Docker-in-Docker builds",
        date: "2024-03-25",
        readingTime: "6 min",
        excerpt: "Running user code is dangerous. Running it inside a container, inside another container, is just asking for a bad time. Let's talk about DinD and security.",
        content: `The heart of the system is the Build Worker. It takes a GitHub repo and turns it into static files. But you can't just run \`rm -rf /\` on my server. Isolation is mandatory.

I went with Docker. But since the worker itself runs in a container, I ended up in 'Docker-in-Docker' (DinD) hell. 

The main issue wasn't just getting it to run—it was cleanup. If a build task timed out or crashed, the nested container would often stay alive, orphaned and eating resources. I found containers running from three days ago still holding onto 2GB of RAM.

I had to build a custom 'Janitor' service that runs alongside the worker. It heartbeats every build and forcibly kills any container whose parent process has died. 

Security-wise, I also learned that 'privileged' mode is a massive hole. Finding the balance between giving Docker enough permissions to build an image while keeping it from escaping to the host machine was the hardest part of this entire project.`
      }
    ],
    architecture: {
      microservices: [
        {
          title: "API Server",
          tech: "Express.js + Socket.io + TypeScript",
          port: 3000,
          responsibilities: [
            "REST API for project/deployment CRUD",
            "WebSocket server for real-time logs",
            "GitHub OAuth 2.0 & Webhook handling",
            "JWT Authentication & Rate Limiting",
          ]
        },
        {
          title: "Build Worker",
          tech: "BullMQ + Docker + TypeScript",
          responsibilities: [
            "Process build jobs from Redis queue",
            "Clone Git repos & build in isolated Docker containers",
            "Upload artifacts to AWS S3",
            "Stream logs via WebSocket & trigger AI on failures",
          ]
        },
        {
          title: "Request Handler",
          tech: "Express + http-proxy-middleware",
          port: 8000,
          responsibilities: [
            "Dynamic subdomain routing & custom domain support",
            "Artifact caching with LRU strategy",
            "SSR proxy for Next.js standalone builds",
            "Usage tracking & static file serving",
          ]
        },
        {
          title: "AI Service",
          tech: "Google Gemini API",
          responsibilities: [
            "Automated build error analysis",
            "Fix suggestions with synthesized code diffs",
            "Conversation management & token tracking",
          ]
        }
      ],
      dataFlow: {
        deployment: [
          { step: 1, description: "User pushes code to GitHub repository." },
          { step: 2, description: "GitHub webhook triggers API Server." },
          { step: 3, description: "API creates deployment record and enqueues Redis job." },
          { step: 4, description: "Build Worker picks up job and clones repository." },
          { step: 5, description: "Worker builds project inside isolated Docker container." },
          { step: 6, description: "Worker uploads build artifacts to AWS S3." },
          { step: 7, description: "Worker updates status to 'ready' and notifies Dashboard via WebSockets." },
        ],
        errorHandling: [
          { step: 1, description: "Build fails within the Worker container." },
          { step: 2, description: "Worker captures comprehensive error logs." },
          { step: 3, description: "Worker sends logs to AI Service (Gemini Integration)." },
          { step: 4, description: "AI analyzes failure and generates a fix suggestion." },
          { step: 5, description: "Worker stores suggestion and notifies user on Dashboard." },
        ]
      },
      infrastructure: [
        { category: "Backend Runtime", items: ["Bun", "TypeScript 5.x"] },
        { category: "Database & Queue", items: ["PostgreSQL 15 (Prisma)", "Redis + BullMQ"] },
        { category: "Storage & Proxy", items: ["AWS S3", "Nginx (Reverse Proxy)", "Let's Encrypt SSL"] },
        { category: "Compute", items: ["AWS EC2 (t3.medium)", "Docker + Docker Compose"] },
      ],
      security: [
        "JWT tokens with 1-hour expiry",
        "GitHub OAuth 2.0 integration",
        "CSRF protection on state-changing requests",
        "Docker container isolation for builds",
        "Secure headers with Helmet.js",
      ],
      performance: [
        "LRU disk caching in Request Handler",
        "Indexed database queries for fast lookups",
        "Stateless API design for horizontal scaling",
        "Queue-based architecture for build management",
      ]
    }
  },
  {
    slug: "coinwala",
    title: "CoinWala",
    description: "Self-custodial Solana wallet platform with Link-based, Google-auth (MPC), and Standard Adapter paradigms.",
    longDescription:
      "CoinWala is a comprehensive Solana wallet platform built with Next.js 14, offering a unique 'bearer instrument' link wallet system. Private keys are derived on-demand from URL hashes using Libsodium's Argon2 KDF, ensuring keys never touch the server. It also features a Google-auth embedded wallet using Web3Auth Single Factor Auth for deterministic MPC key reconstruction, and full support for the standard Solana Wallet Adapter interface.",
    link: "https://coinwala.curiousdev.xyz/",
    github: "https://github.com/itsrsc_/coinwala",
    demoVideo: "/wallet.mov",
    features: [
      "Link-based Wallets (URL hash derived keys)",
      "Google Social Login (MPC/Web3Auth)",
      "Jupiter Aggregator v6 Swap Integration",
      "Real-time Balance & Price Tracking (WebSockets)",
      "Link-based P2P Transfers via Ephemeral Keys",
      "Support for Versioned (v0) & Legacy Transactions",
    ],
    keyHighlights: [
      "Awarded $4,000 Superteam grant for Web3 infrastructure",
      "Reduced wallet onboarding time from 10+ minutes to <30 seconds",
      "Zero-server-access security model for Link-based wallets",
      "Seamless dApp integration via embedded wallet iframe",
    ],
    techStack: ["Next.js 14", "TypeScript", "Solana Web3.js", "Libsodium (Argon2)", "Web3Auth", "Jupiter v6", "CoinGecko"],
    architecture: {
      microservices: [
        {
          title: "Link System",
          tech: "Libsodium + Argon2 + TypeScript",
          responsibilities: [
            "Deterministic key derivation from URL hash fragments",
            "100% client-side key reconstruction (Zero-Knowledge)",
            "Ephemeral key generation for secure P2P transfers",
          ]
        },
        {
          title: "Embedded Wallet",
          tech: "Web3Auth + NextAuth + MPC",
          responsibilities: [
            "Google idToken verifier via Web3Auth SFA",
            "Deterministic MPC key reconstruction across sessions",
            "Secure postMessage-based iframe communication",
          ]
        },
        {
          title: "Swap Engine",
          tech: "Jupiter v6 SDK + Web3.js",
          responsibilities: [
            "Real-time quote fetching from Jupiter aggregator",
            "VersionedTransaction (v0) construction and signing",
            "Mainnet/Devnet token mapping and price fallbacks",
          ]
        }
      ],
      dataFlow: {
        deployment: [
          { step: 1, description: "User generates or reconstructs wallet from URL hash fragment." },
          { step: 2, description: "Frontend derives seed via Argon2 KDF (crypto_pwhash) client-side." },
          { step: 3, description: "Wallet state initialized with Solana RPC and WebSocket connections." },
          { step: 4, description: "Transaction signed locally and broadcast to Solana devnet/mainnet." },
        ],
        errorHandling: [
          { step: 1, description: "Origin whitelist check for iframe-based wallet requests." },
          { step: 2, description: "Graceful fallback for CoinGecko rate limits (429 handling)." },
          { step: 3, description: "Transaction simulation before signing to prevent fund loss." },
        ]
      },
      infrastructure: [
        { category: "Frontend", items: ["Next.js 14 (App Router)", "Tailwind CSS", "Shadcn UI"] },
        { category: "Auth & Security", items: ["Web3Auth (MPC)", "Libsodium (Argon2)", "NextAuth.js"] },
        { category: "Blockchain", items: ["Solana Web3.js", "Jupiter v6", "Solana Wallet Adapter"] },
      ],
      security: [
        "Private keys never touch the server (Link wallets)",
        "MPC key reconstruction via Web3Auth nodes",
        "Strict CORS and postMessage origin whitelisting",
        "Encrypted off-chain metadata for P2P links",
      ],
      performance: [
        "Sub-30s onboarding via social OAuth login",
        "Sub-second state updates via Solana WebSockets",
        "Optimized Argon2 KDF parameters for browser performance",
      ]
    }
  },
  {
    slug: "coinwala-wallet-adapter",
    title: "CoinWala Wallet Adapter SDK",
    description: "A standard Solana wallet adapter that seamlessly integrates CoinWala Wallet functionality into Solana dApps.",
    longDescription:
      "The CoinWala Wallet Adapter SDK provides a production-ready interface for Solana developers to support CoinWala's embedded wallet. It follows the official Solana Wallet Adapter interface, supporting Versioned Transactions (v0), message signing, and real-time state synchronization via WebSockets.",
    link: "https://www.npmjs.com/package/@coinwala/wallet-adapter",
    github: "https://github.com/itsrsc_/coinwala-adapter",
    demoVideo: "/walletextension.mp4",
    features: [
      "Standard Solana Wallet Adapter Compatibility",
      "Support for Versioned (v0) & Legacy Transactions",
      "Real-time WebSocket State Synchronization",
      "Secure Iframe-based Authentication Flow",
    ],
    techStack: ["TypeScript", "Solana Wallet Adapter Base", "Web3.js", "WebSockets"],
  },
  {
    slug: "bridge-vault",
    title: "Bridge Vault",
    isComingSoon: true,
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
