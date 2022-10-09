import Image from "next/future/image";

import logoAmex from "@/images/logos/amex.svg";
import logoHudl from "@/images/logos/hudl.svg";
import logoLevelFive from "@/images/logos/levelfive.svg";
import logoSpreetail from "@/images/logos/spreetail.svg";
import { SVGProps } from "react";
import { Button } from "./Button";

function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map(({ company, title, logo, start, end }, roleIndex) => (
          <li
            key={roleIndex}
            className="flex items-center gap-4 border-b border-zinc-100 pb-4 dark:border-zinc-700/40"
          >
            <div className="relative mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={logo} alt="" className="h-8 w-8" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="w-full text-xs text-zinc-500 dark:text-zinc-400">
                {title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="w-full text-xxs text-zinc-400 dark:text-zinc-500"
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
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}
