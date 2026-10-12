import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { RevealText, FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "./ProjectCard";
import { ProjectIndex } from "./ProjectIndex";

export function CaseStudies() {
  const featured = projects.slice(0, 2);
  return (
    <section id="work" aria-labelledby="work-title" className="relative border-t border-line py-24 md:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-8">
            <SectionLabel index="03">Selected Work</SectionLabel>
            <RevealText id="work-title" text="Case studies, not just screenshots." className="display-lg max-w-[16ch]" />
          </div>
          <FadeIn>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-secondary transition-colors hover:text-white"
            >
              All projects
              <ArrowUpRight size={14} aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-10">
          {featured.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 120} className={i === 1 ? "md:mt-32" : undefined}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-24 md:mt-36">
          <h3 className="label mb-8">Project index</h3>
          <ProjectIndex projects={projects} />
        </div>
      </div>
    </section>
  );
}
