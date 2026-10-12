import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "NullOne Solutions — Web, Mobile, Game & AR/VR Development Agency";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "We build the software your business deserves." });
}
