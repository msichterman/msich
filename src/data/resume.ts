import { FLAMEL_ACQUIRED, FLAMEL_DESCRIPTION, YEXT_URL } from "@/data/profile";

export type ResumeRole = {
  title: string;
  start: string;
  end: { label?: string | null; dateTime?: string };
};

export type ResumeEntry = {
  company: string;
  href?: string;
  description: string;
  roles: ResumeRole[];
};

export const resume: ResumeEntry[] = [
  {
    company: "Yext",
    href: YEXT_URL,
    description: FLAMEL_ACQUIRED,
    roles: [
      {
        title: "Senior Software Engineer, Paid Media",
        start: "Nov 2026",
        end: { label: "Present", dateTime: undefined },
      },
    ],
  },
  {
    company: "Flamel.ai",
    description: FLAMEL_DESCRIPTION,
    roles: [
      {
        title: "CTO",
        start: "Feb 2026",
        end: { dateTime: "Nov 2026" },
      },
      {
        title: "Senior Software Engineer",
        start: "May 2023",
        end: { dateTime: "Feb 2026" },
      },
    ],
  },
  {
    company: "American Express",
    description:
      "Full-stack Platinum and Gold card acquisition funnels for tens of millions of customers, with multivariate A/B testing on conversion, UX, and security.",
    roles: [
      {
        title: "Full Stack Software Engineer II",
        start: "Aug 2022",
        end: { dateTime: "May 2023" },
      },
    ],
  },
  {
    company: "Hudl",
    description:
      "Web and mobile apps for Hudl Focus camera fleets: configuration, Wi-Fi onboarding, and a custom video player.",
    roles: [
      {
        title: "Full Stack Software Engineer",
        start: "Mar 2021",
        end: { dateTime: "Aug 2022" },
      },
    ],
  },
];
