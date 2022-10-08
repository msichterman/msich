import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "@/components/Container";
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/SocialIcons";
import portraitImage from "@/images/portrait.jpg";
import { ElementType, ReactNode, SVGProps } from "react";
import ExternalLink from "@/components/ExternalLink";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  icon: ElementType;
  href: string;
  children: ReactNode;
}) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-sky-500 dark:text-zinc-200 dark:hover:text-sky-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-sky-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Matt Sichterman</title>
        <meta
          name="description"
          content="I’m Matt Sichterman. I live in Cincinnati, OH, where I develop thriving digital experiences."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              I’m Matt Sichterman. <br /> I live in Cincinnati, OH, where I
              develop thriving digital experiences.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Ever since I was young, I&apos;ve woken up excited about two
                things: sports and technology. Sports have been a mainstay in my
                life for as long as I can remember. Sports have taken me all
                across the country, and have allowed me to experience great
                places, cities, and competitions. Most of all, sports have
                connected me with incredible teammates, leaders, and people.
                Technology has found its way into my life in other ways, feeding
                my hunger to learn and create.
              </p>
              <p>
                &quot;Pick something hard and be the best at it&quot;, is a
                quote from my dad who has always encouraged me to work hard and
                dream big. Early on, that meant disassembling computers,
                dabbling in every computer app I could get my hands on, and
                helping out with maintenance projects around the house. I
                learned new skills with every experience, yet continued to
                search for opportunities to build things and quench my thirst
                for creativity.
              </p>
              <p>
                Sophomore year of high school, I was introduced to engineering
                when I enrolled in a course boasting hands-on projects like a
                fettuccine bridge, eight-foot-tall wooden trebuchet, and an
                introduction to coding with Matlab. I eagerly enrolled and was
                presented with countless opportunities to problem solve and
                learn from the greatest teacher I have ever had to this day.
                This sparked my interest in coding &mdash; a Python course and
                many YouTube videos later I knew software engineering was for
                me.
              </p>
              <p>
                My college search was pretty unique &mdash; I was highly
                recruited to play football by schools around the country. I was
                intrigued by prestigious institutions like Duke, Northwestern,
                and Harvard, but knew balance in football and engineering was
                important to me. After countless visits and conversations, I
                decided on one of the most storied programs in college football.
                With a proven track record of student-athlete excellence and a
                city with a fast-emerging tech scene, I knew Nebraska was the
                school for me. &#127805;
              </p>
              <p>
                <ExternalLink
                  to="https://youtu.be/pPqnZ709VG0"
                  className="text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  I played 5 seasons for the Cornhuskers
                </ExternalLink>{" "}
                on the offensive line, and started every game at right guard
                during my last season in 2021. I had an incredible experience
                playing in front of the greatest fans in college football. Even
                more incredible was my academic experience at Nebraska. I earned
                a bachelors degree in Software Engineering and a masters degree
                in Engineering Management, while also balancing football and
                part-time dev jobs. The support I had to pursue both was
                incredible, and I am eternally grateful for the opportunities
                that I had.
              </p>
              <p>
                Today, I&apos;m the founder of Web Forestry, where I create,
                plant, manage, conserve, and repair digital experiences via
                websites, apps, and e-commerce stores &mdash; enabling
                businesses to thrive without tech getting in their way. In my
                freetime, I enjoy working out, traveling around the world, and
                finding new rabbit holes to continue my lifelong quest of
                learning and creating.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://twitter.com/mattsichterman"
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/mattsichterman"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/msichterman"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/msichterman"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:msichterman1@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                msichterman1@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
