import { getNewsList } from "../_libs/microcms";
import NewsList from "../_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/app/_components/Pagination";
import SearchField from "../_components/SearchField";

// ⬛︎ ページを動的：SSR（Server Side Rendering）に変更してmicroCMS即時反映（キャッシュなし）
// export const revalidate = 0;

// ⬛︎ ページを動的：ISR（Incremental Static Regeneration）に変更してmicroCMS反映遅延60秒（キャッシュあり）
// export const revalidate = 60;は見た目はSTATIC（静的）だが、実際はSSR（動的）でmicroCMSのデータを取得するため、キャッシュが60秒間有効になる。これにより、ページの表示速度を向上させつつ、最新のデータを取得できるようになる。
// export const revalidate = 60;

// app/page.tsx の一番上、または適切な場所に追記
export default async function Page() {
  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
  });
  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagination totalCount={totalCount} />
    </>
  );
}
