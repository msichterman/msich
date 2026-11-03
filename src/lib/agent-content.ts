import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { projects, projectHref } from "@/data/projects";
import {
  ABOUT_DESCRIPTION,
  CONTACT_DESCRIPTION,
  EMAIL,
  FLAMEL_DESCRIPTION,
  HOGMOLLIE_URL,
  HOME_DESCRIPTION,
  HOME_TITLE,
  JURGY_TAGLINE,
  JURGY_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL,
  YEXT_URL,
} from "@/data/profile";
import { resume } from "@/data/resume";
import { uses } from "@/data/uses";
import { blogSource, notesSource } from "@/lib/source";

export type DocSection = "Pages" | "Blog" | "Notes";

export type PublicDoc = {
  path: string;
  title: string;
  description: string;
  section: DocSection;
  lastModified?: string;
};

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "Google-Extended",
  "GoogleOther",
  "PerplexityBot",
  "Perplexity-User",
  "Amazonbot",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
];


function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "").trim();
}

function readMdx(dir: string, slugs: string[]): string {
  const slug = slugs.length > 0 ? slugs.join("/") : "index";
  const candidates = [
    join(process.cwd(), dir, `${slug}.mdx`),
    join(process.cwd(), dir, slug, "index.mdx"),
  ];
  for (const file of candidates) {
    if (existsSync(file)) return stripFrontmatter(readFileSync(file, "utf8"));
  }
  return "";
}

