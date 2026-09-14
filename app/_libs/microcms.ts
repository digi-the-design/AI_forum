// ⬛︎ microCMS SDKを使用して、APIからデータを取得するcreateClient関数を定義
import { createClient } from "microcms-js-sdk";
// microcms-js-sdkからインポートした型定義
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

// ⬛︎ TypeScript型定義
// News型定義
export type News = {
  id: string;
  title: string;
  headline: string;
  category: Category;
  publishedAt: string;
  createdAt: string;
  description?: string; // 追加: 説明文
  thumbnail?: MicroCMSImage; // 追加: 画像
  categories?: Category[];
  members?: {
    name: string;
    image?: { url: string };
    slug: string;
  }; // 追加: 投稿者情報
  content: string;
  image?: { url: string; name: string; slug: string };
  slug: string; // 追加: 投稿者情報
  name: string;
  indicator?: string;
} & MicroCMSListContent;
//　以下NewList/index.tsxで使用している引数名articleと各キープロパティ
// article.id
// article.title
// article.category
// article.publishedAt
// article.createdAt

// Member型定義
export type Member = {
  id: string;
  title: string;
  category: Category;
  publishedAt: string;
  createdAt: string;
  description?: string; // 追加: 説明文
  thumbnail?: MicroCMSImage; // 追加: 画像
  categories?: Category[];
  name: string;
  position: string;
  profile: string;
  members?: {
    name: string;
    image?: { url: string };
    slug: string;
  }; // 追加: 投稿者情報
  slug: string; // 追加: 投稿者情報
  content: string;
  image?: { url: string; name: string; slug: string };
} & MicroCMSListContent;

// Category型定義
export type Category = {
  name: string;
  id: string;
  slug: string;
} & MicroCMSListContent;

// ⬛︎ .env.local APIドメイン&キー/エラーチェック
// .env.localファイルから環境変数DOMAINを取得し、必要な環境変数が存在しない場合はエラーをスロー
if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE) {
  throw new Error("NEXT_PUBLIC_MICROCMS_SERVICE is required");
}
// createClient関数を使用して、microCMSクライアント（ドメイン/APIキー）を作成し格納
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

// ⬛︎ APIからニュース記事リストを取得する関数を定義
export const getNewsList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
    // customRequestInit: { cache: "no-store",}, キャッシュを使用しないで最新の更新データを使用する
  });
  return listData;
};
// ⬛︎ APIからブログ記事の「詳細1件」を取得する関数
export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "news", //microcmsからどのデータを取るか
    contentId, //取得する記事のID
    queries, //APIのクエリパラメータを追加取得（fields, draftKey...）
  });
  return detailData;
};

// ⬛︎ APIからブログ記事リストを取得する関数を定義
export const getBlogList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<News>({
    endpoint: "blog",
    queries,
    // customRequestInit: { cache: "no-store",}, キャッシュを使用しないで最新の更新データを使用する
  });
  return listData;
};
// ⬛︎ APIからブログ記事の「詳細1件」を取得する関数
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  const detailData = await client.getListDetail<News>({
    endpoint: "blog", //microcmsからどのデータを取るか
    contentId, //取得する記事のID
    queries, //APIのクエリパラメータを追加取得（fields, draftKey...）
  });
  return detailData;
};

// ⬛︎ APIからカテゴリのリストを取得する関数を定義
export const getCategoryList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList<Category>({
    endpoint: "categories",
    queries,
  });
  return listData;
};
// ⬛︎ カテゴリ1件取得
export const getCategoryDetail = async (contentId: string) => {
  return await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
  });
};
// ⬛︎ 投稿者のリストを取得する関数を定義
export const getMembersList = async (queries?: MicroCMSQueries) => {
  const listData = await client.getList({
    endpoint: "members",
    queries,
  });
  return listData;
};
// ⬛︎ 投稿者の詳細を取得する関数を定義
export const getMembersDetail = async (contentId: string) => {
  const detailData = await client.get({
    endpoint: "members",
    contentId,
  });
  return detailData;
};
// ⬛︎ 投稿者が投稿したブログ記事のリストを取得する関数を定義
export const getBlogsByMember = async (memberId: string) => {
  const data = await client.getList({
    endpoint: "blog",
    queries: {
      filters: `members[equals]${memberId}`,
      limit: 100,
    },
  });
  return data.contents;
};
