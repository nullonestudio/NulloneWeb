import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FadeIn } from "@/components/motion/RevealText";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — Case Studies",
  description:
    "Case studies from NullOne Solutions: fintech dashboards, VR sales demos, multiplayer games, offline-first mobile apps and custom software platforms.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="Work"
        title="Software that moved the needle."
        intro="A selection of web, mobile, game, AR/VR and custom software projects — and the results they delivered."
        crumbs={[{ name: "Work", path: "/work" }]}
      />
      <section aria-label="Case studies" className="py-20 md:py-32">
        <ul className="container-x grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {projects.map((p, i) => (
            <FadeIn as="li" key={p.slug} className={i % 2 === 1 ? "md:mt-32" : undefined}>
              <ProjectCard project={p} priority={i < 2} headingLevel="h2" />
            </FadeIn>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