function blogPosts() {
  return blogSource
    .getPages()
    .map((page) => {
      const data = page.data as typeof page.data & {
        description?: string;
        date?: string;
        author?: string;
        tags?: string[];
      };
      return {
        path: page.url,
        title: data.title,
        description: data.description ?? "",
        date: data.date ? String(data.date).slice(0, 10) : undefined,
        author: data.author ?? SITE_NAME,
        tags: data.tags ?? [],
        slugs: page.slugs,
      };
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

function notePages() {
  return notesSource.getPages().map((page) => {
    const data = page.data as typeof page.data & { description?: string };
    return {
      path: page.url,
      title: data.title,
      description: data.description ?? "",
      slugs: page.slugs,
    };
  });
}

export function listPublicDocs(): PublicDoc[] {
  const pages: PublicDoc[] = [
    {
      path: "/",
      title: "Home",
      description: HOME_DESCRIPTION,
      section: "Pages",
    },
    {
      path: "/about",
      title: "About",
      description: ABOUT_DESCRIPTION,
      section: "Pages",
    },
    {
      path: "/projects",
      title: "Projects",
      description: "Things I've made trying to put my dent in the universe.",
      section: "Pages",
    },
    {
      path: "/uses",
      title: "Uses",
      description: "Software I use, gadgets I love, and other things I recommend.",
      section: "Pages",
    },
    {
      path: "/contact",
      title: "Contact",
      description: CONTACT_DESCRIPTION,
      section: "Pages",
    },
    {
      path: "/blog",
      title: "Blog",
      description:
        "Long-form thoughts on software engineering, entrepreneurship, and more.",
      section: "Pages",
    },
  ];

  for (const post of blogPosts()) {
    pages.push({
      path: post.path,
      title: post.title,
      description: post.description,
      section: "Blog",
      lastModified: post.date,
    });
  }

  for (const note of notePages()) {
    if (pages.some((page) => page.path === note.path)) continue;
    pages.push({
      path: note.path,
      title: note.title,
      description: note.description,
      section: "Notes",
    });
  }

  return pages;
}

function homeMarkdown(): string {
  const projectLines = projects
    .map((project) => {
      const href = projectHref(project);
      const name = href ? `[${project.name}](${href})` : project.name;
      return `- ${name}: ${project.description}`;
    })
    .join("\n");

  const workLines = resume
    .map((entry) => {
      const roles = entry.roles
        .map((role) => {
          const end = role.end.label ?? role.end.dateTime ?? "";
          return `${role.title} (${role.start}–${end})`;
        })
        .join("; ");
      const name = entry.href ? `[${entry.company}](${entry.href})` : entry.company;
      return `### ${name}\n\n${roles}.\n\n${entry.description}`;
    })
    .join("\n\n");

  return `# ${SITE_NAME}

> Engineer, entrepreneur, and former hogmollie.

I'm Matt. Flamel was acquired by [Yext](${YEXT_URL}) in November 2026; I'm now a Senior Software Engineer on Yext's Paid Media team. ${FLAMEL_DESCRIPTION} I'm also co-founder of [Jurgy](${JURGY_URL}), ${JURGY_TAGLINE}, a brand I started with Baltimore Ravens center Cam Jurgens.

[What the heck is a hogmollie?](${HOGMOLLIE_URL})

## Contact

- Email: ${EMAIL}
- X: ${SOCIAL.x}
- Instagram: ${SOCIAL.instagram}
- GitHub: ${SOCIAL.github}
- LinkedIn: ${SOCIAL.linkedin}

## Projects

${projectLines}

## Work

${workLines}
`;
}

function aboutMarkdown(): string {
  return `# About ${SITE_NAME}

> ${ABOUT_DESCRIPTION}

I'm Matt Sichterman. I live in Cincinnati, OH, where I develop thriving digital experiences.

Ever since I was young, I've woken up excited about two things: sports and technology. Sports have been a mainstay in my life for as long as I can remember. Sports have taken me all across the country, and have allowed me to experience great places, cities, and competitions. Most of all, sports have connected me with incredible teammates, leaders, and people. Technology has found its way into my life in other ways, feeding my hunger to learn and create.

"Pick something hard and be the best at it", is a quote from my dad who has always encouraged me to work hard and dream big. Early on, that meant disassembling computers, dabbling in every computer app I could get my hands on, and helping out with maintenance projects around the house. I learned new skills with every experience, yet continued to search for opportunities to build things and quench my thirst for creativity.

Sophomore year of high school, I was introduced to engineering when I enrolled in a course boasting hands-on projects like a fettuccine bridge, eight-foot-tall wooden trebuchet, and an introduction to coding with Matlab. I eagerly enrolled and was presented with countless opportunities to problem solve and learn from the greatest teacher I have ever had to this day. This sparked my interest in coding. A Python course and many YouTube videos later I knew software engineering was for me.

My college search was pretty unique. I was highly recruited to play football by schools around the country. I was intrigued by prestigious institutions like Duke, Northwestern, and Harvard, but knew balance in football and engineering was important to me. After countless visits and conversations, I decided on one of the most storied programs in college football. With a proven track record of student-athlete excellence and a city with a fast-emerging tech scene, I knew Nebraska was the school for me.

[I played 5 seasons for the Cornhuskers](https://youtu.be/pPqnZ709VG0) on the offensive line, and started every game at right guard during my last season in 2021. I had an incredible experience playing in front of the greatest fans in college football. Even more incredible was my academic experience at Nebraska. I earned a bachelors degree in Software Engineering and a masters degree in Engineering Management, while also balancing football and part-time dev jobs. The support I had to pursue both was incredible, and I am eternally grateful for the opportunities that I had.

Today I'm a Senior Software Engineer on [Yext](${YEXT_URL})'s Paid Media team. Flamel was acquired by Yext in November 2026. ${FLAMEL_DESCRIPTION} I'm also co-founder of [Jurgy](${JURGY_URL}), ${JURGY_TAGLINE}, a brand I started with my college teammate and Baltimore Ravens center Cam Jurgens. In my free time, I enjoy working out, traveling, and finding new rabbit holes to continue my lifelong quest of learning and creating.

## Contact

- Email: ${EMAIL}
- X: ${SOCIAL.x}
- Instagram: ${SOCIAL.instagram}
- GitHub: ${SOCIAL.github}
- LinkedIn: ${SOCIAL.linkedin}
`;
}

function projectsMarkdown(): string {
  const lines = projects
    .map((project) => {
      const href = projectHref(project);
      const name = href ? `[${project.name}](${href})` : project.name;
      return `## ${name}\n\n${project.description}`;
    })
    .join("\n\n");
  return `# Projects

> Things I've made trying to put my dent in the universe.

Products I've built, brands I've started, and systems I've shipped. AI marketing infrastructure, a beef jerky company, and a lot in between.

${lines}
`;
}

function usesMarkdown(): string {
  const groups = uses
    .map((group) => {
      const items = group.items
        .map((item) => {
          const name = item.href ? `[${item.title}](${item.href})` : item.title;
          return `- ${name}: ${item.description}`;
        })
        .join("\n");
      return `## ${group.title}\n\n${items}`;
    })
    .join("\n\n");
  return `# Uses

> Software, hardware, and other stuff I use.

A current list of the tools and gear I use.

${groups}
`;
}

function contactMarkdown(): string {
  return `# Contact

> ${CONTACT_DESCRIPTION}

Send a message, or find me around the internet.

- Email: ${EMAIL}
- X: ${SOCIAL.x}
- Instagram: ${SOCIAL.instagram}
- GitHub: ${SOCIAL.github}
- LinkedIn: ${SOCIAL.linkedin}

The message form is on the HTML page at ${SITE_URL}/contact.
`;
}

function blogIndexMarkdown(): string {
  const lines = blogPosts()
    .map((post) => {
      const when = post.date ? ` (${post.date})` : "";
      return `- [${post.title}](${SITE_URL}${post.path}.md)${when}: ${post.description}`;
    })
    .join("\n");
  return `# Blog

> Long-form thoughts on software engineering, entrepreneurship, and more.

All of my long-form thoughts on programming, leadership, entrepreneurship, and more, collected in chronological order.

${lines}
`;
}

function postMarkdown(post: ReturnType<typeof blogPosts>[number]): string {
  const body = readMdx("content/blog", post.slugs);
  const tags = post.tags.length > 0 ? `\n\nTags: ${post.tags.join(", ")}` : "";
  return `# ${post.title}

> ${post.description}

${post.author}${post.date ? ` · ${post.date}` : ""}${tags}

${body}
`;
}

function noteMarkdown(note: ReturnType<typeof notePages>[number]): string {
  const body = readMdx("content/notes", note.slugs);
  return `# ${note.title}

> ${note.description}

${body}
`;
}

export function markdownForPath(pathname: string): string | null {
  const path = normalizeContentPath(pathname);
  if (path === "/") return homeMarkdown().trim() + "\n";
  if (path === "/about") return aboutMarkdown().trim() + "\n";
  if (path === "/projects") return projectsMarkdown().trim() + "\n";
  if (path === "/uses") return usesMarkdown().trim() + "\n";
  if (path === "/contact") return contactMarkdown().trim() + "\n";
  if (path === "/blog") return blogIndexMarkdown().trim() + "\n";

  const post = blogPosts().find((entry) => entry.path === path);
  if (post) return postMarkdown(post).trim() + "\n";

  const note = notePages().find((entry) => entry.path === path);
  if (note) return noteMarkdown(note).trim() + "\n";

  return null;
}

export function normalizeContentPath(pathname: string): string {
  let path = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.endsWith(".md")) path = path.slice(0, -3) || "/";
  if (path === "/index") path = "/";
  if (!path.startsWith("/")) path = `/${path}`;
  return path || "/";
}

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export function markdownUrl(path: string): string {
  const normalized = normalizeContentPath(path);
  if (normalized === "/") return `${SITE_URL}/index.md`;
  return `${SITE_URL}${normalized}.md`;
}

export function llmsTxt(): string {
  const docs = listPublicDocs();
  const sections: DocSection[] = ["Pages", "Blog", "Notes"];
  const blocks = sections
    .map((section) => {
      const items = docs.filter((doc) => doc.section === section);
      if (items.length === 0) return "";
      const lines = items
        .map(
          (doc) =>
            `- [${doc.title}](${markdownUrl(doc.path)}): ${doc.description}`
        )
        .join("\n");
      return `## ${section}\n\n${lines}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return `# ${SITE_NAME}

> ${HOME_TITLE.replace(`${SITE_NAME} - `, "")}. ${HOME_DESCRIPTION}

${SITE_NAME} is a software engineer in Cincinnati, OH. Public email: ${EMAIL}.

${blocks}

## Optional

- [RSS](${SITE_URL}/rss/feed.xml): Blog feed
- [JSON Feed](${SITE_URL}/rss/feed.json): Blog feed as JSON
- [Sitemap](${SITE_URL}/sitemap.xml): XML sitemap
- [Full content](${SITE_URL}/llms-full.txt): Every page in one markdown file
`;
}

export function llmsFullTxt(): string {
  const parts = listPublicDocs().map((doc) => {
    const body = markdownForPath(doc.path) ?? `# ${doc.title}\n\n${doc.description}\n`;
    return body.trim();
  });
  return `${parts.join("\n\n---\n\n")}\n`;
}

export function robotsTxt(): string {
  const groups = ["*", ...AI_CRAWLERS]
    .map((agent) => `User-agent: ${agent}\nAllow: /\n`)
    .join("\n");

  return `# ${SITE_URL} robots.txt
# AI crawlers may read this site.
# Content usage preferences (https://contentsignals.org/): search=yes, ai-input=yes, ai-train=no.

${groups}
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function sitemapXml(): string {
  const urls = listPublicDocs()
    .map((doc) => {
      const lastmod = doc.lastModified
        ? `\n    <lastmod>${xmlEscape(doc.lastModified)}</lastmod>`
        : "";
      return `  <url>\n    <loc>${xmlEscape(absoluteUrl(doc.path))}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function rssXml(): string {
  const items = blogPosts()
    .map((post) => {
      const link = absoluteUrl(post.path);
      const pubDate = post.date
        ? new Date(`${post.date}T00:00:00.000Z`).toUTCString()
        : new Date().toUTCString();
      const body = readMdx("content/blog", post.slugs);
      const cdata = body.replace(/]]>/g, "]]&gt;");
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>
      <pubDate>${xmlEscape(pubDate)}</pubDate>
      <description>${xmlEscape(post.description)}</description>
      <content:encoded><![CDATA[${cdata}]]></content:encoded>
      <author>${xmlEscape(`${EMAIL} (${post.author})`)}</author>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xmlEscape(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape(HOME_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

export function feedJson(): string {
  return JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1.1",
      title: SITE_NAME,
      home_page_url: SITE_URL,
      feed_url: `${SITE_URL}/rss/feed.json`,
      description: HOME_DESCRIPTION,
      authors: [{ name: SITE_NAME, url: SITE_URL }],
      language: "en",
      items: blogPosts().map((post) => ({
        id: absoluteUrl(post.path),
        url: absoluteUrl(post.path),
        title: post.title,
        summary: post.description,
        content_text: readMdx("content/blog", post.slugs),
        date_published: post.date ? `${post.date}T00:00:00.000Z` : undefined,
        authors: [{ name: post.author }],
        tags: post.tags,
      })),
    },
    null,
    2
  );
}

export function openApiDocument() {
  const textDoc = {
    "200": {
      description: "Document",
      content: { "text/plain": { schema: { type: "string" } } },
    },
  };
  return {
    openapi: "3.0.3",
    info: {
      title: `${SITE_NAME} public documents`,
      version: "1.0.0",
      description:
        "Read-only documents for Matt Sichterman's personal site. There is no authenticated API.",
    },
    servers: [{ url: SITE_URL }],
    paths: {
      "/sitemap.xml": {
        get: { summary: "XML sitemap", responses: { "200": { description: "Sitemap" } } },
      },
      "/llms.txt": { get: { summary: "LLM site index", responses: textDoc } },
      "/llms-full.txt": {
        get: { summary: "Full site markdown", responses: textDoc },
      },
      "/rss/feed.xml": {
        get: { summary: "RSS feed", responses: { "200": { description: "RSS" } } },
      },
      "/rss/feed.json": {
        get: { summary: "JSON Feed", responses: { "200": { description: "JSON Feed" } } },
      },
      "/api/search": {
        get: {
          summary: "Search notes",
          parameters: [
            {
              name: "query",
              in: "query",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: { "200": { description: "Matching notes" } },
        },
      },
      "/api/health": {
        get: {
          summary: "Health check",
          responses: { "200": { description: "OK" } },
        },
      },
    },
  };
}

export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: `${SITE_URL}/`,
        "service-desc": [
          {
            href: `${SITE_URL}/openapi.json`,
            type: "application/openapi+json",
          },
        ],
        "service-doc": [
          {
            href: `${SITE_URL}/llms.txt`,
            type: "text/plain",
          },
        ],
        status: [{ href: `${SITE_URL}/api/health` }],
      },
    ],
  };
}

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}
