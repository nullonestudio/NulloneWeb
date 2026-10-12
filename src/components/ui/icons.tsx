import { Code2, Gamepad2, Glasses, Layers, Smartphone, type LucideProps } from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/content/services";

const map = {
  web: Code2,
  mobile: Smartphone,
  games: Gamepad2,
  xr: Glasses,
  custom: Layers,
} satisfies Record<ServiceIconName, React.ComponentType<LucideProps>>;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = map[name];
  return <Icon strokeWidth={1.25} aria-hidden {...props} />;
}

/** lucide-react no longer ships brand marks, so LinkedIn is drawn inline. */
export function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" />
      <path d="M7.5 10v6.5M7.5 7.25v.01M11 16.5V10m0 3c0-1.7 1.1-3 2.7-3s2.3 1.1 2.3 2.8v3.7" strokeLinecap="round" />
    </svg>
  );
}
