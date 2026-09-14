import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogList } from "@/app/_libs/microcms";
import Pagination from "@/app/_components/Pagination";
import BlogCard from "@/app/_components/BlogCard/";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2/";
import styles from "../../page.module.css";
import { BLOG_LIST } from "@/app/_constans";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ current: string }>;
};

export const metadata: Metadata = {
  title: "BLOG & REPORT | 注目の論文記事一覧",
  description: "AI関連の論文記事を一覧で読むことができます。",
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const current = parseInt(resolvedParams.current, 10);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const { contents: news, totalCount } = await getBlogList({
    limit: BLOG_LIST, //13件ずつ取得
    offset: BLOG_LIST * (current - 1), // 13件 ×（ページ番号 - 1）＝ スキップする件数　0,10,20...
  });
  //最大一覧ページ数
  const limit = BLOG_LIST;
  const pagerList = Math.ceil(totalCount / limit);

  if (current === 1) {
    redirect("/blog");
  }
  if (news.length === 0) {
    notFound();
  }

  return (
    <div className={styles.text_content}>
      <div
        className={`${styles.thumbnail_card} ${styles.thumbnail_card_blogtop}`}
      >
        <BlogPageTitleH2
          text="注目の論文記事"
          totalCount={totalCount}
          displayedCount={news.length}
        />
        <div className={styles.container}>
          <ul
            className={`${styles.thumbnail_list} ${styles.thumbnail_list_blogtop}`}
          >
            {news.map((news) => (
              <BlogCard key={news.id} data={news} />
            ))}
          </ul>{" "}
         
        </div>{" "}
        {pagerList > 1 && (
          <Pagination
            totalCount={totalCount}
            basePath="/blog/p"
            current={current}
            pagerList={pagerList}
          />
        )}
      </div>
    </div>
  );
}
