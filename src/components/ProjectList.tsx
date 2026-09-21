import Image from "next/image";
import { Layers } from "lucide-react";
import { projects } from "@/data/projects";
import ExternalLink from "./ExternalLink";

export default function ProjectList() {
  return (
    <div className="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-700/40">
      <h2 className="flex text-xs font-semibold text-neutral-900 dark:text-neutral-100">
        <Layers className="h-6 w-6 flex-none fill-neutral-100 stroke-neutral-400 dark:fill-neutral-100/10 dark:stroke-neutral-500" />
        <span className="ml-3">Projects</span>
      </h2>
      <ol className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-700/40">
        {projects.map((project) => (
          <li key={project.name} className="flex gap-4 py-5 first:pt-0 last:pb-0">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-7 w-7 object-contain"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-auto">
              <h3 className="text-sm font-medium tracking-normal text-neutral-900 dark:text-neutral-100">
                <ExternalLink
                  href={project.link.href}
                  className="transition hover:text-sky-500 dark:hover:text-sky-400"
                >
                  {project.name}
                </ExternalLink>
              </h3>
              <p className="mt-1 text-xxs leading-5 text-neutral-500 dark:text-neutral-400">
                {project.description}
              </p>
              <p className="mt-2 text-xxs font-medium text-sky-500">
                <ExternalLink
                  href={project.link.href}
                  className="transition hover:text-sky-400"
                >
                  {project.link.label}
                </ExternalLink>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
