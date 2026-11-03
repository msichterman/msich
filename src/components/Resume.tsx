import Image from "next/image";

import logoYext from "@/images/logos/yext.svg";
import logoFlamel from "@/images/logos/flamel.svg";
import logoAmex from "@/images/logos/amex.svg";
import logoHudl from "@/images/logos/hudl.svg";
import { resume, type ResumeRole } from "@/data/resume";
import { Button } from "./Button";
import { Briefcase, Download } from "lucide-react";

const logos = {
  Yext: logoYext,
  "Flamel.ai (acquired)": logoFlamel,
  "American Express": logoAmex,
  Hudl: logoHudl,
} as const;

function RoleDates({ role }: { role: ResumeRole }) {
  const end = role.end.label ?? role.end.dateTime;
  return (
    <dd
      className="text-xxs text-neutral-600 dark:text-neutral-300"
      aria-label={`${role.start} until ${end}`}
    >
      <time dateTime={role.start}>{role.start}</time>{" "}
      <span aria-hidden="true">-</span>{" "}
      {role.end.dateTime ? (
        <time dateTime={role.end.dateTime}>{end}</time>
      ) : (
        <span>{end}</span>
      )}
    </dd>
  );
}

export default function Resume() {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-700/40">
      <h2 className="flex text-xs font-semibold text-neutral-900 dark:text-neutral-100">
        <Briefcase className="h-6 w-6 flex-none fill-neutral-100 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-700/40">
        {resume.map(({ company, href, description, roles }) => {
          const logo = logos[company as keyof typeof logos];
          return (
          <li key={company} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
              <Image src={logo} alt="" className="h-7 w-7 object-contain" unoptimized />
            </div>
            <div className="min-w-0 flex-auto">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-700 dark:hover:text-sky-400"
                  >
                    {company}
                  </a>
                ) : (
                  company
                )}
              </h3>
              {roles.length === 1 && roles[0] != null ? (
                <dl className="mt-0.5">
                  <dt className="sr-only">Role</dt>
                  <dd className="text-xs text-neutral-600 dark:text-neutral-300">
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
                        <dd className="text-xs text-neutral-600 dark:text-neutral-300">
                          {role.title}
                        </dd>
                        <dt className="sr-only">Date</dt>
                        <RoleDates role={role} />
                      </dl>
                    </li>
                  ))}
                </ol>
              )}
              <p className="mt-2 text-xxs leading-5 text-pretty text-neutral-600 dark:text-neutral-300">
                {description}
              </p>
            </div>
          </li>
          );
        })}
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
