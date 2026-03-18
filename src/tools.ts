import Parser from "rss-parser";

const parser = new Parser();

export async function getTechNews() {
    const feeds = [
        // News sites
        "https://techcrunch.com/feed/",
        "https://www.theverge.com/rss/index.xml",
        "https://www.wired.com/feed/rss",
      
        // Reddit (🔥 new)
        "https://www.reddit.com/r/technology/.rss",
        "https://www.reddit.com/r/artificial/.rss",
        "https://www.reddit.com/r/startups/.rss",
      ];

  let allArticles: any[] = [];

  for (const url of feeds) {
    const feed = await parser.parseURL(url);

    const items = feed.items.slice(0, 5).map((item) => ({
      title: item.title,
      description: item.contentSnippet,
      url: item.link,
    }));

    allArticles.push(...items);
  }

  return allArticles;
}