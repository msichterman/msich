import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/Button";
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

import logoAmex from "@/images/logos/amex.svg";
import logoHudl from "@/images/logos/hudl.svg";
import logoLevelFive from "@/images/logos/levelfive.svg";
import logoSpreetail from "@/images/logos/spreetail.svg";
import { ElementType, SVGProps } from "react";
import ExternalLink from "@/components/ExternalLink";
import { trpc } from "@/utils/trpc";
import { allArticles, Article } from "contentlayer/generated";
import { formatDate } from "@/lib/formatDate";

function MailIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

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

function Newsletter() {
  const FormSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const utils = trpc.useContext();

  const getSubscribers = trpc.newsletter.getSubscribers.useQuery();

  const subscribe = trpc.newsletter.subscribe.useMutation({
    onSuccess() {
      utils.newsletter.getSubscribers.invalidate();
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async ({ email }) => {
    subscribe.mutate({ email });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      onBlur={() => clearErrors()}
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {!getSubscribers.isError && getSubscribers?.data?.count ? (
          <>
            <span className="font-bold text-sky-600 motion-safe:animate-pulse dark:text-sky-500">
              {`Join ${getSubscribers.data.count} others `}
            </span>
            who get notified when I publish something new, and unsubscribe at
            any time.
          </>
        ) : (
          <>
            Get notified when I publish something new, and unsubscribe at any
            time.
          </>
        )}
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          id="email"
          {...register("email")}
          autoComplete="email"
          className={clsx(
            "min-w-0 flex-auto appearance-none rounded-md border bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-sky-400 dark:focus:ring-sky-400/10 sm:text-sm",
            errors.email || subscribe.error
              ? "border-red-600"
              : "border-zinc-900/10 dark:border-zinc-700"
          )}
          disabled={isSubmitting || subscribe.isLoading}
        />
        <Button
          type="submit"
          className="ml-4 flex-none"
          disabled={isSubmitting || subscribe.isLoading}
        >
          Join
        </Button>
      </div>
      {(errors.email || subscribe.error || subscribe.data?.error) && (
        <p
          className={clsx(
            "mt-2 block min-w-0 flex-auto appearance-none rounded-md border border-red-600 bg-red-200 px-2 py-1 text-center text-xxs text-red-700 shadow-md shadow-zinc-800/5 dark:bg-red-800 dark:text-red-50"
          )}
        >
          {errors.email?.message ||
            subscribe.error?.message ||
            subscribe.data?.error}
        </p>
      )}
      {subscribe.isSuccess && subscribe.data.email && (
        <p
          className={clsx(
            "mt-2 block min-w-0 flex-auto appearance-none rounded-md border border-green-600 bg-green-200 px-2 py-1 text-center text-xxs text-green-700 shadow-md shadow-zinc-800/5 dark:bg-green-800 dark:text-green-50"
          )}
        >
          Thanks {subscribe.data.email}! Please verify your email.
        </p>
      )}
    </form>
  );
}

function Resume() {
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
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download Resume
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
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
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image5, image4, image3, image2].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
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
  return (
    <>
      <Head>
        <title>
          Matt Sichterman - Software engineer, tinkerer, and former hogmollie
        </title>
        <meta
          name="description"
          content="I’m Matt, a software engineer and entrepreneur based in Cincinnati,
            OH. I’m the founder of Web Forestry, where I create and manage
            thriving websites for growing businesses."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software engineer, tinkerer, and former hogmollie.
            <sup>&Dagger;</sup>
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Matt, a software engineer and entrepreneur based in Cincinnati,
            OH. I’m the founder of Web Forestry, where I create and manage
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
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {allArticles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  );
}
