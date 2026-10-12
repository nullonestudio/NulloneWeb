export type PostMeta = {
  slug: string;
  title: string;
  /** ≤155 chars */
  description: string;
  date: string; // ISO
  updated?: string;
  readingTime: string;
  tags: string[];
  author: string;
};

/** Add a post: create `src/content/blog/<slug>.mdx` and register its metadata here. */
export const posts: PostMeta[] = [
  {
    slug: "how-to-choose-a-software-development-agency-in-india",
    title: "How to Choose a Software Development Agency in India",
    description:
      "A practical checklist for choosing a software development agency in India — from scoping and pricing to code ownership, communication and support.",
    date: "2026-09-18",
    readingTime: "7 min read",
    tags: ["Hiring an agency", "Process"],
    author: "Mustafa Abbas",
  },
  {
    slug: "nextjs-for-business-websites",
    title: "Why We Build Business Websites with Next.js",
    description:
      "Why a Next.js development agency recommends it for marketing sites and web apps: SEO, Core Web Vitals, scalability and a single codebase.",
    date: "2026-08-27",
    readingTime: "6 min read",
    tags: ["Web development", "Next.js", "SEO"],
    author: "Mirza Shah Hussain",
  },
  {
    slug: "ar-vr-for-business-use-cases",
    title: "AR/VR for Business: 4 Use Cases That Actually Pay Off",
    description:
      "Where AR and VR deliver real ROI for businesses — training, product demos, real estate and retail — and how to scope your first immersive project.",
    date: "2026-07-30",
    readingTime: "8 min read",
    tags: ["AR/VR", "Strategy"],
    author: "Mustafa Abbas",
  },
];

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
