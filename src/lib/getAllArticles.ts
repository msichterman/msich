import glob from "fast-glob";
import * as path from "path";
import { ReactNode } from "react";

export type ArticleProps = {
  meta: {
    date: string;
    title: string;
    description: string;
  } & object;
  default: ReactNode;
};

async function importArticle(articleFilename: string) {
  const { meta, default: component }: ArticleProps = await import(
    `../pages/articles/${articleFilename}`
  );
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ""),
    ...meta,
    component,
  };
}

export async function getAllArticles() {
  const articleFilenames = await glob(["*.mdx", "*/index.mdx"], {
    cwd: path.join(process.cwd(), "src/pages/articles"),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort(
    (a, z) => new Date(z.date).valueOf() - new Date(a.date).valueOf()
  );
}
