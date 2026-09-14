import type { Metadata } from "next";
import { getCategoryDetail, getBlogList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import BlogCard from "@/app/_components/BlogCard";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2";
import styles from "./page.module.css";
import Pagination from "@/app/_components/Pagination";
import { BLOG_CATEGORY_LIST } from "@/app/_constans";
type Props = {
  params: Promise<{ current: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryDetail(resolvedParams.slug).catch(() => null);

  return {
    title: category ? `BLOG & REPORT | ${category.name}の記事一覧` : "記事一覧",
    description: category
      ? `BLOG & REPORT | ${category.name}に関する記事一覧ページです。`
      : "記事一覧ページです。",
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  // 現在のページ番号取得（10進数 || 1はフォールバック用初期値）
  const current = parseInt(resolvedParams.current, 10) || 1;
  const category = await getCategoryDetail(resolvedParams.slug).catch(notFound);
  // カテゴリーに紐づく記事を取得
  const { contents: news, totalCount } = await getBlogList({
    // カテゴリーIDをクエリパラメータに追加
    filters: `categories[contains]${category.slug}`,
    limit: BLOG_CATEGORY_LIST, //12件ずつ取得
    offset: BLOG_CATEGORY_LIST * (current - 1), // 12件 ×（ページ番号 - 1）＝ スキップする件数　0,12,24...
  });
  //最大一覧ページ数
  const limit = BLOG_CATEGORY_LIST;
  const pagerList = Math.ceil(totalCount / limit);

  return (
    <div className={styles.text_content}>
      <div
        className={`${styles.thumbnail_card} ${styles.thumbnail_card_blogtop}`}
      >
        <BlogPageTitleH2
          text={`「${category.name}」記事一覧`}
          totalCount={totalCount}
          displayedCount={news.length}
        />
        <div className={styles.container}>
          <ul
            className={`${styles.thumbnail_list} ${styles.thumbnail_list_blogtop}`}
          >
            {/** 取得した記事をループして表示 */}
            {news.map((news) => (
              <BlogCard key={news.id} data={news} />
            ))}
          </ul>
        </div>
        {pagerList > 1 && (
          <Pagination
            totalCount={totalCount}
            current={current}
            basePath={`/blog/category/${category.slug}/p`}
            categorySlug={category.slug}
            pagerList={pagerList}
          />
        )}
      </div>
    </div>
  );
}
