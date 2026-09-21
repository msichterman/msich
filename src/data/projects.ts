import type { StaticImageData } from "next/image";

import logoFlamel from "@/images/logos/flamel.svg";
import logoJurgy from "@/images/logos/jurgy.png";
import logoFitsick from "@/images/logos/fitsick.png";
import logoBurnaze from "@/images/logos/burnaze.svg";
import logoAmex from "@/images/logos/amex.svg";
import logoHudl from "@/images/logos/hudl.svg";

export type Project = {
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: string | StaticImageData;
};

export const projects: Project[] = [
  {
    name: "Flamel Studio",
    description:
      "Multi-tenant franchise marketing platform. Architected Luna, an autonomous AI agent with tool-calling, and Ad Playbooks for automated ad sets and budget pacing across 100+ stores.",
    link: { href: "https://flamel.ai", label: "flamel.ai" },
    logo: logoFlamel,
  },
  {
    name: "Flamel Web & Docs",
    description:
      "High-conversion marketing site alongside interactive developer docs for the Flamel platform.",
    link: { href: "https://docs.flamel.ai", label: "docs.flamel.ai" },
    logo: logoFlamel,
  },
  {
    name: "Jurgy Beef Jerky",
    description:
      "Co-founded a craft CPG brand with Cam Jurgens. Formulated 6 proprietary flavors, scaled direct-to-consumer operations, and expanded into 150+ retail stores.",
    link: { href: "https://jurgy.co", label: "jurgy.co" },
    logo: logoJurgy,
  },
  {
    name: "Fitsick",
    description:
      "AI workout planner for hypertrophy training. Plan, track, and schedule workouts with embedded video demos and a synced training overview.",
    link: { href: "https://fitsick.com", label: "fitsick.com" },
    logo: logoFitsick,
  },
  {
    name: "Burnaze",
    description:
      "Daily news and intelligence for franchise and multi-location brands, covering QSR, fitness, home services, and emerging concepts.",
    link: { href: "https://burnaze.com", label: "burnaze.com" },
    logo: logoBurnaze,
  },
  {
    name: "US Credit Cards",
    description:
      "Deployed full-stack acquisition funnels for American Express Platinum and Gold cards to tens of millions of users with multivariate A/B testing.",
    link: { href: "https://www.americanexpress.com", label: "amex.com" },
    logo: logoAmex,
  },
  {
    name: "Hudl Focus Fleet & Video",
    description:
      "Built mobile and web apps for autonomous camera fleets, including Wi-Fi onboarding flows and a custom video player with pan, zoom, and mute.",
    link: { href: "https://www.hudl.com", label: "hudl.com" },
    logo: logoHudl,
  },
];
