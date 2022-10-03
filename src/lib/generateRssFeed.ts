import ReactDOMServer from "react-dom/server";
import { Feed } from "feed";
import { mkdir, writeFile } from "fs/promises";

import { getAllArticles } from "./getAllArticles";
import { createElement } from "react";

export async function generateRssFeed() {
  const articles = await getAllArticles();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL as string;
  const author = {
    name: "Matt Sichterman",
    email: "msichterman1@gmail.com",
  };

  const feed = new Feed({
    title: author.name,
    description: "Your blog description",
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  });

  for (const article of articles) {
    const { slug, component, title, description, date } = article;
    const url = `${siteUrl}/articles/${slug}`;
    const Component = createElement(typeof component, { isRssFeed: true });
    const html = ReactDOMServer.renderToStaticMarkup(Component);

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(date),
    });
  }

  await mkdir("./public/rss", { recursive: true });
  await Promise.all([
    writeFile("./public/rss/feed.xml", feed.rss2(), "utf8"),
    writeFile("./public/rss/feed.json", feed.json1(), "utf8"),
  ]);
}
