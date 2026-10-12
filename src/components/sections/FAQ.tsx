import { faq as defaultFaq, type FaqItem } from "@/content/faq";
import { faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealText } from "@/components/motion/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Accordion } from "./Accordion";

export function FAQ({
  items = defaultFaq,
  index = "08",
  title = "Questions, answered plainly.",
}: {
  items?: FaqItem[];
  index?: string;
  title?: string;
}) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative border-t border-line py-24 md:py-40">
      <JsonLd data={faqJsonLd(items)} />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-8 lg:col-span-4">
          <SectionLabel index={index}>FAQ</SectionLabel>
          <RevealText id="faq-title" text={title} className="display-md max-w-[14ch]" />
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
