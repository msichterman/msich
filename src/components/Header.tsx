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
import {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";
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
  const isActive = usePathname() === href;

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

function clamp(number: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
}

function AvatarContainer({
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={clsx(
        className,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-neutral-800/5 ring-1 ring-neutral-900/5 backdrop-blur dark:bg-neutral-800/90 dark:ring-white/10"
      )}
      {...props}
    />
  );
}

function Avatar({
  large = false,
  className,
  style,
  ...props
}: {
  large?: boolean;
  className?: string;
  style?: React.CSSProperties;
  props?: Record<string, unknown>;
}) {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, "pointer-events-auto")}
      style={style}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? "4rem" : "2.25rem"}
        className={clsx(
          "rounded-full bg-neutral-100 object-cover dark:bg-neutral-800",
          large ? "h-16 w-16 sm:h-20 sm:w-20" : "h-9 w-9"
        )}
        priority
      />
    </Link>
  );
}

export function Header() {
  const isHomePage = usePathname() === "/";

  const headerRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const isInitial = useRef(true);

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0;
    const upDelay = 64;

    function setProperty(property: string, value: string | null) {
      document.documentElement.style.setProperty(property, value);
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property);
    }

    function updateHeaderStyles() {
      const { top, height }: DOMRect =
        headerRef.current?.getBoundingClientRect() as DOMRect;
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial.current) {
        setProperty("--header-position", "sticky");
      }

      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed");
        removeProperty("--header-top");
        removeProperty("--avatar-top");
      } else {
        removeProperty("--header-inner-position");
        setProperty("--header-top", "0px");
        setProperty("--avatar-top", "0px");
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return;
      }

      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      );

      const borderScale = 1 / (toScale / scale);
      const borderX = (-toX + x) * borderScale;
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty("--avatar-border-transform", borderTransform);
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
    }

    function updateStyles() {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.current = false;
    }

    updateStyles();
    window.addEventListener("scroll", updateStyles, { passive: true });
    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("scroll", updateStyles, {
        passive: true,
      } as AddEventListenerOptions);
      window.removeEventListener("resize", updateStyles);
    };
  }, [isHomePage]);

  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex h-auto flex-col"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(4rem-0.75rem)]"
            />
            <Container
              className="top-0 order-last -mb-3 flex flex-col pt-3 sm:block"
              style={{ position: "var(--header-position)" as React.CSSProperties["position"] }}
            >
              <div
                className="top-[var(--avatar-top,0.75rem)] w-full"
                style={{ position: "var(--header-inner-position)" as React.CSSProperties["position"] }}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left sm:h-20 sm:w-20"
                    style={{ transform: "var(--avatar-image-transform)" }}
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{ position: "var(--header-position)" as React.CSSProperties["position"] }}
        >
          <Container
            className="top-[var(--header-top,1.5rem)] w-full"
            style={{ position: "var(--header-inner-position)" as React.CSSProperties["position"] }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div style={{ height: "var(--content-offset)" }} />}
    </>
  );
}
