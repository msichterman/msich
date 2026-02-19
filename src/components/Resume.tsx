import Image from "next/image";

import logoFlamel from "@/images/logos/flamel.svg";
import logoAmex from "@/images/logos/amex.svg";
import logoHudl from "@/images/logos/hudl.svg";
import logoLevelFive from "@/images/logos/levelfive.svg";
import logoSpreetail from "@/images/logos/spreetail.svg";
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
  roles: Role[];
}

export default function Resume() {
  const resume: WorkEntry[] = [
    {
      company: "Flamel.ai",
      logo: logoFlamel,
      roles: [
        {
          title: "CTO",
          start: "Feb 2026",
          end: { label: "Present", dateTime: undefined },
        },
        {
          title: "Senior Full Stack Developer",
          start: "May 2023",
          end: { dateTime: "Feb 2026" },
        },
      ],
    },
    {
      company: "American Express",
      logo: logoAmex,
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
      roles: [
        {
          title: "Full Stack Software Engineer",
          start: "Mar 2021",
          end: { dateTime: "Aug 2022" },
        },
      ],
    },
    {
      company: "Level Five Solutions",
      logo: logoLevelFive,
      roles: [
        {
          title: "Junior UI Developer",
          start: "Aug 2020",
          end: { dateTime: "Mar 2021" },
        },
      ],
    },
    {
      company: "Spreetail",
      logo: logoSpreetail,
      roles: [
        {
          title: "Software Engineer Intern",
          start: "May 2020",
          end: { dateTime: "July 2020" },
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
      <ol className="mt-6 space-y-4">
        {resume.map(({ company, logo, roles }, companyIndex) => (
          <li
            key={companyIndex}
            className="border-b border-neutral-200 pb-4 dark:border-neutral-700/40"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 flex-none items-center justify-center rounded-full shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
                <Image src={logo} alt="" className="h-8 w-8" unoptimized />
              </div>
              <div className="flex-auto">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {company}
                </h3>
                {roles.length === 1 && roles[0] != null && (
                  <dl>
                    <dt className="sr-only">Role</dt>
                    <dd className="text-xs text-neutral-500 dark:text-neutral-400">
                      {roles[0].title}
                    </dd>
                    <dt className="sr-only">Date</dt>
                    <dd
                      className="text-xxs text-neutral-400 dark:text-neutral-500"
                      aria-label={`${roles[0].start} until ${roles[0].end.label ?? roles[0].end.dateTime}`}
                    >
                      <time dateTime={roles[0].start}>{roles[0].start}</time>{" "}
                      <span aria-hidden="true">—</span>{" "}
                      <time dateTime={roles[0].end.dateTime}>
                        {roles[0].end.label ?? roles[0].end.dateTime}
                      </time>
                    </dd>
                  </dl>
                )}
              </div>
            </div>
            {roles.length > 1 && (
              <ol className="relative ml-6 mt-3 border-l border-neutral-200 dark:border-neutral-700/40">
                {roles.map((role, roleIndex) => (
                  <li key={roleIndex} className="relative pl-8 pb-3 last:pb-0">
                    <div className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
                    <dl>
                      <dt className="sr-only">Role</dt>
                      <dd className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {role.title}
                      </dd>
                      <dt className="sr-only">Date</dt>
                      <dd
                        className="text-xxs text-neutral-400 dark:text-neutral-500"
                        aria-label={`${role.start} until ${role.end.label ?? role.end.dateTime}`}
                      >
                        <time dateTime={role.start}>{role.start}</time>{" "}
                        <span aria-hidden="true">—</span>{" "}
                        <time dateTime={role.end.dateTime}>
                          {role.end.label ?? role.end.dateTime}
                        </time>
                      </dd>
                    </dl>
                  </li>
                ))}
              </ol>
            )}
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
