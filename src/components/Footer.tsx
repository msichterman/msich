import Link from "next/link";

import { Container } from "@/components/Container";
import { NavItemProps } from "./Header";
import { useRouter } from "next/router";
import clsx from "clsx";

function NavLink({ href, children }: NavItemProps) {
  const isActive = useRouter().pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "rounded px-1 transition hover:text-sky-500 dark:hover:text-sky-400",
        isActive &&
          "border border-sky-300 bg-sky-100 dark:border-sky-600 dark:bg-sky-800"
      )}
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/speaking">Speaking</NavLink>
                <NavLink href="/uses">Uses</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Matt Sichterman. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
