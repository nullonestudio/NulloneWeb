import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { ServiceIcon } from "@/components/ui/icons";
import { TraceLine } from "@/components/ui/Brackets";
import { TiltCard } from "@/components/motion/TiltCard";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/services/${service.slug}`}
        data-cursor="View"
        className="trace group flex h-full min-h-[22rem] flex-col lg:min-h-0 justify-between gap-10 border border-line bg-surface p-7 transition-colors duration-500 hover:bg-surface-2 md:min-h-[28rem] md:p-10"
      >
        <TraceLine />
        <div className="flex items-start justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-line-strong transition-colors duration-500 group-hover:border-white">
            <ServiceIcon name={service.icon} className="h-6 w-6" />
          </span>
          <span className="label text-muted-text">0{index + 1}</span>
        </div>
        <div className="[transform:translateZ(30px)]">
          <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{service.shortTitle}</h3>
          <p className="mt-2 text-sm text-white/70">{service.tagline}</p>
          <p className="mt-5 text-sm leading-relaxed text-secondary md:text-[15px]">{service.summary}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white">
            Learn more
            <ArrowUpRight size={14} aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">about {service.title}</span>
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}
