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
    "bg-gray-800 font-semibold text-gray-100 hover:bg-gray-700 active:bg-gray-800 active:text-gray-100/70 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-700 dark:active:text-gray-100/70",
  ],
  [
    "secondary",
    "bg-gray-50 font-medium text-gray-900 hover:bg-gray-100 active:bg-gray-100 active:text-gray-900/60 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:active:bg-gray-800/50 dark:active:text-gray-50/70",
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
    "inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none",
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
