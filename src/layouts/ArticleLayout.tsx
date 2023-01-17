import Head from "next/head";
import { useRouter } from "next/router";

import { Container } from "@/components/Container";
import { formatDate } from "@/lib/formatDate";
import { Prose } from "@/components/Prose";
import { ReactNode } from "react";
import { Article } from "contentlayer/generated";
import { ArrowLeft } from "lucide-react";

export function ArticleLayout({
  article,
  previousPathname,
  children,
}: {
  article: Article;
  previousPathname: string | undefined;
  children: ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{`${article.title} - Matt Sichterman`}</title>
        <meta name="description" content={article.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to articles"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 transition dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0 dark:ring-white/10 dark:hover:border-gray-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeft className="h-4 w-4 stroke-gray-500 transition group-hover:stroke-gray-700 dark:stroke-gray-500 dark:group-hover:stroke-gray-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-5xl">
                  {article.title}
                </h1>
                <time
                  dateTime={article.date}
                  className="order-first flex items-center text-base text-gray-400 dark:text-gray-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500" />
                  <span className="ml-3">{formatDate(article.date)}</span>
                </time>
              </header>
              <Prose className="mt-8">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </>
  );
}
