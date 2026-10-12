import type { Metadata } from "next";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { FadeIn } from "@/components/motion/RevealText";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = pageMetadata({
  title: "Software Development Services",
  description:
    "Web, mobile, game, AR/VR and custom software development services from NullOne Solutions — a senior software development agency in India.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Software development services, end to end."
        intro="Five disciplines under one roof — so your website, app, game or internal tool is designed, built and supported by one accountable team."
        crumbs={[{ name: "Services", path: "/services" }]}
      />
      <section aria-label="All services" className="py-20 md:py-32">
        <ul className="container-x grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((s, i) => (
            <FadeIn as="li" key={s.slug} delay={(i % 3) * 100}>
              <ServiceCard service={s} index={i} />
            </FadeIn>
          ))}
        </ul>
      </section>
      <Process />
      <CTA />
    </>
  );
}
