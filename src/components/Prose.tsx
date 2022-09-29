import clsx from "clsx";
import { ReactNode } from "react";

type SectionProps = {
  className: string;
  children: ReactNode;
};

export function Prose({ children, className }: SectionProps) {
  return (
    <div className={clsx(className, "prose dark:prose-invert")}>{children}</div>
  );
}
