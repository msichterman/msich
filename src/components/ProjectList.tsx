import Image from "next/image";
import { ArrowUpRight, Layers } from "lucide-react";
import { projectHostLabel, projectHref, projects } from "@/data/projects";

const hostClassName =
  "[font-family:var(--font-cal-sans),system-ui,sans-serif] inline-flex items-center gap-1 text-xs font-medium tracking-wide text-sky-600 group-hover:text-sky-500 dark:text-sky-400 dark:group-hover:text-sky-300";

export default function ProjectList() {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4 sm:p-6 dark:border-neutral-700/40">
      <h2 className="flex items-center text-xs font-semibold text-neutral-900 dark:text-neutral-100">
        <Layers className="h-6 w-6 flex-none fill-neutral-100 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">Projects</span>
      </h2>
      <ol className="mt-4 space-y-1 sm:mt-6">
        {projects.map((project) => {
          const href = projectHref(project);
          const host = projectHostLabel(project);
          const body = (
            <>
              <div className="relative mt-0.5 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-7 w-7 object-contain"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-auto">
                <h3 className="text-sm font-medium tracking-normal text-neutral-900 group-hover:text-sky-600 dark:text-neutral-100 dark:group-hover:text-sky-300">
                  {project.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-pretty text-neutral-600 dark:text-neutral-400">
                  {project.description}
                </p>
                {host ? (
                  <p className={`mt-2 ${hostClassName}`}>
                    {host}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </p>
                ) : null}
              </div>
            </>
          );

          return (
            <li key={project.name}>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-2xl px-2 py-3 transition hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 sm:gap-4 sm:px-3 sm:py-4 dark:hover:bg-neutral-800/70"
                >
                  {body}
                </a>
              ) : (
                <div className="flex gap-3 rounded-2xl px-2 py-3 sm:gap-4 sm:px-3 sm:py-4">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
