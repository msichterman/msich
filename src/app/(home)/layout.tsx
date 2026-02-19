import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col justify-between bg-gradient-to-r from-neutral-100 to-white dark:bg-gradient-to-l dark:from-neutral-900 dark:to-black">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </main>
  );
}
