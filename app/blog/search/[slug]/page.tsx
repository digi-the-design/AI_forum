import type { Metadata } from "next";
import { getBlogList } from "@/app/_libs/microcms";
import BlogCard from "@/app/_components/BlogCard";
import Pagination from "@/app/_components/Pagination";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2";
import styles from "./page.module.css";
import { BLOG_SEARCH_LIST } from "@/app/_constans";

type Props = {
  // params,searchParamsはnext.jsの予約語オブジェクト引数（変更不可）
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const q = decodeURIComponent(resolvedParams.slug);

  return {
    title: `BLOG & REPORT | 「${q}」の検索結果一覧`,
    description: `BLOG & REPORT | 「${q}」の検索結果一覧`,
    alternates: {
      canonical: `/blog/search/${encodeURIComponent(q)}`,
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  // 検索クエリ"q"をdecodeURIComponent関数を使用して、URLエンコードされた文字列を元の文字列に戻す。
  const q = decodeURIComponent(resolvedParams.slug);
  // パラメータ"?page=1"などを取得し正しい数値に変換。数値がnullの場合は1を使用する（フォールバック）。
  const current = Number(resolvedSearchParams.page) || 1;
  // ブログ表示件数設定
  const limit = BLOG_SEARCH_LIST;

  // microCMSのAPIから検索結果を取得するために、getBlogList関数を呼び出す。
  // この関数は、検索クエリ（q）と取得する件数（limit）を引数として受け取り、検索結果のニュース記事と総件数を返す。
  // 分割代入を使用して、返されたオブジェクトからcontents:news（ニュース記事の配列）とtotalCount（総件数）を取得する。
  const { contents: news, totalCount } = await getBlogList({
    q,
    limit,
  });
  // ブログ記事総件数 / 表示制限数 端数をMath.ceilで切り上げ計算（2.5 → 3）
  const pagerList = Math.ceil(totalCount / limit);

  return (
    <div className={styles.text_content}>
      <div
        className={`${styles.thumbnail_card} ${styles.thumbnail_card_blogtop}`}
      >
        <BlogPageTitleH2
          text={`「${q}」の検索結果一覧`}
          totalCount={totalCount}
          displayedCount={news.length}
        />

        {news.length === 0 ? (
          <p className={styles.emptyState}>
            該当する記事は見つかりませんでした。
          </p>
        ) : (
          <div className={styles.container}>
            <ul
              className={`${styles.thumbnail_list} ${styles.thumbnail_list_blogtop}`}
            >
              {news.map((newsItem) => (
                <BlogCard key={newsItem.id} data={newsItem} />
              ))}
            </ul>
          </div>
        )}
        {/* ページが1ページ以上生成されたなら実行 */}
        {pagerList > 1 && (
          <Pagination
            /* ブログ記事総件数 */
            totalCount={totalCount}
            /* 現在のページ番号 */
            current={current}
            /* 次の遷移ページurl生成 */
            basePath={`/blog/search/${encodeURIComponent(q)}/p`}
            /* 最大ページ数 */
            pagerList={pagerList}
          />
        )}
      </div>
    </div>
  );
}
