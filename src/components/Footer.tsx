import Link from "next/link";

import { Container } from "@/components/Container";
import { NavItemProps } from "./Header";
import { useRouter } from "next/router";
import clsx from "clsx";
import WebForestry from "./vectors/WebForestry";
import ExternalLink from "./ExternalLink";

function NavItem({ href, children }: NavItemProps) {
  const isActive = useRouter().pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-sky-500 dark:text-sky-400"
            : "hover:text-sky-500 dark:hover:text-sky-400"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0 dark:from-sky-400/0 dark:via-sky-400/40 dark:to-sky-400/0" />
        )}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-neutral-100 py-10 dark:border-neutral-700/40">
          <Container.Inner>
            <div className="min-h-32 flex flex-col items-center justify-between gap-6 sm:flex-row">
              <ul className="flex gap-6 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                <NavItem href="/metrics">Metrics</NavItem>
                {/* <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/articles">Articles</NavLink> */}
                <NavItem href="/uses">Uses</NavItem>
                <NavItem href="/about">About</NavItem>
                <NavItem href="/contact">Contact</NavItem>
              </ul>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">
                &copy; {new Date().getFullYear()} Matt Sichterman. All rights
                reserved.
              </p>
              <ExternalLink href="https://webforestry.com">
                <div className="flex items-center rounded-md border border-emerald-600 bg-emerald-50 p-1 text-xxs font-bold text-neutral-800">
                  <WebForestry className="h-4" />
                </div>
              </ExternalLink>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
