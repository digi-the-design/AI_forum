import type { MetadataRoute } from "next";
import {
  getBlogList,
  getNewsList,
  getCategoryList,
  getMembersList,
} from "@/app/_libs/microcms";

// Sitemap用URL生成
const buildUrl = (path = "") =>
  `https://ai-forum-ieukkpdns-rikiyas-projects.vercel.app/${path ?? ""}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogResponse, newsResponse, categoryResponse, memberResponse] =
    await Promise.all([
      getBlogList(),
      getNewsList(),
      getCategoryList(),
      getMembersList(),
    ]);

  const blogUrls: MetadataRoute.Sitemap = blogResponse.contents.map(
    (content) => ({
      url: buildUrl(`/blog/${content.id}`),
      lastModified: content.revisedAt,
    }),
  );

  // MetadataRoute.Sitemapは型宣言+Sitemap用の配列形式に変換
  const newsUrls: MetadataRoute.Sitemap = newsResponse.contents.map(
    (content) => ({
      // ブログURL
      url: buildUrl(`/news/${content.id}`),
      // 更新日付
      lastModified: content.revisedAt,
    }),
  );

  // MetadataRoute.Sitemapは型宣言+Sitemap用の配列形式に変換
  const categoryUrls: MetadataRoute.Sitemap = categoryResponse.contents.map(
    (content) => ({
      // ブログURL
      url: buildUrl(`/news/category/${content.id}`),
      // 更新日付
      lastModified: content.revisedAt,
    }),
  );

  const memberUrls: MetadataRoute.Sitemap = memberResponse.contents.map(
    (content) => ({
      url: buildUrl(`/blog/members/${content.id}`),
      lastModified: content.revisedAt,
    }),
  );
  // JavaScriptのインスタンスを生成（コンストラクタ）now変数はDateオブジェクト
  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl("/influence"),
      lastModified: now,
    },
    {
      url: buildUrl("/future_society"),
      lastModified: now,
    },
    {
      url: buildUrl("/ethic"),
      lastModified: now,
    },
    {
      url: buildUrl("/news"),
      lastModified: now,
    },
    {
      url: buildUrl("/blog"),
      lastModified: now,
    },
    {
      url: buildUrl("/blog/members"),
      lastModified: now,
    },
    {
      url: buildUrl("/about"),
      lastModified: now,
    },
    {
      url: buildUrl("/perspective"),
      lastModified: now,
    },
    {
      url: buildUrl("/access"),
      lastModified: now,
    },
    {
      url: buildUrl("/contact"),
      lastModified: now,
    },
    ...blogUrls,
    ...newsUrls,
    ...categoryUrls,
    ...memberUrls,
  ];
}
