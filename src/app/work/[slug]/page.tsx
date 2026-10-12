import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn, RevealText } from "@/components/motion/RevealText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Brackets } from "@/components/ui/Brackets";
import { CountUpText } from "@/components/motion/CountUpText";
import { CTA } from "@/components/sections/CTA";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — Case Study`,
    description: project.metaDescription,
    path: `/work/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { default: Story } = await import(`@/content/work/${project.slug}.mdx`);
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — Case Study`,
    description: project.metaDescription,
    url: absoluteUrl(`/work/${project.slug}`),
    image: absoluteUrl(project.cover.src),
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    creator: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={ld} />
      <PageHeader
        label={`${project.category} · ${project.year}`}
        title={project.title}
        intro={project.summary}
        crumbs={[
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ]}
      >
        <FadeIn delay={550}>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
            <div>
              <dt className="label">Client</dt>
              <dd className="mt-2 text-sm">{project.client}</dd>
            </div>
            <div>
              <dt className="label">Year</dt>
              <dd className="mt-2 text-sm">{project.year}</dd>
            </div>
            <div>
              <dt className="label">Services</dt>
              <dd className="mt-2 flex flex-col gap-1 text-sm">
                {project.services.map((s) => {
                  const svc = getService(s);
                  return svc ? (
                    <Link key={s} href={`/services/${s}`} className="underline-offset-4 hover:underline">
                      {svc.shortTitle}
                    </Link>
                  ) : null;
                })}
              </dd>
            </div>
            <div>
              <dt className="label">Stack</dt>
              <dd className="mt-2 text-sm text-secondary">{project.tags.join(", ")}</dd>
            </div>
          </dl>
        </FadeIn>
      </PageHeader>

      <div className="container-x pt-12 md:pt-20">
        <Brackets className="p-3" size={20}>
          <ParallaxImage
            src={project.cover.src}
            alt={project.cover.alt}
            sizes="100vw"
            priority
            reveal={false}
            className="aspect-[16/9] bg-surface"
          />
        </Brackets>
      </div>

      <section aria-labelledby="challenge-title" className="py-24 md:py-36">
        <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionLabel index="01">Challenge</SectionLabel>
            <RevealText id="challenge-title" text="The challenge" className="display-md mt-8" />
            <FadeIn className="mt-8">
              <p className="body-lg">{project.challenge}</p>
            </FadeIn>
          </div>
          <div>
            <SectionLabel index="02">Solution</SectionLabel>
            <RevealText as="h2" text="Our solution" className="display-md mt-8" />
            <FadeIn className="mt-8">
              <p className="body-lg">{project.solution}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section aria-labelledby="results-title" className="border-t border-line">
        <div className="container-x py-20 md:py-28">
          <SectionLabel index="03">Results</SectionLabel>
          <h2 id="results-title" className="sr-only">
            Results
          </h2>
          <dl className="mt-12 grid gap-px bg-line sm:grid-cols-3">
            {project.results.map((r) => (
              <FadeIn key={r.label} className="flex flex-col-reverse gap-3 bg-bg py-10 sm:px-8">
                <dt className="label">{r.label}</dt>
                <dd className="font-display text-5xl font-light tracking-tight md:text-7xl">
                  <CountUpText text={r.value} />
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Project story" className="border-t border-line py-24 md:py-36">
        <div className="container-x">
          <article className="prose-nullone mx-auto max-w-3xl">
            <Story />
          </article>
        </div>
      </section>

      <section aria-labelledby="gallery-title" className="border-t border-line py-24 md:py-36">
        <div className="container-x">
          <SectionLabel index="04">Gallery</SectionLabel>
          <h2 id="gallery-title" className="sr-only">
            Gallery
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {project.gallery.map((g, i) => (
              <FadeIn key={g.src} delay={i * 120} className={i === 1 ? "md:mt-24" : undefined}>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="More case studies" className="border-t border-line">
        <div className="container-x flex flex-col justify-between gap-8 py-16 md:flex-row md:items-center md:py-24">
          <Link href="/work" className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.2em] text-secondary hover:text-white">
            <ArrowLeft size={14} aria-hidden className="transition-transform group-hover:-translate-x-1" /> All work
          </Link>
          <Link href={`/work/${next.slug}`} data-cursor="View" className="group text-right">
            <span className="label">Next project</span>
            <span className="mt-3 flex items-center justify-end gap-4 font-display text-3xl font-medium tracking-tight md:text-6xl">
              {next.title}
              <ArrowUpRight className="h-8 w-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-12 md:w-12" strokeWidth={1.25} aria-hidden />
            </span>
          </Link>
        </div>
      </nav>

      <CTA />
    </>
  );
}
