import { Container } from "@/components/Container";
import { ReactNode } from "react";

type SimpleLayoutProps = {
  title: string;
  intro: string;
  children?: ReactNode;
};

export function SimpleLayout({ title, intro, children }: SimpleLayoutProps) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance text-neutral-800 dark:text-neutral-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-xs text-pretty text-neutral-600 dark:text-neutral-400 sm:text-sm">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  );
}
