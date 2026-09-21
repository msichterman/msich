import Image from "next/image";

import logoFlamel from "@/images/logos/flamel.svg";
import logoAmex from "@/images/logos/amex.svg";
import logoHudl from "@/images/logos/hudl.svg";
import { Button } from "./Button";
import { Briefcase, Download } from "lucide-react";

interface Role {
  title: string;
  start: string;
  end: { label?: string | null; dateTime?: string };
}

interface WorkEntry {
  company: string;
  logo: typeof logoFlamel;
  description: string;
  roles: Role[];
}

function RoleDates({ role }: { role: Role }) {
  const end = role.end.label ?? role.end.dateTime;
  return (
    <dd
      className="text-xxs text-neutral-400 dark:text-neutral-500"
      aria-label={`${role.start} until ${end}`}
    >
      <time dateTime={role.start}>{role.start}</time>{" "}
      <span aria-hidden="true">—</span>{" "}
      <time dateTime={role.end.dateTime}>{end}</time>
    </dd>
  );
}

export default function Resume() {
  const resume: WorkEntry[] = [
    {
      company: "Flamel.ai",
      logo: logoFlamel,
      description:
        "Technical strategy and architecture for an autonomous AI marketing platform. Built Luna and advertising infrastructure with strict budget pacing across hundreds of locations.",
      roles: [
        {
          title: "CTO",
          start: "Feb 2026",
          end: { label: "Present", dateTime: undefined },
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
      logo: logoAmex,
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
      logo: logoHudl,
      description:
        "Web and mobile apps for Hudl Focus camera fleets — configuration, Wi-Fi onboarding, and a custom video player.",
      roles: [
        {
          title: "Full Stack Software Engineer",
          start: "Mar 2021",
          end: { dateTime: "Aug 2022" },
        },
      ],
    },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-700/40">
      <h2 className="flex text-xs font-semibold text-neutral-900 dark:text-neutral-100">
        <Briefcase className="h-6 w-6 flex-none fill-neutral-100 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-700/40">
        {resume.map(({ company, logo, description, roles }) => (
          <li key={company} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
              <Image src={logo} alt="" className="h-7 w-7 object-contain" unoptimized />
            </div>
            <div className="min-w-0 flex-auto">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {company}
              </h3>
              {roles.length === 1 && roles[0] != null ? (
                <dl className="mt-0.5">
                  <dt className="sr-only">Role</dt>
                  <dd className="text-xs text-neutral-500 dark:text-neutral-400">
                    {roles[0].title}
                  </dd>
                  <dt className="sr-only">Date</dt>
                  <RoleDates role={roles[0]} />
                </dl>
              ) : (
                <ol className="mt-2 space-y-1.5">
                  {roles.map((role) => (
                    <li key={role.title}>
                      <dl>
                        <dt className="sr-only">Role</dt>
                        <dd className="text-xs text-neutral-500 dark:text-neutral-400">
                          {role.title}
                        </dd>
                        <dt className="sr-only">Date</dt>
                        <RoleDates role={role} />
                      </dl>
                    </li>
                  ))}
                </ol>
              )}
              <p className="mt-2 text-xxs leading-5 text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <Button
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download Resume
        <Download className="h-[0.85rem] w-[0.85rem] stroke-neutral-400 transition group-active:stroke-neutral-600 dark:group-hover:stroke-neutral-50 dark:group-active:stroke-neutral-50" />
      </Button>
    </div>
  );
}
