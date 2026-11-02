import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import image1 from "@/images/photos/image-1.jpg";
import image2 from "@/images/photos/image-2.jpg";
import image3 from "@/images/photos/image-3.jpg";
import image4 from "@/images/photos/image-4.jpg";
import image5 from "@/images/photos/image-5.jpg";
import image6 from "@/images/photos/image-6.jpg";
import { ElementType } from "react";
import ExternalLink from "@/components/ExternalLink";
import Newsletter from "@/components/Newsletter";
import Resume from "@/components/Resume";
import ProjectList from "@/components/ProjectList";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import {
  FLAMEL_DESCRIPTION,
  FLAMEL_JOINING,
  FLAMEL_URL,
  HOGMOLLIE_URL,
  HOME_DESCRIPTION,
  HOME_TITLE,
  JURGY_TAGLINE,
  JURGY_URL,
  SOCIAL,
} from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

const linkClass =
  "tracking-wide text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  ogPreface: "Matt Sichterman \u2023 Home",
});

function SocialLink({
  icon: Icon,
  href,
  ...props
}: {
  icon: ElementType;
  href: string;
}) {
  return (
    <ExternalLink className="group -m-1 p-1" href={href} {...props}>
      <Icon className="h-6 w-6 border-none stroke-neutral-500 stroke-[1.5] transition group-hover:stroke-neutral-600 dark:stroke-neutral-400 dark:group-hover:stroke-neutral-300" />
    </ExternalLink>
  );
}

function Photos() {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex snap-x snap-mandatory justify-start gap-5 overflow-x-auto py-4 sm:gap-8 lg:mx-auto lg:max-w-7xl lg:snap-none lg:justify-center lg:gap-6 lg:overflow-visible lg:px-8">
        {[image2, image6, image3, image4, image5, image1].map((image, index) => (
          <div
            key={typeof image === "string" ? image : image.src}
            className="relative aspect-[9/10] w-44 flex-none snap-center overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl lg:w-0 lg:flex-1"
          >
            <Image
              src={image}
              alt=""
              priority={index === 0}
              sizes="(min-width: 1024px) 14vw, (min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Container className="mt-9 sm:mt-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-balance text-neutral-800 dark:text-neutral-100 sm:text-5xl">
            Engineer, entrepreneur, and former hogmollie.
            <sup>&Dagger;</sup>
          </h1>
          <p className="mt-6 text-xs text-pretty text-neutral-600 dark:text-neutral-400 sm:text-sm">
            I&apos;m Matt, CTO at{" "}
            <ExternalLink href={FLAMEL_URL} className={linkClass}>
              Flamel.ai
            </ExternalLink>
            . {FLAMEL_DESCRIPTION} {FLAMEL_JOINING} I&apos;m also co-founder of{" "}
            <ExternalLink href={JURGY_URL} className={linkClass}>
              Jurgy
            </ExternalLink>
            , {JURGY_TAGLINE}, a brand I started with Baltimore Ravens center Cam Jurgens.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={SOCIAL.x}
              aria-label="Follow on X"
              icon={Twitter}
            />
            <SocialLink
              href={SOCIAL.instagram}
              aria-label="Follow on Instagram"
              icon={Instagram}
            />
            <SocialLink
              href={SOCIAL.github}
              aria-label="Follow on GitHub"
              icon={Github}
            />
            <SocialLink
              href={SOCIAL.linkedin}
              aria-label="Follow on LinkedIn"
              icon={Linkedin}
            />
            <SocialLink
              href={SOCIAL.email}
              aria-label="Email matt"
              icon={Mail}
            />
          </div>
          <ExternalLink
            href={HOGMOLLIE_URL}
            className="mt-6 block text-xxs text-neutral-600 dark:text-neutral-400"
          >
            &Dagger; what the heck is a hogmollie?
          </ExternalLink>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto max-w-xl space-y-10 lg:max-w-none">
          <Newsletter />
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-8">
            <ProjectList />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
