// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import "../styles/globals.css";
import { useEffect, useRef } from "react";
import localFont from "@next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { trpc } from "@/utils/trpc";
import clsx from "clsx";

function usePrevious(value: string) {
  const ref = useRef<string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const calSans = localFont({ src: "./CalSans-SemiBold.woff2" });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) => {
  const previousPathname = usePrevious(router.pathname);

  return (
    <>
      <SessionProvider session={session}>
        <>
          <div className="fixed inset-0 flex justify-center sm:px-8">
            <div className="flex w-full max-w-7xl lg:px-8">
              <div className="w-full bg-white ring-1 ring-neutral-100 dark:bg-neutral-900 dark:ring-neutral-300/20" />
            </div>
          </div>
          <main className={clsx("relative h-screen", calSans.className)}>
            <Header />
            <div className={calSans.className}>
              <Component previousPathname={previousPathname} {...pageProps} />
              <Analytics />
            </div>
            <Footer />
          </main>
        </>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
