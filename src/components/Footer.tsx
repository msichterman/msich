import Link from "next/link";

import { Container } from "@/components/Container";
import { NavItemProps } from "./Header";
import { useRouter } from "next/router";
import clsx from "clsx";
import WebForestry from "./vectors/WebForestry";
import ExternalLink from "./ExternalLink";

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
        <div className="border-t border-gray-100 dark:border-gray-700/40">
          <Container.Inner>
            <div className="flex h-32 flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-gray-800 dark:text-gray-200">
                <NavLink href="/metrics">Metrics</NavLink>
                {/* <NavLink href="/projects">Projects</NavLink>
                <NavLink href="/articles">Articles</NavLink> */}
                <NavLink href="/uses">Uses</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                &copy; {new Date().getFullYear()} Matt Sichterman. All rights
                reserved.
              </p>
              <ExternalLink href="https://webforestry.com">
                <div className="flex items-center rounded-md border border-emerald-600 bg-emerald-50 p-1 text-xxs font-bold text-gray-800">
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
