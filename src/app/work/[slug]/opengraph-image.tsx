import { getProject, projects } from "@/content/projects";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "NullOne Solutions case study";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return renderOg({ title: p?.title ?? "Case Study", eyebrow: p ? `Case Study · ${p.category}` : "Case Study" });
}
