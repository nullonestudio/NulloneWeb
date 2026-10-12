export type ServiceIcon = "web" | "mobile" | "games" | "xr" | "custom";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  title: string;
  shortTitle: string;
  /** ≤60 chars incl. template suffix where possible */
  metaTitle: string;
  /** ≤155 chars */
  metaDescription: string;
  tagline: string;
  summary: string;
  keywords: string[];
  problem: { heading: string; body: string; points: string[] };
  builds: { title: string; description: string }[];
  stack: { group: string; items: string[] }[];
  process: { title: string; description: string }[];
  relatedWork: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "full-stack-web",
    icon: "web",
    title: "Full Stack Web Development",
    shortTitle: "Full Stack Web",
    metaTitle: "Full Stack Web & Next.js Development",
    metaDescription:
      "Next.js development agency building fast, SEO-ready websites, web apps and SaaS platforms with React, Next.js and Node.js — from landing page to scale.",
    tagline: "From landing pages to SaaS platforms.",
    summary:
      "React, Next.js and Node.js products engineered for speed, search and scale — from a high-converting landing page to a multi-tenant SaaS platform.",
    keywords: ["web development company", "Next.js development agency", "React development", "SaaS development"],
    problem: {
      heading: "Most websites are slow, fragile and impossible to change.",
      body: "Template builders hit a ceiling fast, and agency code often arrives undocumented and over-engineered. You end up paying twice: once to build it, and again every time you need to change it.",
      points: [
        "Pages that load in seconds, not milliseconds — and lose rankings for it",
        "Backends that can't handle growth without a rewrite",
        "No one on your team who can confidently ship a change",
      ],
    },
    builds: [
      { title: "Marketing sites & landing pages", description: "Server-rendered, Lighthouse-95+ pages built to rank and convert." },
      { title: "Web applications", description: "Dashboards, portals and internal tools with clean, typed codebases." },
      { title: "SaaS platforms", description: "Auth, billing, multi-tenancy and admin — the boring parts done right." },
      { title: "APIs & backends", description: "Node.js services, REST and GraphQL APIs, queues and integrations." },
    ],
    stack: [
      { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "Redis"] },
      { group: "Infrastructure", items: ["Vercel", "AWS", "Docker", "GitHub Actions"] },
    ],
    process: [
      { title: "Scope", description: "We map pages, user flows and integrations into a fixed, written plan." },
      { title: "Design system", description: "A component library in Figma that maps one-to-one to code." },
      { title: "Build in sprints", description: "Weekly preview deployments so you see progress, not status reports." },
      { title: "Launch & hand-off", description: "Performance budget, SEO audit, docs and a recorded walkthrough." },
    ],
    relatedWork: ["fintech-dashboard-reboot", "sync"],
    faq: [
      { question: "Why do you recommend Next.js?", answer: "Next.js gives you server rendering for SEO, static generation for speed and a single codebase for frontend and API routes. It's the most practical default for marketing sites and web apps alike." },
      { question: "Can you take over an existing codebase?", answer: "Yes. We start with a short paid audit, document what exists, fix the riskiest issues first and then continue development." },
      { question: "Will we own the code?", answer: "Always. You get the full repository, infrastructure access and documentation from day one." },
    ],
  },
  {
    slug: "mobile-apps",
    icon: "mobile",
    title: "Mobile App Development",
    shortTitle: "Mobile Apps",
    metaTitle: "Mobile App Development Company (iOS & Android)",
    metaDescription:
      "Mobile app development company building native and cross-platform iOS and Android apps with React Native, Flutter, Swift and Kotlin — designed, built and shipped.",
    tagline: "Native & cross-platform iOS and Android.",
    summary:
      "Native and cross-platform iOS and Android apps that feel fast, look sharp and make it through App Store review the first time.",
    keywords: ["mobile app development company", "iOS app development", "Android app development", "React Native agency"],
    problem: {
      heading: "Two platforms, twice the cost — unless you plan it right.",
      body: "Many teams build separate iOS and Android apps that drift apart, or ship a cross-platform app that feels cheap. The right architecture choice up front saves months.",
      points: [
        "Choosing between native and cross-platform without real trade-offs on the table",
        "Store rejections and release delays",
        "Apps that work in the demo but crash in the field",
      ],
    },
    builds: [
      { title: "Consumer apps", description: "Polished onboarding, payments, push notifications and analytics." },
      { title: "Business & field apps", description: "Offline-first apps for teams on the move, synced to your systems." },
      { title: "Companion apps", description: "Apps that pair with hardware, wearables or your web platform." },
      { title: "MVPs", description: "A focused first version in weeks, built to grow rather than be thrown away." },
    ],
    stack: [
      { group: "Cross-platform", items: ["React Native", "Expo", "Flutter"] },
      { group: "Native", items: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose"] },
      { group: "Services", items: ["Firebase", "Supabase", "RevenueCat", "Sentry"] },
    ],
    process: [
      { title: "Platform decision", description: "A clear recommendation on native vs cross-platform with costs attached." },
      { title: "Prototype", description: "A clickable prototype tested on real devices before we write production code." },
      { title: "Build & test", description: "TestFlight and internal tracks every week so you can hold the app in your hand." },
      { title: "Store launch", description: "Listings, screenshots, review submission and crash monitoring." },
    ],
    relatedWork: ["sync", "asme"],
    faq: [
      { question: "Native or cross-platform?", answer: "For most business apps, cross-platform (React Native or Flutter) delivers both platforms for roughly the cost of one. We recommend native when you need heavy device APIs or top-tier graphics." },
      { question: "Do you handle App Store and Play Store submission?", answer: "Yes. We prepare listings, privacy declarations and builds, and manage the review process through to approval." },
      { question: "Can the app work offline?", answer: "Yes. We design offline-first data layers that sync safely when the connection returns." },
    ],
  },
  {
    slug: "game-development",
    icon: "games",
    title: "Game Development",
    shortTitle: "Game Development",
    metaTitle: "Game Development Studio — Unity & Unreal",
    metaDescription:
      "Game development studio building Unity and Unreal games for mobile, PC and console — plus serious games, gamified apps and interactive brand experiences.",
    tagline: "Unity & Unreal, mobile to PC and console.",
    summary:
      "Unity and Unreal games for mobile, PC and console — from casual titles and serious games to interactive brand experiences.",
    keywords: ["game development studio", "Unity developers", "Unreal Engine development", "mobile game development"],
    problem: {
      heading: "Great game ideas die in production.",
      body: "Games combine art, engineering, design and performance tuning. Without a team that has shipped before, scope creeps and the fun gets lost.",
      points: [
        "Prototypes that never find the fun",
        "Performance problems discovered too late on target hardware",
        "No plan for live ops, analytics or updates after launch",
      ],
    },
    builds: [
      { title: "Mobile games", description: "Casual and mid-core titles optimised for low-end and high-end devices." },
      { title: "PC & console", description: "Unreal and Unity productions with platform-ready builds." },
      { title: "Serious games", description: "Training, education and simulation games with measurable outcomes." },
      { title: "Brand experiences", description: "Playable ads, web games and event activations." },
    ],
    stack: [
      { group: "Engines", items: ["Unity", "Unreal Engine 5", "Godot"] },
      { group: "Languages", items: ["C#", "C++", "Blueprints"] },
      { group: "Live ops", items: ["PlayFab", "Firebase", "GameAnalytics"] },
    ],
    process: [
      { title: "Find the fun", description: "A rapid greybox prototype that proves the core loop." },
      { title: "Vertical slice", description: "One polished level that sets the quality bar for everything else." },
      { title: "Production", description: "Content, systems and optimisation in milestone builds." },
      { title: "Launch & live ops", description: "Store releases, analytics and an update roadmap." },
    ],
    relatedWork: ["vex", "immersive-b2b-sales-demo"],
    faq: [
      { question: "Unity or Unreal?", answer: "Unity is usually best for mobile and stylised games; Unreal shines for high-fidelity PC and console visuals. We'll recommend based on your platform, art style and team." },
      { question: "Do you provide art and sound?", answer: "Yes, through our in-house artists and a trusted network of animators and audio designers." },
      { question: "Can you help after launch?", answer: "We offer live-ops retainers covering updates, events, balancing and platform maintenance." },
    ],
  },
  {
    slug: "ar-vr",
    icon: "xr",
    title: "AR/VR Experiences",
    shortTitle: "AR/VR Experiences",
    metaTitle: "AR/VR Development Company",
    metaDescription:
      "AR/VR development company creating immersive training, product demos, real estate walkthroughs and retail experiences for Quest, Vision Pro, mobile and web.",
    tagline: "Training, product demos, real estate, retail.",
    summary:
      "Immersive AR and VR for training, product demos, real estate and retail — on headsets, phones and the browser.",
    keywords: ["AR/VR development company", "VR training", "WebXR", "augmented reality app"],
    problem: {
      heading: "Immersive tech is powerful — when it solves a real problem.",
      body: "Too many XR projects are expensive demos that get used once. We start from the business outcome — faster training, more closed deals, fewer site visits — and work backwards.",
      points: [
        "Hardware choices made before the use case is clear",
        "Experiences that make users motion-sick or confused",
        "No way to measure whether it worked",
      ],
    },
    builds: [
      { title: "VR training", description: "Safe, repeatable simulations with scoring and analytics." },
      { title: "Product demos", description: "Show complex or heavy products anywhere, at true scale." },
      { title: "Real estate walkthroughs", description: "Sell spaces before they are built, on headset or web." },
      { title: "Retail AR", description: "Try-ons and in-room previews that reduce returns." },
    ],
    stack: [
      { group: "Engines", items: ["Unity", "Unreal Engine", "Three.js"] },
      { group: "Platforms", items: ["Meta Quest", "Apple Vision Pro", "ARKit", "ARCore"] },
      { group: "Web", items: ["WebXR", "React Three Fiber", "8th Wall"] },
    ],
    process: [
      { title: "Outcome first", description: "Define the metric — time-to-competency, conversion, visits saved." },
      { title: "Comfort prototype", description: "Test interaction and comfort on target hardware early." },
      { title: "Content build", description: "3D assets, interactions and analytics hooks." },
      { title: "Deploy", description: "Device management, store or web distribution, and training for your team." },
    ],
    relatedWork: ["immersive-b2b-sales-demo", "asme"],
    faq: [
      { question: "Which headsets do you support?", answer: "Meta Quest, Apple Vision Pro, Pico and PC VR, plus mobile AR on iOS and Android and browser-based WebXR." },
      { question: "Do users need to install an app?", answer: "Not necessarily. WebXR and web-based 3D run straight from a link, which is ideal for sales and marketing." },
      { question: "Can you work from our CAD files?", answer: "Yes. We optimise CAD and BIM data into real-time assets that run smoothly on headsets and phones." },
    ],
  },
  {
    slug: "custom-software",
    icon: "custom",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    metaTitle: "Custom Software Development — ERP & Automation",
    metaDescription:
      "Custom software development for ERP, workflow automation, dashboards and system integrations — software shaped around how your business actually works.",
    tagline: "ERP, automation, dashboards, integrations.",
    summary:
      "ERP systems, workflow automation, dashboards and integrations — software shaped around how your business actually works.",
    keywords: ["custom software development", "ERP development", "business automation", "dashboard development"],
    problem: {
      heading: "Your business has outgrown spreadsheets and off-the-shelf tools.",
      body: "Teams copy data between systems by hand, reports take days, and every new tool adds another login. Custom software removes the busywork and gives you one source of truth.",
      points: [
        "Manual data entry across disconnected tools",
        "Reports that are out of date by the time they're read",
        "SaaS licences that cost more every year and still don't fit",
      ],
    },
    builds: [
      { title: "ERP & operations", description: "Inventory, orders, HR and finance modules built around your process." },
      { title: "Automation", description: "Replace repetitive tasks with reliable, monitored workflows." },
      { title: "Dashboards", description: "Real-time reporting that pulls from every system you use." },
      { title: "Integrations", description: "Connect CRMs, payment gateways, accounting and legacy systems." },
    ],
    stack: [
      { group: "Application", items: ["TypeScript", "Node.js", "Python", "Go"] },
      { group: "Data", items: ["PostgreSQL", "BigQuery", "Metabase", "dbt"] },
      { group: "Integration", items: ["REST", "GraphQL", "Webhooks", "Zapier / n8n"] },
    ],
    process: [
      { title: "Process mapping", description: "We sit with your team and map how work really flows today." },
      { title: "Blueprint", description: "Data model, screens and integrations in a fixed-scope plan." },
      { title: "Incremental rollout", description: "Ship module by module so value arrives early and risk stays low." },
      { title: "Training & support", description: "Documentation, team training and an ongoing support plan." },
    ],
    relatedWork: ["fintech-dashboard-reboot", "asme"],
    faq: [
      { question: "Is custom software worth it over SaaS?", answer: "When off-the-shelf tools force you into workarounds, licence costs keep climbing, or your process is your competitive edge, custom software usually pays for itself within a year or two." },
      { question: "Can you integrate with our existing systems?", answer: "Yes — we regularly connect to ERPs, CRMs, accounting software, payment gateways and legacy databases." },
      { question: "How do you keep data secure?", answer: "Role-based access, encryption in transit and at rest, audit logs and regular dependency and security reviews." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
