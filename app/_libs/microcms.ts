import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Category = {
  id: string;
  name: string;
  slug?: string;
} & MicroCMSListContent;

export type Member = {
  id: string;
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
  slug?: string;
} & MicroCMSListContent;

export type News = {
  id: string;
  title: string;
  headline?: string;
  description?: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category?: Category;
  categories?: Category[];
  members?: Member;
  publishedAt: string;
  createdAt: string;
  slug?: string;
  name?: string;
  indicator?: string;
} & MicroCMSListContent;

const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY;

if (!serviceDomain) {
  throw new Error("NEXT_PUBLIC_MICROCMS_SERVICE is required");
}
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

export const getNewsList = async (queries?: MicroCMSQueries) => {
  return await client.getList<News>({
    endpoint: "news",
    queries: {
      fields: "id,title,headline,thumbnail,category,categories,publishedAt,createdAt,description,members",
      ...queries,
    },
  });
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries: {
      fields: "id,title,headline,content,thumbnail,category,categories,publishedAt,createdAt,description,members",
      ...queries,
    },
  });
};

export const getBlogList = async (queries?: MicroCMSQueries) => {
  return await client.getList<News>({
    endpoint: "blog",
    queries: {
      fields: "id,title,headline,thumbnail,category,categories,publishedAt,createdAt,description,members",
      ...queries,
    },
  });
};

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<News>({
    endpoint: "blog",
    contentId,
    queries: {
      fields: "id,title,headline,content,thumbnail,category,categories,publishedAt,createdAt,description,members",
      ...queries,
    },
  });
};

export const getCategoryList = async (queries?: MicroCMSQueries) => {
  return await client.getList<Category>({
    endpoint: "categories",
    queries,
  });
};

export const getCategoryDetail = async (contentId: string) => {
  return await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
  });
};

export const getMembersList = async (queries?: MicroCMSQueries) => {
  return await client.getList<Member>({
    endpoint: "members",
    queries,
  });
};

export const getMemberDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
) => {
  return await client.getListDetail<Member>({
    endpoint: "members",
    contentId,
    queries,
  });
};

export const getAllNewsList = async () => {
  return (await getNewsList({ limit: 100 })).contents;
};

export const getAllCategoryList = async () => {
  return (await getCategoryList({ limit: 100 })).contents;
};

export const getMembersDetail = async (slug: string) => {
  const list = await getMembersList({ filters: `slug[equals]${slug}`, limit: 1 });
  return list.contents[0] ?? null;
};

export const getBlogsByMember = async (slug: string) => {
  const list = await getBlogList({ filters: `members[equals]${slug}`, limit: 100 });
  return list.contents;
};
