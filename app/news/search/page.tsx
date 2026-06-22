import { getNewsList } from "@/app/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import NewsList from "@/app/_components/NewsList";
import SearchField from "@/app/_components/SearchField";
type Props = {
  // NEXT.JS16からの仕様変更 Promise<>で非同期処理を表現
  searchParams: Promise<{ q?: string }>;
};
export const dynamic = "force-dynamic";
export default async function Page({ searchParams }: Props) {
  // ⬛︎ NEXT,JS16対応
  // searchParamsはPromiseであるため、awaitを使用して解決し、paramsに代入
  const params = await searchParams;
  // 定数qに、paramsオブジェクトのqプロパティを代入
  const q = params.q;
  // ⬛︎ getNewsList関数に分割代入でcontentsプロパティをnews変数に代入して呼び出す
  const { contents: news } = await getNewsList({
    // limitプロパティにはNEWS_LIST_LIMIT定数、qプロパティにはq変数を設定
    limit: NEWS_LIST_LIMIT,
    q,
  });
  return (
    <>
      <SearchField />
      <NewsList news={news} />
    </>
  );
}
