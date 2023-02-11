import Image from "next/image";
import Head from "next/head";

import { Container } from "@/components/Container";
import portraitImage from "@/images/portrait.jpg";
import ExternalLink from "@/components/ExternalLink";
import Newsletter from "@/components/Newsletter";
import Resume from "@/components/Resume";
import SocialLinks from "@/components/SocialLinks";

export default function About() {
  return (
    <>
      <Head>
        <title>About - Matt Sichterman</title>
        <meta
          name="description"
          content="I’m Matt Sichterman. I live in Cincinnati, OH, where I develop thriving digital experiences."
        />
        <meta
          property="og:image"
          content={`https://msich.dev/api/og?preface=${"Matt Sichterman ‣ About"}`}
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
                className="aspect-square rotate-3 rounded-2xl bg-neutral-100 object-cover dark:bg-neutral-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
              I’m Matt Sichterman. <br /> I live in Cincinnati, OH, where I
              develop thriving digital experiences.
            </h1>
            <div className="mt-6 space-y-7 text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
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
                  href="https://youtu.be/pPqnZ709VG0"
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
                free time, I enjoy working out, traveling around the world, and
                finding new rabbit holes to continue my lifelong quest of
                learning and creating.
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
    </>
  );
}
