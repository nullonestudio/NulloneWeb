export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  image: { src: string; alt: string };
  featured?: boolean;
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    name: "Mustafa Abbas",
    role: "Co-Founder",
    bio: "Leads engineering and delivery — turning loose ideas into scoped, shippable plans.",
    image: { src: "/images/team/mustafa-abbas.jpg", alt: "Portrait of Mustafa Abbas, Co-Founder of NullOne Solutions" },
    featured: true,
  },
  {
    name: "Mirza Shah Hussain",
    role: "Co-Founder",
    bio: "Leads design and client partnerships — making sure what we build is what you actually need.",
    image: { src: "/images/team/mirza-shah-hussain.jpg", alt: "Portrait of Mirza Shah Hussain, Co-Founder of NullOne Solutions" },
    featured: true,
  },
  {
    name: "Engineering Lead",
    role: "Full Stack & Cloud",
    image: { src: "/images/team/member-1.jpg", alt: "Portrait of the NullOne engineering lead" },
  },
  {
    name: "Mobile Lead",
    role: "iOS & Android",
    image: { src: "/images/team/member-2.jpg", alt: "Portrait of the NullOne mobile lead" },
  },
  {
    name: "Game & XR Lead",
    role: "Unity & Unreal",
    image: { src: "/images/team/member-3.jpg", alt: "Portrait of the NullOne game and XR lead" },
  },
  {
    name: "Design Lead",
    role: "Product & Brand",
    image: { src: "/images/team/member-4.jpg", alt: "Portrait of the NullOne design lead" },
  },
];
