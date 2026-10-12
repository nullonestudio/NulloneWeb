import { testimonials } from "@/content/testimonials";
import { clients } from "@/content/home";
import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Marquee } from "./Marquee";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="relative overflow-hidden border-t border-line py-24 md:py-40">
      <div className="container-x">
        <div className="flex flex-col gap-8">
          <SectionLabel index="06">Testimonials</SectionLabel>
          <RevealText id="testimonials-title" text="Clients who stopped worrying about software." className="display-lg max-w-[18ch]" />
        </div>
        <div className="mt-16 md:mt-20">
          <TestimonialsCarousel items={testimonials} />
        </div>
      </div>
      <div className="mt-24 border-y border-line py-8 md:mt-32">
        <Marquee items={clients} size="sm" duration={30} reverse label="Industries and clients we have worked with" />
      </div>
    </section>
  );
}
