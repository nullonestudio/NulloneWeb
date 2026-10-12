import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getService, services } from "@/content/services";
import { projects } from "@/content/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn, RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceIcon } from "@/components/ui/icons";
import { Brackets } from "@/components/ui/Brackets";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedWork.map((s) => projects.find((p) => p.slug === s)).filter((p) => !!p);
  const others = services.filter((s) => s.slug !== service.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: siteConfig.name },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.shortTitle} deliverables`,
      itemListElement: service.builds.map((b) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: b.title, description: b.description },
      })),
    },
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHeader
        label={`Services · ${service.shortTitle}`}
        title={service.title}
        intro={service.summary}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ]}
      >
        <FadeIn delay={550} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="/contact">
            Start a Project <ArrowUpRight size={16} aria-hidden />
          </MagneticButton>
          <span className="flex items-center gap-3 text-sm text-secondary">
            <ServiceIcon name={service.icon} className="h-5 w-5" /> {service.tagline}
          </span>
        </FadeIn>
      </PageHeader>

      {/* Problem */}
      <section aria-labelledby="problem-title" className="py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel index="01">The problem</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <RevealText id="problem-title" text={service.problem.heading} className="display-md max-w-[24ch]" />
            <FadeIn className="mt-8">
              <p className="body-lg max-w-2xl">{service.problem.body}</p>
            </FadeIn>
            <ul className="mt-10 border-t border-line">
              {service.problem.points.map((p) => (
                <FadeIn as="li" key={p} className="flex gap-4 border-b border-line py-5 text-secondary">
                  <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                  {p}
                </FadeIn>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section aria-labelledby="builds-title" className="border-t border-line py-24 md:py-36">
        <div className="container-x">
          <div className="flex flex-col gap-8">
            <SectionLabel index="02">What we build</SectionLabel>
            <RevealText id="builds-title" text={`${service.shortTitle}, built properly.`} className="display-md" />
          </div>
          <ul className="mt-14 grid gap-px bg-line md:grid-cols-2">
            {service.builds.map((b, i) => (
              <FadeIn as="li" key={b.title} delay={(i % 2) * 100} className="bg-bg p-7 md:p-10">
                <p className="label text-muted-text">0{i + 1}</p>
                <h3 className="mt-6 font-display text-xl font-medium md:text-2xl">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">{b.description}</p>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech stack */}
      <section aria-labelledby="stack-title" className="border-t border-line py-24 md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-8 lg:col-span-4">
            <SectionLabel index="03">Tech stack</SectionLabel>
            <RevealText id="stack-title" text="Proven tools, chosen for your project." className="display-md max-w-[14ch]" />
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {service.stack.map((g) => (
              <FadeIn key={g.group}>
                <Brackets className="h-full p-6">
                  <h3 className="label">{g.group}</h3>
                  <ul className="mt-6 flex flex-col gap-3">
                    {g.items.map((it) => (
                      <li key={it} className="font-display text-lg">
                        {it}
                      </li>
                    ))}
                  </ul>
                </Brackets>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="svc-process-title" className="border-t border-line py-24 md:py-36">
        <div className="container-x">
          <div className="flex flex-col gap-8">
            <SectionLabel index="04">How we work</SectionLabel>
            <RevealText id="svc-process-title" text="A process built for momentum." className="display-md" />
          </div>
          <ol className="mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <FadeIn as="li" key={p.title} delay={i * 100} className="bg-bg p-7 md:p-8">
                <p className="font-display text-5xl font-light text-white/80">0{i + 1}</p>
                <h3 className="mt-8 font-display text-xl font-medium">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">{p.description}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Related work */}
      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line py-24 md:py-36">
          <div className="container-x">
            <div className="flex flex-col gap-8">
              <SectionLabel index="05">Related work</SectionLabel>
              <RevealText id="related-title" text="Proof, not promises." className="display-md" />
            </div>
            <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
              {related.map((p) => (
                <FadeIn key={p.slug}>
                  <ProjectCard project={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FAQ items={service.faq} index="06" title={`${service.shortTitle} FAQ`} />

      {/* Other services — internal linking */}
      <nav aria-labelledby="other-services" className="border-t border-line py-20">
        <div className="container-x">
          <h2 id="other-services" className="label">
            Other services
          </h2>
          <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <li key={s.slug} className="bg-bg">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-surface"
                >
                  <span className="flex items-center gap-3">
                    <ServiceIcon name={s.icon} className="h-5 w-5 text-secondary" />
                    <span className="font-display">{s.shortTitle}</span>
                  </span>
                  <ArrowUpRight size={14} aria-hidden className="text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CTA heading={`Ready to start your ${service.shortTitle} project?`} />
    </>
  );
}
