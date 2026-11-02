import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/data/profile";

export function markdownPath(path: string): string {
  if (path === "/" || path === "") return "/index.md";
  return `${path.replace(/\/$/, "")}.md`;
}

export function pageMetadata({
  title,
  description,
  path,
  ogPreface,
  ogTitle,
  ogType = "website",
}: {
  title: string;
  description: string;
  path: string;
  ogPreface: string;
  ogTitle?: string;
  ogType?: "website" | "article";
}): Metadata {
  const image = `/api/og?preface=${encodeURIComponent(ogPreface)}${
    ogTitle ? `&title=${encodeURIComponent(ogTitle)}` : ""
  }`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": `${SITE_URL}/rss/feed.xml`,
        "application/feed+json": `${SITE_URL}/rss/feed.json`,
        "text/markdown": `${SITE_URL}${markdownPath(path)}`,
      },
    },
    openGraph: {
      title,
      description,
      url: path === "/" ? SITE_URL : path,
      siteName: SITE_NAME,
      type: ogType,
      images: [{ url: image, width: 1200, height: 627, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
