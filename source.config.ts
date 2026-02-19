import {
  defineDocs,
  defineCollections,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod4";

export const docs = defineDocs({
  dir: "content/notes",
});

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    author: z.string().default("Matt Sichterman"),
    date: z.string().date().or(z.date()),
    tags: z.array(z.string()).default([]),
  }),
});

export default defineConfig();
