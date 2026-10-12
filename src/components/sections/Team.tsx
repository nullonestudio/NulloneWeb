import Image from "next/image";
import { team } from "@/content/team";
import { RevealText, FadeIn } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Brackets } from "@/components/ui/Brackets";

export function Team({ index = "07" }: { index?: string }) {
  const featured = team.filter((m) => m.featured);
  const others = team.filter((m) => !m.featured);
  return (
    <section id="team" aria-labelledby="team-title" className="relative border-t border-line py-24 md:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8">
          <SectionLabel index={index}>Team</SectionLabel>
          <RevealText id="team-title" text="Small senior team. Big output." className="display-lg max-w-[14ch]" />
        </div>

        <ul className="mt-16 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-8">
          {featured.map((m, i) => (
            <FadeIn as="li" key={m.name} delay={i * 120} className="group">
              <Brackets className="p-3" size={18}>
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={m.image.src}
                    alt={m.image.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover grayscale contrast-[0.95] transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:contrast-125"
                  />
                </div>
              </Brackets>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{m.name}</h3>
                  {m.bio ? <p className="mt-3 max-w-sm text-sm leading-relaxed text-secondary">{m.bio}</p> : null}
                </div>
                <p className="label shrink-0">{m.role}</p>
              </div>
            </FadeIn>
          ))}
        </ul>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-24 md:grid-cols-4 md:gap-6">
          {others.map((m, i) => (
            <FadeIn as="li" key={m.name} delay={i * 80} className="group">
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  fill
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="object-cover grayscale contrast-[0.95] transition-[filter] duration-700 group-hover:contrast-125"
                />
              </div>
              <h3 className="mt-4 font-display text-base font-medium md:text-lg">{m.name}</h3>
              <p className="mt-1 text-sm text-secondary">{m.role}</p>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
