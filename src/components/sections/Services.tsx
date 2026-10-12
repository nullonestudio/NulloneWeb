import { services } from "@/content/services";
import { RevealText, FadeIn } from "@/components/motion/RevealText";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative border-t border-line">
      <HorizontalScroll trackClassName="flex flex-col lg:h-[100svh] lg:w-max lg:flex-row lg:items-center">
        <div className="container-x flex shrink-0 flex-col justify-center gap-8 pb-12 pt-24 md:pt-32 lg:h-full lg:w-[44vw] lg:max-w-none lg:py-0 lg:pr-16">
          <SectionLabel index="02">Services</SectionLabel>
          <RevealText id="services-title" text="Five disciplines. One team that ships." className="display-lg max-w-[14ch]" />
          <FadeIn>
            <p className="body-lg max-w-md">
              Whatever you&apos;re building, we bring the right specialists to the table and keep one senior team accountable from first call to launch.
            </p>
          </FadeIn>
        </div>
        <ul className="container-x grid gap-4 pb-24 sm:grid-cols-2 md:pb-32 lg:flex lg:h-full lg:w-auto lg:max-w-none lg:items-center lg:gap-6 lg:px-0 lg:py-0 lg:pr-[8vw]">
          {services.map((s, i) => (
            <li key={s.slug} className="lg:h-[64vh] lg:max-h-[36rem] lg:w-[26rem] xl:w-[28rem]">
              <ServiceCard service={s} index={i} />
            </li>
          ))}
        </ul>
      </HorizontalScroll>
    </section>
  );
}
