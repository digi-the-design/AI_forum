import { notFound, redirect } from "next/navigation";
import { getBlogList } from "@/app/_libs/microcms";
import Pagination from "@/app/_components/Pagination";
import BlogCard from "@/app/_components/BlogCard/";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2/";
import styles from "../../page.module.css";
import { BLOG_SEARCH_LIST } from "@/app/_constans";

type Props = {
  params: Promise<{ slug: string; current: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const current = parseInt(resolvedParams.current, 10);
  const q = decodeURIComponent(resolvedParams.slug);

  if (Number.isNaN(current) || current < 1) {
    notFound();
  }

  const limit = BLOG_SEARCH_LIST;
  const offset = limit * (current - 1);
  const { contents, totalCount } = await getBlogList({
    q,
    limit,
    offset,
  });

  const pagerList = Math.ceil(totalCount / limit);

  if (current === 1) {
    redirect(`/blog/search/${encodeURIComponent(q)}`);
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
          text={`「${q}」の検索結果`}
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
        </div>
        {pagerList > 1 && (
          <Pagination
            totalCount={totalCount}
            current={current}
            basePath={`/blog/search/${encodeURIComponent(q)}/p`}
            pagerList={pagerList}
          />
        )}
      </div>
    </div>
  );
}
