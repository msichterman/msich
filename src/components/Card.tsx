import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { ElementType, ReactNode } from "react";
import ExternalLink from "./ExternalLink";

type CardProps = {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

export function Card({
  as: Component = "div",
  className,
  children,
}: CardProps) {
  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
    >
      {children}
    </Component>
  );
}

type CardLinkProps = {
  children: ReactNode;
  href: string;
};

Card.Link = function CardLink({ children, href, ...props }: CardLinkProps) {
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-neutral-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-neutral-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <ExternalLink href={href} {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </ExternalLink>
    </>
  );
};

type CardTitleProps = {
  as?: ElementType;
  children: ReactNode;
  href?: string;
};

Card.Title = function CardTitle({
  as: Component = "h2",
  href,
  children,
}: CardTitleProps) {
  return (
    <Component className="text-base font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="relative z-10 mt-2 text-sm text-neutral-600 dark:text-neutral-400 sm:tracking-wide">
      {children}
    </p>
  );
};

Card.Cta = function CardCta({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-sky-500"
    >
      {children}
      <ChevronRight className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

type CardEyebrowProps = {
  as?: ElementType;
  children: ReactNode;
  href?: string;
  decorate?: boolean;
  className?: string;
  dateTime?: string;
};

Card.Eyebrow = function CardEyebrow({
  as: Component = "p",
  decorate = false,
  className,
  children,
  ...props
}: CardEyebrowProps) {
  return (
    <Component
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-neutral-400 dark:text-neutral-500",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-500" />
        </span>
      )}
      {children}
    </Component>
  );
};
