# Maintaining msich.dev

Personal site for Matt Sichterman. Future agents should change content here and leave the framework alone unless a task says otherwise.

## Stack

- [vinext](https://github.com/cloudflare/vinext) **1.4.0** (Vite-based Next.js App Router) on Vite 8
- React 19.3, TypeScript, Tailwind CSS 4
- tRPC + Prisma (MySQL) for the contact form and newsletter
- Fumadocs MDX for the blog and notes
- Deployed on **Vercel**, not Cloudflare Workers

`package.json` is the source of truth for versions. `vinext` is pinned by the lockfile.

## Run and build

Node 22 (`engines` and `.nvmrc`).

```sh
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start    # production server from dist/
npm run lint
```

`pnpm-lock.yaml` is also committed. Use one package manager per install; do not mix lockfile updates.

Set `SKIP_ENV_VALIDATION=true` to boot without real secrets. Pages render without the database. The contact form and newsletter need the real keys.

## Environment variables

Names only. Values live in the Vercel project, not in git.

| Name | Required | Used for |
|---|---|---|
| `DATABASE_URL` | Yes | MySQL / Prisma |
| `NODE_ENV` | Yes | `development`, `test`, or `production` |
| `MAILERLITE_API_KEY` | Yes | Newsletter subscribe + subscriber count |
| `GMAIL_APP_PASSWORD` | No | Contact form email (nodemailer) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL, RSS links, OG |
| `SKIP_ENV_VALIDATION` | No | Bypass the Zod env check |

Schemas: `src/env/schema.mjs`, `src/env/server.mjs`, `src/env/client.mjs`.

## Deploy

Pushing or merging to `main` deploys production.

- Vercel project: `matt-sichtermans-projects/msich`
- `vercel.json` sets `buildCommand` to `vinext build` and `outputDirectory` to `dist/client`
- Static files in `dist/client` are served by Vercel. Every other path is rewritten to `api/handler.mjs`, which calls `dist/server/index.js`
- `https://msich.dev` 308-redirects to `https://www.msich.dev`
- A healthy page is HTTP 200 HTML that does **not** contain `__next_error__` or “This page couldn’t load”. An RSC request (`?_rsc`) should also be 200

Do not add a Cloudflare Workers deploy unless asked. vinext can target Workers, but this repo’s live path is the Vercel handler above.

## Where content lives

| What | Where |
|---|---|
| Home copy | `src/app/(home)/page.tsx` |
| About | `src/app/(home)/about/page.tsx` |
| Projects | `src/data/projects.ts` and logos in `src/images/logos/` |
| Uses | `src/app/(home)/uses/page.tsx` |
| Contact form | `src/app/(home)/contact/` |
| Resume block | `src/components/Resume.tsx` |
| Blog posts | `content/blog/*.mdx` |
| Notes | `content/notes/*.mdx` and the order in `content/notes/meta.json` |
| Homepage photos | `src/images/photos/` |
| Shared header, footer, newsletter | `src/components/` |
| Global CSS, notes theme | `src/styles/globals.css` |

Blog and notes frontmatter is loaded by Fumadocs (`source.config.ts`, `src/lib/source.ts`). A new note must be listed in `content/notes/meta.json` or it will not show in the sidebar.

## Common edits

- **Change a sentence on the home or about page.** Edit the matching `page.tsx`. Meta `description` is separate from the visible paragraph; update both when the fact changes.
- **Add a project.** Append an object in `src/data/projects.ts`. Put the logo in `src/images/logos/` and import it. Keep descriptions to a few sentences. Set `link.href` to make the whole card open that site in a new tab. Leave `link` off when there is no public URL. The home list is `src/components/ProjectList.tsx`; `/projects` uses the same data.
- **Add a blog post.** Add `content/blog/your-slug.mdx` with `title`, `description`, `author`, `date`, and `tags`. The URL is `/blog/your-slug`.
- **Add a note.** Add `content/notes/your-slug.mdx` and append `"your-slug"` to `pages` in `content/notes/meta.json`.
- **Swap a homepage photo.** Replace the file in `src/images/photos/` or change the import list in `src/app/(home)/page.tsx`. Keep photos around 1280px wide. The first image in that list is the LCP image (`priority`).
- **Theme.** Light/dark is the `dark` class on `<html>`, set by the inline script in `src/app/layout.tsx` and the header toggle. Do not remove that script; it prevents a flash of the wrong theme.

After a visual change, check the page in a browser at desktop and mobile widths. Confirm the HTML is HTTP 200 and does not include `__next_error__`.
