import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NullGlyph } from "@/components/ui/NullGlyph";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "This page returned null. Head back to NullOne Solutions.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="label flex flex-col gap-4">
            <span aria-hidden className="hairline" />
            Error 404
          </p>
          <h1 className="display-lg mt-8">
            404 — this page returned <span className="font-mono italic text-secondary">null</span>
          </h1>
          <pre className="mt-10 overflow-x-auto border border-line bg-surface p-5 text-sm leading-relaxed text-secondary" aria-label="Code joke">
            <code>
              <span className="text-muted-text">{"// "}GET this page</span>
              {"\n"}const page = await find(url);
              {"\n"}console.log(page); <span className="text-muted-text">{"// "}→ null</span>
            </code>
          </pre>
          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton href="/">
              Back to home <ArrowUpRight size={16} aria-hidden />
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              Contact us
            </MagneticButton>
          </div>
          <nav aria-label="Popular pages" className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary">
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/work" className="hover:text-white">Work</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
          </nav>
        </div>
        <NullGlyph />
      </div>
    </section>
  );
}
