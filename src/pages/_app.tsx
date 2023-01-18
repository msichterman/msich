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
          <main
            className={clsx(
              "relative min-h-screen bg-gradient-to-r from-neutral-200 via-neutral-100 to-white dark:bg-gradient-to-l dark:from-neutral-800 dark:via-neutral-900 dark:to-black",
              calSans.className
            )}
          >
            <Header />
            <Component previousPathname={previousPathname} {...pageProps} />
            <Analytics />
            <Footer />
          </main>
        </>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
