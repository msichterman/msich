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
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Matt Sichterman - Engineer, entrepreneur, and former hogmollie",
  description:
    "CTO at Flamel.ai — helping multi-location brands, franchisees, and agencies deploy localized content at scale while staying true to brand guidelines. Co-founder of Jurgy, a beef jerky brand with Eagles center Cam Jurgens.",
  openGraph: {
    images: [{ url: "https://msich.dev/api/og?preface=Matt+Sichterman+%E2%80%A3+Home" }],
  },
};

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
        {[image2, image6, image3, image4, image5, image1].map((image) => (
          <div
            key={typeof image === "string" ? image : image.src}
            className="relative aspect-[9/10] w-44 flex-none snap-center overflow-hidden rounded-xl sm:w-72 sm:rounded-2xl lg:w-0 lg:flex-1"
          >
            <Image
              src={image}
              alt=""
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
        <div className="mx-auto flex max-w-lg flex-col items-center text-center sm:mx-0 sm:max-w-3xl sm:items-start sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-5xl">
            Engineer, entrepreneur,
            <br />
            and former hogmollie.<sup>&Dagger;</sup>
          </h1>
          <p className="mt-6 max-w-2xl text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
            I&apos;m Matt, CTO at{" "}
            <ExternalLink href="https://flamel.ai/" className="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 tracking-wide">
              Flamel.ai
            </ExternalLink>
            .{" "}Flamel.ai helps multi-location brands, franchisees, and agencies deploy localized content at scale while staying true to brand guidelines. I&apos;m also co-founder of{" "}
            <ExternalLink href="https://jurgy.co" className="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 tracking-wide">
              Jurgy
            </ExternalLink>
            , a beef jerky brand I started with Eagles center Cam Jurgens.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/mattsichterman"
              aria-label="Follow on Twitter"
              icon={Twitter}
            />
            <SocialLink
              href="https://instagram.com/mattsichterman"
              aria-label="Follow on Instagram"
              icon={Instagram}
            />
            <SocialLink
              href="https://github.com/msichterman"
              aria-label="Follow on GitHub"
              icon={Github}
            />
            <SocialLink
              href="https://www.linkedin.com/in/msichterman"
              aria-label="Follow on LinkedIn"
              icon={Linkedin}
            />
            <SocialLink
              href="mailto:msichterman1@gmail.com"
              aria-label="Email matt"
              icon={Mail}
            />
          </div>
          <ExternalLink
            href="http://hogmollie.urbanup.com/228367"
            className="mt-6 block text-xxs text-neutral-400 dark:text-neutral-600"
          >
            &Dagger; what the heck is a hogmollie?
          </ExternalLink>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto max-w-xl">
          <div className="space-y-10">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
