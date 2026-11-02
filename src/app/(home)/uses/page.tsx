import type { Metadata } from "next";

import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { uses } from "@/data/uses";
import { pageMetadata } from "@/lib/metadata";
import { SimpleLayout } from "@/layouts/SimpleLayout";
import { HTMLAttributes, ReactNode } from "react";

export const metadata: Metadata = pageMetadata({
  title: "Uses - Matt Sichterman",
  description: "Software I use, gadgets I love, and other things I recommend.",
  path: "/uses",
  ogPreface: "Matt Sichterman \u2023 Uses",
});

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
        {uses.map((group) => (
          <ToolsSection key={group.title} title={group.title}>
            {group.items.map((item) => (
              <Tool key={item.title} title={item.title} href={item.href}>
                {item.description}
              </Tool>
            ))}
          </ToolsSection>
        ))}
      </div>
    </SimpleLayout>
  );
}
