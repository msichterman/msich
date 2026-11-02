/** Canonical origin. Apex msich.dev 308-redirects to www. */
export const SITE_URL = "https://www.msich.dev";

export const SITE_NAME = "Matt Sichterman";

export const EMAIL = "msichterman1@gmail.com";

export const HOGMOLLIE_URL =
  "https://www.urbandictionary.com/define.php?term=hogmollie";

export const FLAMEL_URL = "https://flamel.ai/";

export const JURGY_URL = "https://jurgy.co";

export const FLAMEL_DESCRIPTION =
  "Flamel is the paid media hub for multi-location brands, running localized paid campaigns across Google, Meta, and ChatGPT.";

export const FLAMEL_JOINING = "Flamel is joining Yext.";

export const JURGY_TAGLINE = "Beef Jerky for Champions";

export const HOME_TITLE =
  "Matt Sichterman - Engineer, entrepreneur, and former hogmollie";

export const HOME_DESCRIPTION = `CTO at Flamel.ai. ${FLAMEL_DESCRIPTION} ${FLAMEL_JOINING} Co-founder of Jurgy, ${JURGY_TAGLINE}, with Baltimore Ravens center Cam Jurgens.`;

export const ABOUT_TITLE = "About - Matt Sichterman";

export const ABOUT_DESCRIPTION = `${HOME_DESCRIPTION} Based in Cincinnati, OH.`;

export const SOCIAL = {
  x: "https://x.com/mattsichterman",
  instagram: "https://www.instagram.com/mattsichterman",
  github: "https://github.com/msichterman",
  linkedin: "https://www.linkedin.com/in/msichterman",
  email: `mailto:${EMAIL}`,
} as const;

export const SAME_AS = [
  SOCIAL.x,
  SOCIAL.instagram,
  SOCIAL.github,
  SOCIAL.linkedin,
  "https://flamel.ai",
  JURGY_URL,
];

/** Shared cache for public content documents. */
export const DOCUMENT_CACHE =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800";

export const REVALIDATE_SECONDS = 86400;
