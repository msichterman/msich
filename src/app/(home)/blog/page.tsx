import Link from "next/link";
import { blogSource } from "@/lib/source";
import type { Metadata } from "next";

type BlogPostData = {
  title: string;
  description?: string;
  date: string;
  author: string;
  tags: string[];
};

export const metadata: Metadata = {
  title: "Blog - Matt Sichterman",
  description:
    "Long-form thoughts on software engineering, entrepreneurship, and more.",
  openGraph: {
    images: [
      {
        url: "https://msich.dev/api/og?preface=Matt+Sichterman+%E2%80%A3+Blog",
      },
    ],
  },
};

export default function BlogIndex() {
  const posts = blogSource
    .getPages()
    .map((page) => ({
      ...page,
      data: page.data as typeof page.data & BlogPostData,
    }))
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8 sm:py-32">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
        Writing on software development, entrepreneurship, and cool
        technologies.
      </h1>
      <p className="mt-6 text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
        All of my long-form thoughts on programming, leadership,
        entrepreneurship, and more, collected in chronological order.
      </p>

      <div className="mt-16 md:border-l md:border-neutral-200 md:pl-6 md:dark:border-neutral-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {posts.map((post) => (
            <article key={post.url} className="md:grid md:grid-cols-4 md:items-baseline">
              <time
                dateTime={post.data.date}
                className="mt-1 hidden text-xs text-neutral-400 dark:text-neutral-500 md:block"
              >
                {new Date(post.data.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className="md:col-span-3">
                <h2 className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-base">
                  <Link
                    href={post.url}
                    className="hover:text-sky-500 dark:hover:text-sky-400"
                  >
                    {post.data.title}
                  </Link>
                </h2>
                <time
                  dateTime={post.data.date}
                  className="relative order-first mb-3 flex items-center pl-3.5 text-xs text-neutral-400 dark:text-neutral-500 md:hidden"
                >
                  <span
                    className="absolute inset-y-0 left-0 flex items-center"
                    aria-hidden="true"
                  >
                    <span className="h-4 w-0.5 rounded-full bg-neutral-200 dark:bg-neutral-500" />
                  </span>
                  {new Date(post.data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.data.description && (
                  <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {post.data.description}
                  </p>
                )}
                {post.data.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.data.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xxs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  href={post.url}
                  className="mt-4 flex items-center text-xs font-medium text-sky-500"
                >
                  Read article
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="ml-1 h-4 w-4 stroke-current"
                  >
                    <path
                      d="M6.75 5.75 9.25 8l-2.5 2.25"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
