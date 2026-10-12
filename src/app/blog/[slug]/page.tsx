import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, posts, sortedPosts } from "@/content/blog/posts";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTA } from "@/components/sections/CTA";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      keywords: post.tags,
    }),
    authors: [{ name: post.author }],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${post.slug}.mdx`);
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    image: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
    inLanguage: "en-IN",
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <article>
        <PageHeader
          label={post.tags.join(" · ")}
          title={post.title}
          intro={post.description}
          crumbs={[
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]}
        >
          <p className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6 text-sm text-secondary">
            <span>By {post.author}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime}</span>
          </p>
        </PageHeader>
        <div className="container-x py-20 md:py-28">
          <div className="prose-nullone mx-auto max-w-3xl md:prose-lg">
            <Body />
          </div>
        </div>
      </article>

      <nav aria-labelledby="more-posts" className="border-t border-line py-20">
        <div className="container-x">
          <div className="flex items-center justify-between">
            <h2 id="more-posts" className="label">
              Keep reading
            </h2>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-secondary hover:text-white">
              <ArrowLeft size={14} aria-hidden /> All articles
            </Link>
          </div>
          <ul className="mt-8 grid gap-px bg-line md:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug} className="bg-bg">
                <Link href={`/blog/${p.slug}`} className="block p-7 transition-colors hover:bg-surface md:p-10">
                  <time dateTime={p.date} className="label">
                    {formatDate(p.date)}
                  </time>
                  <p className="mt-4 font-display text-xl font-medium tracking-tight md:text-2xl">{p.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <CTA />
    </>
  );
}
