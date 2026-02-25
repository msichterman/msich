"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CloseButton,
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";

import { Container } from "@/components/Container";
import avatarImage from "@/images/avatar.jpg";
import { ReactNode, useState, useEffect } from "react";
import { ChevronDown, Moon, Sun, X } from "lucide-react";

export type NavItemProps = {
  href: string;
  children: ReactNode;
};

function MobileNavItem({ href, children }: NavItemProps) {
  return (
    <li>
      <CloseButton as={Link} href={href} className="block py-2">
        {children}
      </CloseButton>
    </li>
  );
}

function MobileNavigation(props: Record<string, unknown>) {
  return (
    <nav className="flex items-center">
      <div className="pointer-events-auto" {...props}>
        <ModeToggle />
      </div>
      <Popover {...props}>
        <PopoverButton className="group ml-4 flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10 dark:hover:ring-white/20">
          Menu
          <ChevronDown className="ml-2 h-auto w-4 stroke-neutral-500 group-hover:stroke-neutral-700 dark:group-hover:stroke-neutral-400" />
        </PopoverButton>
        <PopoverBackdrop
          transition
          className="fixed inset-0 z-50 bg-neutral-800/40 backdrop-blur-sm transition duration-150 ease-out data-[closed]:opacity-0 dark:bg-black/80"
        />
        <PopoverPanel
          focus
          transition
          className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-neutral-900 dark:ring-neutral-800"
        >
          <div className="flex flex-row-reverse items-center justify-between">
            <CloseButton aria-label="Close menu" className="-m-1 p-1">
              <X className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
            </CloseButton>
            <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Navigation
            </h2>
          </div>
          <nav className="mt-6">
            <ul className="-my-2 divide-y divide-neutral-100 text-xs text-neutral-800 dark:divide-neutral-100/5 dark:text-neutral-300 sm:text-sm">
              <MobileNavItem href="/blog">Blog</MobileNavItem>
              <MobileNavItem href="/notes">Notes</MobileNavItem>
              <MobileNavItem href="/uses">Uses</MobileNavItem>
              <MobileNavItem href="/about">About</MobileNavItem>
              <MobileNavItem href="/contact">Contact</MobileNavItem>
            </ul>
          </nav>
        </PopoverPanel>
      </Popover>
    </nav>
  );
}

function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(pathname === href);
  }, [pathname, href]);

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

function DesktopNavigation(props: Record<string, unknown>) {
  return (
    <nav {...props}>
      <ul className="flex items-center rounded-full bg-white/90 px-3 text-xs font-medium text-neutral-800 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:text-neutral-200 dark:ring-white/10">
        <NavItem href="/blog">Blog</NavItem>
        <NavItem href="/notes">Notes</NavItem>
        <NavItem href="/uses">Uses</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact">Contact</NavItem>
        <div className="pointer-events-auto">
          <ModeToggle />
        </div>
      </ul>
    </nav>
  );
}

function ModeToggle() {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none");
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 0);
  }

  function toggleMode() {
    disableTransitionsTemporarily();

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const isSystemDarkMode = darkModeMediaQuery.matches;
    const isDarkMode = document.documentElement.classList.toggle("dark");

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode;
    } else {
      window.localStorage.isDarkMode = isDarkMode;
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-white/90 p-2 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur transition dark:bg-neutral-800/90 dark:ring-white/10 dark:hover:ring-white/20 sm:bg-transparent sm:shadow-none sm:ring-0 sm:backdrop-blur-none dark:sm:bg-transparent"
      onClick={toggleMode}
    >
      <Sun className="h-5 w-5 fill-neutral-100 stroke-neutral-500 transition group-hover:fill-neutral-200 group-hover:stroke-neutral-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-sky-50 [@media(prefers-color-scheme:dark)]:stroke-sky-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-sky-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-sky-600 [&>*]:fill-sky-500" />
      <Moon className="hidden h-5 w-5 fill-neutral-700 stroke-neutral-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-neutral-400 [@media_not_(prefers-color-scheme:dark)]:fill-sky-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-sky-500" />
    </button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 pt-6 pb-4 pointer-events-none">
      <Container>
        <div className="flex items-center gap-4">
          <div className="flex flex-1">
            <Link
              href="/"
              aria-label="Home"
              className="pointer-events-auto"
            >
              <div className="h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10">
                <Image
                  src={avatarImage}
                  alt=""
                  sizes="2.25rem"
                  className="h-9 w-9 rounded-full bg-neutral-100 object-cover dark:bg-neutral-800"
                  priority
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-1 justify-end md:justify-center">
            <MobileNavigation className="pointer-events-auto md:hidden" />
            <DesktopNavigation className="pointer-events-auto hidden md:block" />
          </div>
        </div>
      </Container>
    </header>
  );
}
