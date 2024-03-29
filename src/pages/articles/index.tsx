import Head from "next/head";
import { allArticles, Article } from "contentlayer/generated";
import { Card } from "@/components/Card";
import { SimpleLayout } from "@/layouts/SimpleLayout";

import { formatDate } from "@/lib/formatDate";

function Article({ article }: { article: Article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}&nbsp;&middot;
          <span className="inline-block text-tiny font-semibold uppercase text-sky-500/75">
            &nbsp;{article.readingTime.text}
          </span>
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
        <br />
        <span className="text-tiny font-bold uppercase text-sky-500/75">
          {article.readingTime.text}
        </span>
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesIndex() {
  return (
    <>
      <Head>
        <title>Articles - Matt Sichterman</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, entrepreneurship, and more, collected in chronological order."
        />
        <meta
          property="og:image"
          content={`https://msich.dev/api/og?preface=${"Matt Sichterman ‣ Articles"}`}
        />
      </Head>
      <SimpleLayout
        title="Writing on software development, entrepreneurship, and cool technologies."
        intro="All of my long-form thoughts on programming, leadership, entrepreneurship, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-neutral-200 md:pl-6 md:dark:border-neutral-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {allArticles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
