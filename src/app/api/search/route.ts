import { createFromSource } from "fumadocs-core/search/server";
import { notesSource } from "@/lib/source";

export const dynamic = "force-dynamic";

export const { GET } = createFromSource(notesSource, {
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData ?? {
        headings: [],
        contents: [
          {
            heading: undefined,
            content: page.data.description ?? "",
          },
        ],
      },
    };
  },
});
