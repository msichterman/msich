import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
// @ts-expect-error
import rehypePrism from "@mapbox/rehype-prism";

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: "articles/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    author: { type: "string", required: true },
    date: { type: "string", required: true },
    cover: { type: "string", required: false },
  },
  computedFields: {
    readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, ""),
    },
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));
export default makeSource({
  contentDirPath: "contentlayer",
  documentTypes: [Article],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
});
