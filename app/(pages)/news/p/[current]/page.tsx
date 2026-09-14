import { getNewsList } from "@/app/_libs/microcms";
import styles from "../../page.module.css";
import NewsListAll from "@/app/_components/NewsListAll/";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2/";
import Pagination from "@/app/_components/Pagination";
import { NEWS_LIST } from "@/app/_constans";
import PageContents from "@/app/_components/PageContents";
import { redirect } from "next/navigation";
type Props = {
  params: Promise<{ current: string }>;
};
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const current = parseInt(resolvedParams.current, 10);

  const { contents, totalCount } = await getNewsList({
    limit: NEWS_LIST, //13件ずつ取得
    offset: NEWS_LIST * (current - 1), // 13件 ×（ページ番号 - 1）＝ スキップする件数　0,10,20...
  });
  //最大一覧ページ数
  const limit = NEWS_LIST;
  const pagerList = Math.ceil(totalCount / limit);

  if (current === 1) {
    redirect("/news");
  }
  return (
    <>
      <PageContents>
        <BlogPageTitleH2
          text="新着ニュース記事一覧"
          totalCount={totalCount}
          displayedCount={contents.length}
        />
        <div className={styles.container}>
          <ul className={styles.thumbnail_list_newstop}>
            {contents.map((news) => (
              <NewsListAll key={news.id} data={news} />
            ))}
          </ul>
        </div>
        {pagerList > 1 && (
          <Pagination
            totalCount={totalCount}
            basePath="/news/p"
            current={current}
            pagerList={pagerList}
          />
        )}
      </PageContents>
    </>
  );
}
