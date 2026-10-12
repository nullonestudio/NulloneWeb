import { PageHeader } from "./PageHeader";

export type LegalSection = { heading: string; body: React.ReactNode };

export function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader label={`Legal · Last updated ${updated}`} title={title} intro={intro} crumbs={[{ name: title, path }]} />
      <div className="container-x grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
        <nav aria-label="On this page" className="lg:col-span-3">
          <ol className="flex flex-col gap-3 text-sm text-secondary lg:sticky lg:top-32">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#section-${i + 1}`} className="hover:text-white">
                  {String(i + 1).padStart(2, "0")} · {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="prose-nullone lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section key={s.heading} id={`section-${i + 1}`} aria-labelledby={`section-${i + 1}-title`}>
              <h2 id={`section-${i + 1}-title`}>{s.heading}</h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
