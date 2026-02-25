import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { notesSource } from "@/lib/source";
import type { ReactNode } from "react";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={notesSource.pageTree}
      nav={{ title: "Notes", enabled: false }}
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
}
