import Image from "next/image";

import logoAmex from "@/images/logos/amex.svg";
import logoHudl from "@/images/logos/hudl.svg";
import logoLevelFive from "@/images/logos/levelfive.svg";
import logoSpreetail from "@/images/logos/spreetail.svg";
import { Button } from "./Button";
import { Briefcase, Download } from "lucide-react";

export default function Resume() {
  const resume = [
    {
      company: "American Express",
      title: "Full-Stack Software Engineer II",
      logo: logoAmex,
      start: "Aug 2022",
      end: {
        label: "Present",
        dateTime: new Date().toLocaleString("en-us", {
          month: "short",
          year: "numeric",
        }),
      },
    },
    {
      company: "Hudl",
      title: "Full-Stack Software Engineer",
      logo: logoHudl,
      start: "Mar 2021",
      end: {
        label: null,
        dateTime: "Aug 2022",
      },
    },
    {
      company: "Level Five Solutions",
      title: "Junior UI Developer",
      logo: logoLevelFive,
      start: "Aug 2020",
      end: {
        label: null,
        dateTime: "Mar 2021",
      },
    },
    {
      company: "Spreetail",
      title: "Software Engineer Intern",
      logo: logoSpreetail,
      start: "May 2020",
      end: {
        label: null,
        dateTime: "July 2020",
      },
    },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-700/40">
      <h2 className="flex text-xs font-semibold text-neutral-900 dark:text-neutral-100">
        <Briefcase className="h-6 w-6 flex-none fill-neutral-100 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map(({ company, title, logo, start, end }, roleIndex) => (
          <li
            key={roleIndex}
            className="flex items-center gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-700/40"
          >
            <div className="relative mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-full shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
              <Image src={logo} alt="" className="h-8 w-8" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="w-full text-xs text-neutral-500 dark:text-neutral-400">
                {title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="w-full text-xxs text-neutral-400 dark:text-neutral-500"
                aria-label={`${start} until ${end.label ?? end}`}
              >
                <time dateTime={start}>{start}</time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time dateTime={end.dateTime}>{end.label ?? end.dateTime}</time>
              </dd>
            </dl>
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
