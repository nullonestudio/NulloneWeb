import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Brackets } from "@/components/ui/Brackets";

export function ProjectCard({
  project,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  headingLevel: H = "h3",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Link href={`/work/${project.slug}`} data-cursor="View" className="group block">
      <Brackets className="p-3" size={18}>
        <ParallaxImage
          src={project.cover.src}
          alt={project.cover.alt}
          sizes={sizes}
          priority={priority}
          className="aspect-[4/3] bg-surface transition-[filter] duration-700 group-hover:brightness-110"
        />
      </Brackets>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="label">
            {project.category} · {project.year}
          </p>
          <H className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">{project.title}</H>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-secondary">{project.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 text-[11px] text-secondary">
                {t}
              </li>
            ))}
          </ul>
        </div>
        <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors duration-500 group-hover:bg-white group-hover:text-black">
          <ArrowUpRight size={16} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
