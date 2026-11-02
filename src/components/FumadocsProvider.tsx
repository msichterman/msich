"use client";

import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";

export function FumadocsProvider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      theme={{
        attribute: "class",
        defaultTheme: "system",
        disableTransitionOnChange: true,
      }}
    >
      {children}
    </RootProvider>
  );
}
