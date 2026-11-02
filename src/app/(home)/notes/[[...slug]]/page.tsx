import { notesSource } from "@/lib/source";
import { notFound } from "next/navigation";
import { DocsPage, DocsBody } from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import type { MDXContent } from "mdx/types";
import type { TOCItemType } from "fumadocs-core/toc";
import { REVALIDATE_SECONDS } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_SECONDS;

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return notesSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const page = notesSource.getPage(slug);
  if (!page) return {};

  return pageMetadata({
    title: `${page.data.title} - Notes - Matt Sichterman`,
    description: page.data.description ?? "",
    path: page.url,
    ogPreface: "Matt Sichterman \u2023 Notes",
    ogTitle: page.data.title,
  });
}

export default async function NotesPage(props: Props) {
  const { slug } = await props.params;
  const page = notesSource.getPage(slug);
  if (!page) notFound();

  // fumadocs-mdx collection entries include body/toc but types from .source don't flow through
  const data = page.data as typeof page.data & { body: MDXContent; toc: TOCItemType[] };
  const MDXBody = data.body;

  return (
    <DocsPage toc={data.toc}>
      <DocsBody>
        <h1>{data.title}</h1>
        <MDXBody components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}
