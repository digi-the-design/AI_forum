import { MetadataRoute } from "next";
import { getAllCategoryList, getAllNewsList } from "./_libs/microcms";

// Sitemap用URL生成
const buildUrl = (path?: string) =>
  `http://nextjs-website-lhx7bm49n-rikiyas-projects.vercel.app/${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsContents = await getAllNewsList();
  const categoryContents = await getAllCategoryList();

  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    // ブログURL
    url: buildUrl(`/news/${content.id}`),
    // 更新日付
    lastModified: content.revisedAt,
  }));
  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map(
    (content) => ({
      // ブログURL
      url: buildUrl(`/news/category/${content.id}`),
      // 更新日付
      lastModified: content.revisedAt,
    }),
  );

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl("/members"),
      lastModified: now,
    },
    {
      url: buildUrl("/contact"),
      lastModified: now,
    },
    {
      url: buildUrl("/news"),
      lastModified: now,
    },
    ...newsUrls,
    ...categoryUrls,
  ];
}
