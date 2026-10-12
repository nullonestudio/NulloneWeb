export type Testimonial = { quote: string; name: string; role: string; project?: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "We're not a tech company, and NullOne never made us feel like we had to be. They explained every decision in plain language and shipped exactly when they said they would.",
    name: "Operations Director",
    role: "Manufacturing client",
    project: "Immersive B2B Sales Demo",
  },
  {
    quote:
      "The rebuilt dashboard is the first internal tool our analysts actually enjoy using. Page loads went from painful to instant.",
    name: "Head of Product",
    role: "Fintech lending platform",
    project: "Fintech Dashboard Reboot",
  },
  {
    quote:
      "They took a prototype that ran badly on half our audience's phones and turned it into a smooth 60fps multiplayer game.",
    name: "Co-Founder",
    role: "Independent game studio",
    project: "VEX",
  },
  {
    quote:
      "Three platforms in fourteen weeks, with weekly builds we could actually test. Communication was the best we've had with any agency.",
    name: "CEO",
    role: "Workplace collaboration startup",
    project: "Sync",
  },
  {
    quote:
      "What used to take our volunteers days now happens automatically. Launching a new event takes an afternoon.",
    name: "Chapter Chair",
    role: "ASME student chapter",
    project: "ASME",
  },
];
