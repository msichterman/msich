import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import portraitImage from "@/images/portrait.jpg";
import ExternalLink from "@/components/ExternalLink";
import Newsletter from "@/components/Newsletter";
import Resume from "@/components/Resume";
import SocialLinks from "@/components/SocialLinks";
import {
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  FLAMEL_URL,
  JURGY_TAGLINE,
  JURGY_URL,
  YEXT_URL,
} from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

const linkClass =
  "tracking-wide text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300";

export const metadata: Metadata = pageMetadata({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  path: "/about",
  ogPreface: "Matt Sichterman \u2023 About",
});

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-neutral-100 object-cover dark:bg-neutral-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-2xl font-bold tracking-tight text-balance text-neutral-800 dark:text-neutral-100 sm:text-4xl">
            I&apos;m Matt Sichterman. <br /> I live in Cincinnati, OH, where I
            build software and brands.
          </h1>
          <div className="mt-6 space-y-7 text-xs text-pretty text-neutral-600 dark:text-neutral-400 sm:text-sm">
            <p>
              Ever since I was young, I&apos;ve woken up excited about two
              things: sports and technology. The games have been with me for
              as long as I can remember. They took me across the country, into
              new cities and big competitions, and connected me with
              incredible teammates, leaders, and people. Technology found
              another way in, feeding my hunger to learn and create.
            </p>
            <p>
              &quot;Pick something hard and be the best at it&quot; is a
              quote from my dad, who has always encouraged me to work hard and
              dream big. Early on, that meant disassembling computers,
              dabbling in every computer app I could get my hands on, and
              helping out with maintenance projects around the house. I
              learned new skills with every experience, yet continued to
              search for opportunities to build things and quench my thirst
              for creativity.
            </p>
            <p>
              Sophomore year of high school, I was introduced to engineering
              in a course full of hands-on projects: a fettuccine bridge, an
              eight-foot-tall wooden trebuchet, and a first pass at coding
              with Matlab. I showed up ready, and got countless chances to
              problem solve and learn from the greatest teacher I have ever
              had.
              This sparked my interest in coding. A Python course and
              many YouTube videos later I knew software engineering was for
              me.
            </p>
            <p>
              My college search was unusual. I was highly
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
                href="https://youtu.be/pPqnZ709VG0"
                className={linkClass}
              >
                I played 5 seasons for the Cornhuskers
              </ExternalLink>{" "}
              on the offensive line, and started every game at right guard
              during my last season in 2021. I had an incredible experience
              playing in front of the greatest fans in college football. Even
              more incredible was my academic experience at Nebraska. I earned
              a bachelor&apos;s degree in Software Engineering and a master&apos;s
              degree in Engineering Management, while also balancing football and
              part-time dev jobs. The support I had to pursue both was
              incredible, and I am eternally grateful for the opportunities
              that I had.
            </p>
            <p>
              Today I&apos;m a Senior Software Engineer on{" "}
              <ExternalLink href={YEXT_URL} className={linkClass}>
                Yext
              </ExternalLink>
              &apos;s Paid Media team. I was CTO of{" "}
              <ExternalLink href={FLAMEL_URL} className={linkClass}>
                Flamel.ai
              </ExternalLink>{" "}
              (acquired by Yext in November 2026). I&apos;m also co-founder of{" "}
              <ExternalLink
                href={JURGY_URL}
                className={linkClass}
              >
                Jurgy
              </ExternalLink>
              , {JURGY_TAGLINE}, a brand I started with my college teammate and
              Baltimore Ravens center Cam Jurgens. In my free time, I enjoy working
              out, traveling, and finding new rabbit holes to continue my
              lifelong quest of learning and creating.
            </p>
          </div>
        </div>
        <div className="space-y-10 lg:pl-20">
          <SocialLinks />
          <Newsletter />
          <Resume />
        </div>
      </div>
    </Container>
  );
}
