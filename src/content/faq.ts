export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Do I need to be a tech company to work with you?",
    answer:
      "Not at all. Many of our clients are manufacturers, retailers, educators and service businesses. We translate your goals into technical decisions, explain everything in plain language and handle the engineering end to end.",
  },
  {
    question: "What do you build?",
    answer:
      "Full-stack web apps and websites, native and cross-platform mobile apps, games in Unity and Unreal, AR/VR experiences for training, demos, real estate and retail, and custom software such as ERP systems, automation, dashboards and integrations.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A marketing site typically takes 2–4 weeks, an MVP web or mobile app 6–12 weeks, and larger platforms, games or XR experiences 3–6 months. After the discovery call you get a written timeline with weekly milestones.",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes. Every project includes a 30-day warranty period, and we offer monthly support and growth retainers covering monitoring, updates, security patches and new features.",
  },
  {
    question: "How do you ensure quality and security?",
    answer:
      "Typed codebases, code review on every change, automated tests and CI, performance budgets and security best practices such as encryption, least-privilege access and dependency audits. You own the code and get full documentation.",
  },
];
