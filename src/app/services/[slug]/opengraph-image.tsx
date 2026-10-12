import { getService, services } from "@/content/services";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "NullOne Solutions service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOg({ title: service?.title ?? "Services", eyebrow: "Services" });
}
