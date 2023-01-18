import Image, { StaticImageData } from "next/future/image";
import Head from "next/head";

import { Card } from "@/components/Card";
import { SimpleLayout } from "@/layouts/SimpleLayout";
import { Link } from "lucide-react";

type Project = {
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: string | StaticImageData;
};

const projects: Project[] = [
  // {
  //   name: "Planetaria",
  //   description:
  //     "Creating technology to empower civilians to explore space on their own terms.",
  //   link: { href: "http://planetaria.tech", label: "planetaria.tech" },
  //   logo: logoPlanetaria,
  // },
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Matt Sichterman</title>
        <meta
          name="description"
          content="Things I’ve made trying to put my dent in the universe."
        />
      </Head>
      <SimpleLayout
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects &&
            projects.map((project) => (
              <Card as="li" key={project.name}>
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-neutral-800/5 ring-1 ring-neutral-900/5 dark:border dark:border-neutral-700/50 dark:bg-neutral-800 dark:ring-0">
                  <Image
                    src={project.logo}
                    alt=""
                    className="h-8 w-8"
                    unoptimized
                  />
                </div>
                <h2 className="mt-6 text-base font-semibold text-neutral-800 dark:text-neutral-100">
                  <Card.Link href={project.link.href}>{project.name}</Card.Link>
                </h2>
                <Card.Description>{project.description}</Card.Description>
                <p className="relative z-10 mt-6 flex text-sm font-medium text-neutral-400 transition group-hover:text-sky-500 dark:text-neutral-200">
                  <Link className="h-6 w-6 flex-none" />
                  <span className="ml-2">{project.link.label}</span>
                </p>
              </Card>
            ))}
        </ul>
      </SimpleLayout>
    </>
  );
}
