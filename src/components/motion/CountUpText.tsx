import { CountUp } from "./CountUp";

/** Counts up the numeric part of strings like "80%", "2,000+", "<80ms", "−70%"; renders anything else as-is. */
export function CountUpText({ text }: { text: string }) {
  const m = text.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!m) return <>{text}</>;
  const [, prefix, num, suffix] = m;
  const value = Number(num.replace(/,/g, ""));
  if (!Number.isFinite(value) || num.includes(",")) return <>{text}</>;
  return (
    <>
      {prefix}
      <CountUp value={value} suffix={suffix} />
    </>
  );
}
