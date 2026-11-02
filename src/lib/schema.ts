import {
  ABOUT_DESCRIPTION,
  EMAIL,
  FLAMEL_DESCRIPTION,
  FLAMEL_JOINING,
  HOME_DESCRIPTION,
  JURGY_TAGLINE,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
} from "@/data/profile";

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/og-avatar.jpg`,
        jobTitle: "CTO",
        email: EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cincinnati",
          addressRegion: "OH",
          addressCountry: "US",
        },
        worksFor: {
          "@type": "Organization",
          name: "Flamel.ai",
          url: "https://flamel.ai",
        },
        description: `${FLAMEL_DESCRIPTION} ${FLAMEL_JOINING} Co-founder of Jurgy, ${JURGY_TAGLINE}.`,
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_NAME,
        description: ABOUT_DESCRIPTION,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  description?: string;
  date: string;
  slug: string;
  tags?: string[];
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}/api/og?preface=${encodeURIComponent("Matt Sichterman \u2023 Blog")}&title=${encodeURIComponent(post.title)}`,
    inLanguage: "en",
    keywords: post.tags?.join(", ") || undefined,
  };
}
