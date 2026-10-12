import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealText, FadeIn } from "@/components/motion/RevealText";
import { Watermark } from "@/components/ui/Watermark";

/** Inner-page hero: visible breadcrumbs (+ BreadcrumbList JSON-LD), eyebrow, single H1, intro. */
export function PageHeader({
  title,
  label,
  intro,
  crumbs,
  children,
}: {
  title: string;
  label: string;
  intro?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <header className="relative overflow-hidden border-b border-line pb-16 pt-32 md:pb-24 md:pt-44">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Watermark spin className="-right-[20rem] -top-20 h-[36rem] w-[36rem] md:-right-[16rem] md:h-[48rem] md:w-[48rem]" />
      <div className="container-x relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-muted-text">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden>/</span> : null}
                {i === all.length - 1 ? (
                  <span aria-current="page" className="text-secondary">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <FadeIn className="mt-12 md:mt-16">
          <p className="label flex flex-col gap-4">
            <span aria-hidden className="hairline" />
            {label}
          </p>
        </FadeIn>
        <RevealText as="h1" text={title} className="display-xl mt-8 max-w-[18ch]" delay={100} />
        {intro ? (
          <FadeIn delay={400} className="mt-8 max-w-2xl">
            <p className="body-lg">{intro}</p>
          </FadeIn>
        ) : null}
        {children}
      </div>
    </header>
  );
}
