import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { notesSource } from "@/lib/source";
import { FumadocsProvider } from "@/components/FumadocsProvider";
import { REVALIDATE_SECONDS } from "@/data/profile";
import type { ReactNode } from "react";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_SECONDS;

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <FumadocsProvider>
      <DocsLayout
        tree={notesSource.pageTree}
        nav={{ title: "Notes", enabled: false }}
        themeSwitch={{ enabled: false }}
      >
        {children}
      </DocsLayout>
    </FumadocsProvider>
  );
}
