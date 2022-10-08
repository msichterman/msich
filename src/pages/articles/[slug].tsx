import { useMDXComponent } from "next-contentlayer/hooks";
import { allArticles, Article } from "contentlayer/generated";
import { ArticleLayout } from "@/layouts/ArticleLayout";
import { GetStaticProps } from "next";
export default function ArticlePage({
  article,
  previousPathname,
}: {
  article: Article;
  previousPathname: string | undefined;
}) {
  const Component = useMDXComponent(article.body.code);
  return (
    <ArticleLayout article={article} previousPathname={previousPathname}>
      <Component />
    </ArticleLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: allArticles.map((article) => ({ params: { slug: article.slug } })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const article = allArticles.find((article) => article.slug === params?.slug);
  return { props: { article } };
};
