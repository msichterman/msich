import { ReactNode, useId } from "react";

type SectionProps = {
  title?: string;
  children?: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  const id = useId();

  return (
    <section
      aria-labelledby={id}
      className="md:border-l md:border-neutral-200 md:pl-6 md:dark:border-neutral-700/40"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2
          id={id}
          className="text-sm font-semibold text-neutral-800 dark:text-neutral-100"
        >
          {title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  );
}
