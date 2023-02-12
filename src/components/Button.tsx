import Link, { LinkProps } from "next/link";
import clsx from "clsx";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  RefAttributes,
} from "react";

const variantStyles = new Map<string, string>([
  [
    "primary",
    "bg-neutral-800 font-semibold text-neutral-100 hover:bg-neutral-700 active:bg-neutral-800 active:text-neutral-100/70 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:active:bg-neutral-700 dark:active:text-neutral-100/70",
  ],
  [
    "secondary",
    "bg-neutral-50 font-medium text-neutral-900 hover:bg-neutral-100 active:bg-neutral-100 active:text-neutral-900/60 dark:bg-neutral-800/50 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:active:bg-neutral-800/50 dark:active:text-neutral-50/70",
  ],
]);

type ButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  Omit<LinkProps, "href"> & {
    children?: React.ReactNode;
  } & RefAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement> &
  RefAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
  } & {
    href?: string | URL;
  };

export function Button({
  variant = "primary",
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-xs outline-offset-2 transition active:transition-none",
    variantStyles.get(variant),
    className
  );

  return href ? (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
