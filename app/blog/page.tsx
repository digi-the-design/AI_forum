import type { Metadata } from "next";
import { getBlogList } from "@/app/_libs/microcms";
import styles from "./page.module.css";
import BlogCard from "@/app/_components/BlogCard/";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2/";
import Pagination from "@/app/_components/Pagination";
import { BLOG_LIST } from "@/app/_constans";

export const metadata: Metadata = {
  title: "BLOG & REPORT | 論文記事一覧",
  description: "注目の論文記事を一覧で確認できるページです。",
};

export default async function Page({ params }) {
  const current = Number(params.current) || 1; // currentがundefinedの場合は1をデフォルト値として使用
  const { contents, totalCount } = await getBlogList({
    limit: BLOG_LIST, //10件ずつ取得
    offset: BLOG_LIST * (current - 1), // 10件 ×（ページ番号 - 1）＝ スキップする件数　0,10,20...
  });

  //最大一覧ページ数
  const limit = BLOG_LIST;
  const pagerList = Math.ceil(totalCount / limit);

  return (
    <div className={styles.text_content}>
      <div
        className={`${styles.thumbnail_card} ${styles.thumbnail_card_blogtop}`}
      >
        <BlogPageTitleH2
          text="注目の論文記事"
          totalCount={totalCount}
          displayedCount={contents.length}
        />
        <div className={styles.container}>
          <ul
            className={`${styles.thumbnail_list} ${styles.thumbnail_list_blogtop}`}
          >
            {contents.map((news) => (
              <BlogCard key={news.id} data={news} />
            ))}
          </ul>
        </div>
        <Pagination
          totalCount={totalCount}
          basePath="/blog/p"
          current={current}
          pagerList={pagerList}
        />
      </div>
    </div>
  );
}
