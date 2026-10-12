# NullOne Solutions — Marketing Website

Production marketing site for **NullOne Solutions**, a software development agency (Web • Mobile • Games • AR/VR • Custom Software).

**Stack:** Next.js 15 (App Router, RSC) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · GSAP + ScrollTrigger (`@gsap/react`) · Lenis · React Three Fiber + drei · `@next/mdx` · react-hook-form + zod · Resend · lucide-react · qrcode.react · Vercel Analytics & Speed Insights.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — everything works without keys
npm run dev                   # http://localhost:3000
```

| Script              | What it does                               |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Dev server                                 |
| `npm run build`     | Production build (static + 2 API routes)   |
| `npm run start`     | Serve the production build                 |
| `npm run lint`      | ESLint (flat config, `next/core-web-vitals`) |
| `npm run typecheck` | `tsc --noEmit`                             |

Requires Node 18.18+ (Node 20/22 recommended).

## Environment variables

| Variable                              | Required | Purpose                                                                  |
| ------------------------------------- | -------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                | No       | Canonical origin, sitemap, OG URLs. Defaults to `https://nullone.vercel.app` |
| `RESEND_API_KEY`                      | No\*     | Sends contact-form and newsletter emails. \*Without it, submissions are logged server-side and the form still succeeds. |
| `CONTACT_TO_EMAIL`                    | No       | Inbox that receives enquiries (default `hello@nullone.vercel.app`)       |
| `CONTACT_FROM_EMAIL`                  | No       | Verified Resend sender, e.g. `NullOne <hello@yourdomain.com>`            |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`| No       | Google Search Console token → `<meta name="google-site-verification">`   |

## Deploying to Vercel

1. Push this repo to GitHub and **Import Project** in Vercel (framework preset: Next.js — no config needed).
2. Add the environment variables above under *Settings → Environment Variables*.
3. Deploy. Vercel Analytics and Speed Insights activate automatically (they're only rendered when `VERCEL` is set).
4. In Resend, verify your sending domain and set `CONTACT_FROM_EMAIL` to an address on it.
5. When you move to a custom domain, update `NEXT_PUBLIC_SITE_URL` and redeploy so canonicals, sitemap and OG URLs follow.
6. Submit `https://<domain>/sitemap.xml` in Google Search Console.

## Project structure

```
src/
  app/                 routes, metadata, sitemap/robots/manifest, OG images, API routes
    template.tsx       route transition (black curtain + Ø)
    api/contact        zod-validated enquiry → Resend (honeypot protected)
    api/newsletter     newsletter signup → Resend
  components/
    ui/                Logo (animatable SVG), MagneticButton, SectionLabel, Brackets, Watermark, …
    sections/          Hero, Marquee, About, Services, CaseStudies, WhyUs, Process, Stats, Testimonials, Team, FAQ, CTA, ContactForm
    layout/            Navbar, MobileMenu, Footer, Preloader, CustomCursor, PageHeader, LegalPage
    motion/            RevealText/FadeIn, RevealObserver, SmoothScroll, HorizontalScroll, ProcessTimeline, ParallaxImage, CountUp, TiltCard
    three/             HeroParticles (R3F, lazy loaded)
    seo/               JsonLd
  content/             all copy as typed data + MDX
  lib/                 site config, SEO helpers, OG renderer, contact schema, utils
public/images          case-study art and team portraits
scripts/               generate-assets.mjs (regenerates placeholder imagery/icons)
```

## Editing content

All copy lives in `src/content` — no component changes needed.

| What                         | Where                                                         |
| ---------------------------- | ------------------------------------------------------------- |
| Contact details, nav, footer | `src/lib/site.ts`                                             |
| Hero, About, Why Us, Process, CTA, client marquee | `src/content/home.ts`                    |
| Services (+ `/services/[slug]` pages) | `src/content/services.ts`                            |
| Case studies (+ `/work/[slug]`) | `src/content/projects.ts` + story body in `src/content/work/<slug>.mdx` |
| Team                         | `src/content/team.ts` (photos in `public/images/team/`)       |
| Testimonials / FAQ / Stats   | `src/content/testimonials.ts`, `faq.ts`, `stats.ts`           |
| Blog posts                   | Register metadata in `src/content/blog/posts.ts`, write body in `src/content/blog/<slug>.mdx` |

New services, projects and posts are picked up automatically by `generateStaticParams`, the sitemap and OG images.

**Images:** the case-study artwork and team portraits in `public/images` are generated, on-brand placeholders (`node scripts/generate-assets.mjs`, needs Playwright). Replace them with real screenshots and photos at the same paths (case studies 4:3, portraits 4:5) — `next/image` serves AVIF/WebP automatically. Update the `alt` text in the content files when you do. The non-founder team entries are role placeholders; replace them with real names.

## SEO

- Metadata API on every route via `pageMetadata()` (`src/lib/seo.ts`): unique title/description, canonical, Open Graph, Twitter. Title template `%s | NullOne Solutions`.
- Dynamic OG images (`next/og`, Sora font vendored in `src/assets/fonts`) for the home page, every service, case study and blog post.
- JSON-LD: Organization, WebSite, ProfessionalService (root layout); Service (service pages); FAQPage (FAQ sections); BreadcrumbList (inner pages); Article (blog); CreativeWork (case studies).
- `sitemap.xml`, `robots.txt` (disallows `/api/`), `manifest.webmanifest`, `icon.svg`, `apple-icon.png`.
- One `<h1>` per page, landmarks, skip link, breadcrumbs, internal links between services ↔ work ↔ blog.

## Motion & performance notes

- **Content is always in the server HTML.** A tiny inline script adds `html.js` before paint; only then are reveal styles applied. If the app hasn't hydrated within 4s, the class is removed so nothing stays hidden. `RevealObserver` is a single IntersectionObserver for every `[data-reveal]` element, so headings and sections stay Server Components.
- Preloader is CSS-driven (plays before hydration), ≤1.5s, once per session, skipped for reduced motion.
- Three.js loads only after `window.load` + idle, on ≥768px screens, without data-saver or reduced motion; it pauses when the hero is off-screen.
- The custom cursor is only downloaded on fine, hover-capable pointers.
- Lenis is driven by GSAP's ticker so ScrollTrigger stays in sync; all triggers are cleaned up via `useGSAP` / `gsap.matchMedia`.
- `prefers-reduced-motion` disables Lenis, the preloader, pinning, parallax, tilt and particles, and reduces reveals to fades.
