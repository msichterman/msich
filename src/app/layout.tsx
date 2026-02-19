import { RootProvider } from "fumadocs-ui/provider";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import type { ReactNode } from "react";
import "../styles/globals.css";

const calSans = localFont({
  src: "../fonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-sans",
  weight: "400",
  display: "swap",
});

const ibm = IBM_Plex_Mono({
  variable: "--font-ibm",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Static dark mode initialization script — identical to _document.tsx.
// Uses a static string, not user input, so dangerouslySetInnerHTML is safe here.
const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${calSans.variable} ${ibm.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: modeScript }}
        />
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token="13a52d15-6508-4e96-850b-62c6e744f58e"
          async
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`}
        />
        <link
          rel="alternate"
          type="application/feed+json"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`}
        />
      </head>
      <body className="flex h-full flex-col bg-neutral-50 dark:bg-black">
        <RootProvider
          theme={{
            attribute: "class",
            defaultTheme: "system",
            disableTransitionOnChange: true,
          }}
        >
          <Providers>
            {children}
          </Providers>
          <Analytics />
        </RootProvider>
      </body>
    </html>
  );
}
