import type { Metadata } from "next";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { SimpleLayout } from "@/layouts/SimpleLayout";
import { HTMLAttributes, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Uses - Matt Sichterman",
  description: "Software I use, gadgets I love, and other things I recommend.",
  openGraph: {
    images: [{ url: "https://msich.dev/api/og?preface=Matt+Sichterman+%E2%80%A3+Uses" }],
  },
};

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
    <SimpleLayout
      title="Software, hardware, and other stuff I use."
      intro="A current list of the tools and gear I use."
    >
      <div className="space-y-20">
        <ToolsSection title="Tools">
          <Tool title="Conductor" href="https://www.conductor.build/">
            I use this to run coding agents in parallel. Each one gets its
            own workspace.
          </Tool>
          <Tool title="Flue" href="https://flueframework.com/">
            The framework I use to build agents.
          </Tool>
          <Tool title="Cloudflare" href="https://www.cloudflare.com/">
            Where I deploy things.
          </Tool>
          <Tool title="Raycast" href="https://www.raycast.com/">
            My launcher. I use it all day, mostly for clipboard history and
            jumping between apps.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Everyday">
          <Tool title="Vivo Barefoot" href="https://www.vivobarefoot.com/us/">
            The shoes I wear most days.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Golf">
          <Tool
            title="Takomo 101T irons"
            href="https://takomogolf.com/products/iron-101t"
          >
            My irons.
          </Tool>
          <Tool title="Kirkland Signature wedges" href="https://www.costco.com">
            My wedges. 52, 56, and 60 from Costco.
          </Tool>
          <Tool
            title="TaylorMade Qi10 driver"
            href="https://www.taylormadegolf.com/Qi10-Driver/DW-JJI12.html"
          >
            My driver.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Listening">
          <Tool title="My First Million" href="https://www.mfmpod.com/">
            A podcast I listen to a lot. Sam Parr and Shaan Puri.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
}
