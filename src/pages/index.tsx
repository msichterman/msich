import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";

import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon as SolidMailIcon,
} from "@/components/SocialIcons";
import image1 from "@/images/photos/image-1.jpg";
import image2 from "@/images/photos/image-2.jpg";
import image3 from "@/images/photos/image-3.jpg";
import image4 from "@/images/photos/image-4.jpg";
import image5 from "@/images/photos/image-5.jpg";

import { ElementType } from "react";
import ExternalLink from "@/components/ExternalLink";
import { allArticles, Article } from "contentlayer/generated";
import { formatDate } from "@/lib/formatDate";
import Newsletter from "@/components/Newsletter";
import Resume from "@/components/Resume";

function Article({ article }: { article: Article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({
  icon: Icon,
  href,
  ...props
}: {
  icon: ElementType;
  href: string;
}) {
  return (
    <Link className="group -m-1 p-1" href={href} {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  );
}

function Photos() {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex snap-x snap-mandatory justify-start gap-5 overflow-hidden overflow-x-auto py-4 sm:gap-8 lg:snap-none lg:justify-center lg:overflow-x-hidden">
        {[image2, image3, image4, image5, image1].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none snap-center overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const hasArticles = allArticles.length > 0;
  return (
    <>
      <Head>
        <title>
          Matt Sichterman - Software engineer, entrepreneur, and former
          hogmollie
        </title>
        <meta
          name="description"
          content="I’m Matt, a software engineer and entrepreneur based in Cincinnati,
            OH. I’m the founder of Web Forestry, where I create and manage
            thriving websites for growing businesses."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software engineer, entrepreneur, and former hogmollie.
            <sup>&Dagger;</sup>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
            I’m Matt, a software engineer and entrepreneur based in Cincinnati,
            OH. I&apos;m the founder of Web Forestry, where I create and manage
            thriving websites for growing businesses.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/mattsichterman"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://instagram.com/mattsichterman"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/msichterman"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/msichterman"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
            <SocialLink
              href="mailto:msichterman1@gmail.com"
              aria-label="Email matt"
              icon={SolidMailIcon}
            />
          </div>
          <ExternalLink
            to="http://hogmollie.urbanup.com/228367"
            className="mt-6 block text-xxs text-zinc-400 dark:text-zinc-600"
          >
            &Dagger; what the heck is a hogmollie?
          </ExternalLink>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div
          className={clsx(
            "mx-auto max-w-xl",
            hasArticles &&
              "grid grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
          )}
        >
          {hasArticles && (
            <div className="flex flex-col gap-16">
              {allArticles.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
          )}
          <div
            className={clsx("space-y-10", hasArticles && "lg:pl-16 xl:pl-24")}
          >
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
