export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nullonesolutions.com/").replace(/\/$/, "");

export const siteConfig = {
  name: "NullOne Solutions",
  shortName: "NullOne",
  url: siteUrl,
  title: "NullOne Solutions – Web, Mobile, Game & AR/VR Development Agency",
  description:
    "Software development agency in India building full-stack web apps, mobile apps, games, AR/VR experiences and custom software. Fast, transparent, on time.",
  tagline: "No jargon. No gatekeeping. Just great software, delivered on time.",
  label: "Software Development Agency",
  locale: "en_IN",
  keywords: [
    "software development agency India",
    "web development company",
    "Next.js development agency",
    "mobile app development company",
    "game development studio",
    "AR/VR development company",
    "custom software development",
  ],
  contact: {
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    email: "hello@nullonesolutions.com",
    website: "https://nullonesolutions.com",
    linkedin: "linkedin.com/company/nullone-solutions",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/nullone-solutions",
  },
  serviceLine: ["Web", "Mobile", "Games", "AR/VR", "Custom Software"],
  foundingYear: 2024,
  copyrightYear: 2026,
} as const;

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Process", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
    { label: "Start a Project", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
