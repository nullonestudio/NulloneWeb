export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tags: string[];
  services: string[]; // service slugs
  summary: string;
  metaDescription: string;
  cover: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "fintech-dashboard-reboot",
    title: "Fintech Dashboard Reboot",
    client: "Fintech lending platform",
    category: "Web Application",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Data Viz", "Design System"],
    services: ["full-stack-web", "custom-software"],
    summary:
      "A ground-up rebuild of a lending platform's operations dashboard — from a slow, cluttered legacy app to a real-time, keyboard-first workspace.",
    metaDescription:
      "Case study: how NullOne rebuilt a fintech operations dashboard in Next.js, cutting load times by 80% and loan review time in half.",
    cover: { src: "/images/work/fintech-dashboard-reboot.jpg", alt: "Monochrome fintech dashboard interface with charts and a loan review table" },
    gallery: [
      { src: "/images/work/fintech-dashboard-reboot-2.jpg", alt: "Fintech dashboard loan pipeline view with status columns" },
      { src: "/images/work/fintech-dashboard-reboot-3.jpg", alt: "Fintech dashboard analytics screen with line charts" },
    ],
    challenge:
      "The operations team reviewed thousands of loan applications a week in a legacy dashboard that took eight seconds to load each page. Critical data was spread across five tabs, and analysts kept a second spreadsheet open just to keep track.",
    solution:
      "We rebuilt the dashboard in Next.js with a typed API layer, a monochrome design system and a keyboard-first review flow. Data streams in real time, every view is filterable and shareable by URL, and the review screen puts everything an analyst needs on one page.",
    results: [
      { value: "80%", label: "Faster page loads" },
      { value: "2x", label: "Loans reviewed per analyst" },
      { value: "0", label: "Spreadsheets left" },
    ],
  },
  {
    slug: "immersive-b2b-sales-demo",
    title: "Immersive B2B Sales Demo",
    client: "Industrial equipment manufacturer",
    category: "AR/VR Experience",
    year: "2025",
    tags: ["Unity", "Meta Quest", "WebXR", "3D"],
    services: ["ar-vr", "game-development"],
    summary:
      "A VR and web-3D product demo that lets a sales team show 12-tonne machinery at true scale in any boardroom.",
    metaDescription:
      "Case study: an immersive VR and WebXR sales demo for heavy machinery that replaced trade-show shipping and shortened the sales cycle.",
    cover: { src: "/images/work/immersive-b2b-sales-demo.jpg", alt: "Wireframe rendering of industrial machinery in a virtual showroom" },
    gallery: [
      { src: "/images/work/immersive-b2b-sales-demo-2.jpg", alt: "Exploded view of a machine's components in VR" },
      { src: "/images/work/immersive-b2b-sales-demo-3.jpg", alt: "Sales representative presenting a 3D product in a browser" },
    ],
    challenge:
      "The client's flagship machines are too large to ship to prospects, and trade-show logistics cost more than a mid-sized deal. Sales relied on brochures that couldn't convey scale or how the machine actually worked.",
    solution:
      "We converted engineering CAD into optimised real-time assets and built a guided VR demo for Meta Quest plus a WebXR version that runs from a link. Reps can explode the machine, run it, and walk prospects through maintenance — all at true scale.",
    results: [
      { value: "35%", label: "Shorter sales cycle" },
      { value: "₹0", label: "Machine shipping for demos" },
      { value: "3x", label: "More demos per rep" },
    ],
  },
  {
    slug: "vex",
    title: "VEX",
    client: "Independent studio",
    category: "Game Development",
    year: "2024",
    tags: ["Unity", "C#", "Mobile", "Multiplayer"],
    services: ["game-development", "mobile-apps"],
    summary:
      "A fast-paced, minimalist arena game for iOS and Android with real-time multiplayer and a striking monochrome art direction.",
    metaDescription:
      "Case study: VEX, a minimalist real-time multiplayer arena game built in Unity for iOS and Android with 60fps on low-end devices.",
    cover: { src: "/images/work/vex.jpg", alt: "Geometric monochrome game arena from the VEX mobile game" },
    gallery: [
      { src: "/images/work/vex-2.jpg", alt: "VEX gameplay with player trails and arena hazards" },
      { src: "/images/work/vex-3.jpg", alt: "VEX match results and leaderboard screen" },
    ],
    challenge:
      "The founders had a compelling prototype but no networking, no meta-game and performance that collapsed on mid-range Android phones — the devices most of their audience used.",
    solution:
      "We rebuilt the core on a deterministic netcode model, designed a progression system, and optimised rendering with GPU instancing and a strict draw-call budget. The minimalist art direction doubled as a performance strategy.",
    results: [
      { value: "60fps", label: "On mid-range Android" },
      { value: "<80ms", label: "Median match latency" },
      { value: "4.7★", label: "Store rating at launch" },
    ],
  },
  {
    slug: "sync",
    title: "Sync",
    client: "Workplace collaboration startup",
    category: "Mobile & Web App",
    year: "2024",
    tags: ["React Native", "Next.js", "Realtime", "Offline-first"],
    services: ["mobile-apps", "full-stack-web"],
    summary:
      "A cross-platform team scheduling app with offline-first sync across iOS, Android and the web.",
    metaDescription:
      "Case study: Sync, an offline-first team scheduling app built with React Native and Next.js, shipped to iOS, Android and web in 14 weeks.",
    cover: { src: "/images/work/sync.jpg", alt: "Sync scheduling app shown on a phone and a laptop" },
    gallery: [
      { src: "/images/work/sync-2.jpg", alt: "Sync weekly schedule view on mobile" },
      { src: "/images/work/sync-3.jpg", alt: "Sync web admin panel for managers" },
    ],
    challenge:
      "Shift-based teams needed a schedule they could trust on site, often with poor connectivity. Existing tools lost changes when phones went offline and created double bookings.",
    solution:
      "We built a shared TypeScript domain layer used by a React Native app and a Next.js admin panel, with a conflict-free sync engine so edits made offline merge cleanly when devices reconnect.",
    results: [
      { value: "14 wks", label: "Idea to three platforms" },
      { value: "99.9%", label: "Sync success rate" },
      { value: "−70%", label: "Scheduling conflicts" },
    ],
  },
  {
    slug: "asme",
    title: "ASME",
    client: "Engineering student chapter",
    category: "Custom Software",
    year: "2024",
    tags: ["Next.js", "Automation", "Dashboards", "AR"],
    services: ["custom-software", "ar-vr"],
    summary:
      "An events and membership platform with automated workflows, live dashboards and an AR exhibit guide.",
    metaDescription:
      "Case study: an events and membership platform for an ASME chapter with automated workflows, live dashboards and an AR exhibit guide.",
    cover: { src: "/images/work/asme.jpg", alt: "Event management dashboard with attendee statistics" },
    gallery: [
      { src: "/images/work/asme-2.jpg", alt: "AR exhibit guide overlay on an engineering project" },
      { src: "/images/work/asme-3.jpg", alt: "Membership workflow automation diagram" },
    ],
    challenge:
      "Volunteers were running registrations, payments, certificates and check-ins across forms, spreadsheets and group chats. Every event meant days of manual work.",
    solution:
      "We delivered a single platform for membership, events and certificates with automated emails, QR check-in, live dashboards for organisers and an AR guide that brings exhibition projects to life.",
    results: [
      { value: "90%", label: "Less manual admin" },
      { value: "2,000+", label: "Check-ins processed" },
      { value: "1 day", label: "To launch a new event" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
