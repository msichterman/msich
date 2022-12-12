import Head from "next/head";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SimpleLayout } from "@/layouts/SimpleLayout";
import { HTMLAttributes, ReactNode } from "react";

function ToolsSection({
  children,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: ReactNode;
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Uses - Matt Sichterman</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Software and hardware that I use to simplify my life and maximize my productivity."
        intro="I get asked a lot about the things I use to build software, stay productive, and make my life easier in general. Here's a long-list of all of my favorite tech."
      >
        <div className="space-y-20">
          <ToolsSection title="Hardware">
            <Tool title="15” MacBook Pro, 16GB RAM (2017)">
              I inherited this device through a previous internship when it was
              deemed &quot;end-of-life&quot; for the organization. It does
              absolutely everything I need it to, so no plans to rush to an
              upgrade. Though, I was lucky enough to run a M1 MacBook Pro in a
              previous job, and those things are NICE. I will probably crack
              eventually and get Apple silicon for my next device.
            </Tool>
            <Tool title="iPhone 14 Pro Max">
              This thing is a beast! And that camera though{" "}
              <span role="img" aria-label="heart eyes">
                😍
              </span>
            </Tool>
            <Tool
              title="Logitech MK850 Performance Wireless Keyboard and Mouse Combo"
              href="https://www.logitech.com/en-us/products/combos/mk850-wireless-keyboard-mouse"
            >
              Thank you Costco. This is an excellent combo and I really have no
              complaints. I love being able to switch from my personal computer
              to my work computer with the click of a button. If you&apos;re
              looking for something modest that gets the job done, I highly
              recommend this combo.
            </Tool>
            <Tool
              title="FAMISKY Dual Motors Standing Desk"
              href="https://www.amazon.com/gp/product/B08HMVDNYJ"
            >
              If I&apos;m going to work on my computer all day and all night, I
              might as well do it on an awesome desk. This was a graduation
              gift, and I love being able to sit-stand-sit-stand throughout the
              day.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="Visual Studio Code">
              If you&apos;re not using this exclusively by now you should be.
              Yes, I&apos;m talking to you dotnet peeps...
            </Tool>
            <Tool title="T3 Stack" href="https://beta.create.t3.gg/">
              The best way to setup an opinionated, full-stack, typesafe Next.js
              project. I have always been the tech stack guy, but seriousy this
              one is good.
            </Tool>
            <Tool title="Vercel" href="https://vercel.com/">
              A platform to iterate quickly and develop, preview, and ship
              delightful user experiences. It is incredible how performant
              Next.js sites can be!
            </Tool>
            <Tool title="Plausible" href="https://plausible.io/">
              The simple and privacy-friendly Google Analytics alternative. It
              is lightweight and open source web analytics, with no cookies and
              fully compliant with GDPR, CCPA and PECR.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="TailwindCSS">
              A utility-first CSS framework that helps you build beautiful,
              responsive designs without any extra configuration. It&apos;s
              built with utility-first principles, and is completely
              customizable and extendable.
            </Tool>
            <Tool title="Figma">
              I feel clumsy in any other design tool. Figma is great for design,
              but also for editing SVGs, transforming image file types, and
              more. Hopefully Adobe does&apos;t mess this up.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Notion" href="https://www.notion.so/">
              An all-in-one workspace where you can write, plan, collaborate and
              get organized - it allows you to take notes, add tasks, manage
              projects and more. I am a huge fan of markdown, and I find that
              the Notion editor is the best way to get my thoughts in writing.
            </Tool>
            <Tool title="Raycast" href="https://www.raycast.com/">
              A blazingly fast, totally extendable launcher. It lets you
              complete tasks, calculate, share common links, and much more. My
              favorite parts? Clipboard history and slapping &quot;Quit All
              Applications&quot; at the end of a long day.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  );
}
