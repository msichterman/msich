// src/pages/_app.tsx
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import "../styles/globals.css";
import { useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { trpc } from "@/utils/trpc";

function usePrevious(value: string) {
  const ref = useRef<string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

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
              <div className="w-full bg-white ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-300/20" />
            </div>
          </div>
          <div className="relative h-screen">
            <Header />
            <main className="min-h-[60vh]">
              <Component previousPathname={previousPathname} {...pageProps} />
              <Analytics />
            </main>
            <Footer />
          </div>
        </>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
