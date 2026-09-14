import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMembersDetail,
  getBlogsByMember,
} from "@/app/_libs/microcms";
import BlogerDetail from "@/app/_components/BlogerDetail";
import BlogCard from "@/app/_components/BlogCard/";
import styles from "./page.module.css";
import ButtonLink from "@/app/_components/ButtonLink";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved.slug;
  const member = await getMembersDetail(slug).catch(() => null);

  return {
    title: `BLOG & REPORT | ${member?.name ?? slug}`,
    description: `BLOG & REPORT | AI Forum の投稿者 ${slug} の詳細ページです。`,
  };
}

export default async function Page({ params }: Props) {
  // Next.js 16 では params が Promise の場合があるため await する
  const resolved = await params;
  const slug = resolved.slug;

  // 投稿者詳細
  const member = await getMembersDetail(slug).catch(() => notFound());

  // 投稿者が書いたブログ記事一覧
  const blogs = await getBlogsByMember(slug);

  return (
    <>
      <div className={styles.content_block}>
        <BlogerDetail data={member} />
        <div className={styles.thumbnail_card_blogtop}>
          <div className={styles.thumbnail_card}>
            <ul
              className={`${styles.thumbnail_list} ${styles.thumbnail_list_blogtop}`}
            >
              {blogs.map((blog) => (
                <BlogCard key={blog.id} data={blog} />
              ))}
            </ul>
          </div>
        </div>{" "}
        <div className={styles.button_block}>
          <ButtonLink href="/blog/members" text="投稿者一覧へ" />
        </div>
      </div>
    </>
  );
}
