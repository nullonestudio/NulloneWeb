import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { LOGO } from "@/components/ui/Logo";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let fontData: Promise<Buffer> | undefined;
function sora() {
  fontData ??= readFile(join(process.cwd(), "src/assets/fonts/Sora-Medium.ttf"));
  return fontData;
}

function Mark({ size, opacity = 1, stroke = LOGO.stroke }: { size: number; opacity?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox={LOGO.viewBox} fill="none" stroke="white" strokeWidth={stroke} strokeLinecap="round" style={{ opacity }}>
      <circle cx={LOGO.circle.cx} cy={LOGO.circle.cy} r={LOGO.circle.r} />
      <path d={LOGO.slash} />
    </svg>
  );
}

/** Brand OG card: matte black, Ø mark, title in Sora, cropped watermark. */
export async function renderOg({ title, eyebrow = "Software Development Agency" }: { title: string; eyebrow?: string }) {
  const font = await sora();
  const fontSize = title.length > 48 ? 60 : title.length > 28 ? 72 : 88;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          color: "white",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "Sora",
        }}
      >
        <div style={{ position: "absolute", right: -220, bottom: -260, display: "flex" }}>
          <Mark size={760} opacity={0.07} stroke={2.2} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Mark size={64} />
          <div style={{ width: 1, height: 64, background: "rgba(255,255,255,0.25)" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, letterSpacing: "0.25em" }}>NULLONE</div>
            <div style={{ fontSize: 12, letterSpacing: "0.6em", color: "#A1A1A1", marginTop: 6 }}>SOLUTIONS</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 980 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.5)" }} />
            <div style={{ fontSize: 16, letterSpacing: "0.3em", color: "#A1A1A1", textTransform: "uppercase" }}>{eyebrow}</div>
          </div>
          <div style={{ fontSize, lineHeight: 1.05, letterSpacing: "-0.03em" }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 16, letterSpacing: "0.3em", color: "#7D7D7D" }}>
          WEB • MOBILE • GAMES • AR/VR • CUSTOM SOFTWARE
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Sora", data: font, weight: 500, style: "normal" }] },
  );
}
