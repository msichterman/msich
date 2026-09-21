import Image from "next/image";
import type { Metadata } from "next";

import { Card } from "@/components/Card";
import { SimpleLayout } from "@/layouts/SimpleLayout";
import { projects } from "@/data/projects";
import { Link } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects - Matt Sichterman",
  description: "Things I've made trying to put my dent in the universe.",
  openGraph: {
    images: [{ url: "https://msich.dev/api/og?preface=Matt+Sichterman+%E2%80%A3+Projects" }],
  },
};

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've made trying to put my dent in the universe."
      intro="Products I've built, brands I've started, and systems I've shipped. AI marketing infrastructure, a beef jerky company, and a lot in between."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8 object-contain"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-sm font-semibold tracking-normal text-pretty text-neutral-800 dark:text-neutral-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-xs font-medium text-neutral-400 transition group-hover:text-sky-500 dark:text-neutral-200">
              <Link className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  );
}
