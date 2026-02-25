import { blogSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import type { MDXContent } from "mdx/types";
import type { TOCItemType } from "fumadocs-core/toc";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  if (!page) return {};

  return {
    title: `${page.data.title} - Matt Sichterman`,
    description: page.data.description,
    openGraph: {
      images: [
        {
          url: `https://msich.dev/api/og?preface=${encodeURIComponent("Matt Sichterman \u2023 Blog")}&title=${encodeURIComponent(page.data.title ?? "")}`,
        },
      ],
    },
  };
}

export default async function BlogPost(props: Props) {
  const { slug } = await props.params;
  const page = blogSource.getPage([slug]);
  if (!page) notFound();

  // fumadocs-mdx collection entries include body/toc/custom fields but types from .source don't flow through
  const data = page.data as typeof page.data & {
    body: MDXContent;
    toc: TOCItemType[];
    date: string;
    author: string;
    tags: string[];
  };
  const MDXBody = data.body;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-8 sm:py-32">
      <article>
        <header className="flex flex-col">
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
            {data.title}
          </h1>
          <div className="order-first flex items-center gap-4 text-xs text-neutral-400 dark:text-neutral-500 sm:text-sm">
            <time dateTime={data.date}>
              <span className="mr-3 inline-block h-4 w-0.5 rounded-full bg-neutral-200 align-middle dark:bg-neutral-500" />
              {new Date(data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {data.author && (
              <span className="text-neutral-500 dark:text-neutral-400">
                {data.author}
              </span>
            )}
          </div>
          {data.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xxs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {data.toc.length > 0 && (
          <div className="mt-8">
            <InlineTOC items={data.toc} />
          </div>
        )}

        <div className="prose dark:prose-invert mt-8">
          <MDXBody components={defaultMdxComponents} />
        </div>
      </article>
    </div>
  );
}
