import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

/** Global MDX element mapping (required by @next/mdx in the App Router). */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", ...props }) =>
      href.startsWith("/") || href.startsWith("#") ? (
        <Link href={href} {...props} />
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
      ),
    img: (props) => (
      <Image
        sizes="(min-width: 768px) 720px, 100vw"
        width={1600}
        height={900}
        className="h-auto w-full"
        {...(props as ImageProps)}
        alt={props.alt ?? ""}
      />
    ),
    ...components,
  };
}
