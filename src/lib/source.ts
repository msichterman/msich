import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { docs, blogPosts } from "../../.source/server";

export const notesSource = loader({
  baseUrl: "/notes",
  source: docs.toFumadocsSource(),
});

export const blogSource = loader({
  baseUrl: "/blog",
  source: toFumadocsSource(blogPosts, []),
});
