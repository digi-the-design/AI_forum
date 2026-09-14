import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryDetail, getBlogList } from "@/app/_libs/microcms";
import Pagination from "@/app/_components/Pagination";
import BlogCard from "@/app/_components/BlogCard/";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2/";
import styles from "../../page.module.css";
import { BLOG_CATEGORY_LIST } from "@/app/_constans";
import { redirect } from "next/navigation";
type Props = {
  params: Promise<{ slug: string; current: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = await getCategoryDetail(resolvedParams.slug).catch(notFound);

  return {
    title: `BLOG & REPORT |「 ${category.name}」カテゴリ記事一覧`,
    description: `BLOG & REPORT |「 ${category.name}」カテゴリ記事一覧`,
  };
}

export default async function Page({ params }: Props) {
  const slug = await params;
  const resolvedParams = await params;
  const current = parseInt(resolvedParams.current, 10);
  const category = await getCategoryDetail(resolvedParams.slug).catch(notFound);
  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const { contents, totalCount } = await getBlogList({
    filters: `categories[contains]${category.slug}`,
    limit: BLOG_CATEGORY_LIST, //12件ずつ取得
    offset: BLOG_CATEGORY_LIST * (current - 1), // 12件 ×（ページ番号 - 1）＝ スキップする件数　0,12,24...
  });
  //最大一覧ページ数
  const limit = BLOG_CATEGORY_LIST;
  const pagerList = Math.ceil(totalCount / limit);

  // ★ 1ページ目は /blog/category/[slug] に統一
  if (current === 1) {
    redirect(`/blog/category/${slug}`);
  }
  if (contents.length === 0) {
    notFound();
  }

  return (
    <div className={styles.text_content}>
      <div
        className={`${styles.thumbnail_card} ${styles.thumbnail_card_blogtop}`}
      >
        <BlogPageTitleH2
          text={`「${category.name}」カテゴリー記事一覧`}
          totalCount={totalCount}
          displayedCount={contents.length}
        />
        <div className={styles.container}>
          <ul
            className={`${styles.thumbnail_list} ${styles.thumbnail_list_blogtop}`}
          >
            {contents.map((content) => (
              <BlogCard key={content.id} data={content} />
            ))}
          </ul>
        </div>{" "}
        <Pagination
          totalCount={totalCount}
          current={current}
          basePath={`/blog/category/${category.slug}/p`}
          categorySlug={category.slug}
          pagerList={pagerList}
        />
      </div>
    </div>
  );
}
