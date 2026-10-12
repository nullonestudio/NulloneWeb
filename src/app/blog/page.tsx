import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sortedPosts } from "@/content/blog/posts";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn } from "@/components/motion/RevealText";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Software Development Insights",
  description:
    "Practical articles on web development, mobile apps, game development, AR/VR and custom software from the NullOne Solutions team.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        label="Blog"
        title="Notes on building great software."
        intro="Practical, jargon-free writing on web, mobile, games, AR/VR and custom software — for founders and teams of every kind."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section aria-label="Articles" className="py-20 md:py-32">
        <ul className="container-x border-t border-line">
          {sortedPosts.map((post, i) => (
            <FadeIn as="li" key={post.slug} delay={i * 80} className="border-b border-line">
              <article>
                <Link
                  href={`/blog/${post.slug}`}
                  data-cursor="Read"
                  className="group grid gap-6 py-10 md:grid-cols-[12rem_1fr_auto] md:items-start md:gap-12 md:py-14"
                >
                  <div className="flex flex-col gap-2">
                    <time dateTime={post.date} className="label">
                      {formatDate(post.date)}
                    </time>
                    <span className="text-sm text-muted-text">{post.readingTime}</span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                      {post.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-secondary">{post.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                      {post.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line px-3 py-1 text-[11px] text-secondary">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="hidden h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-colors duration-500 group-hover:bg-white group-hover:text-black md:flex">
                    <ArrowUpRight size={16} aria-hidden />
                  </span>
                </Link>
              </article>
            </FadeIn>
          ))}
        </ul>
      </section>
      <CTA />
    </>
  );
}
