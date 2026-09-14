import { getCategoryDetail, getNewsList } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import NewsList from "@/app/_components/NewsList";
import Category from "@/app/_components/Category";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/app/_components/Pagination";

type Props = {
  // ⬛︎ Next.JS 15からのの仕様変更・修正
  // Promise；これから値が入る予定の箱（予約票）
  // Promise<{ id: string }> TypeScriptの「ジェネリクス」機能
  // idはページが格納されたフォルダ名[id]で定義されたプロパティ名
  // paramsがPromiseで渡されるため、id属性：型指定を格納しparamsを受取る
  params: Promise<{ id: string }>;
};

// ⬛︎ Next.JS 15からのの仕様変更・修正
// ページコンポーネントは非同期関数として定義されデータの取得や処理をページコンポーネント内で直接行うことができる

// ⬛︎ microCMSのAPIにクエリパラメータを渡して、特定のカテゴリに属するニュース記事を取得
export default async function Page({ params }: Props) {
  // データを受取るまでawaitで待ちid属性を分割代入
  const { id } = await params;

  // getCategoryList()で不正チェックとid取得。idに不正な値が入った場合はnotFoundページを表示する
  const category = await getCategoryDetail(id).catch(notFound);

  // ⬛︎ カテゴリーに属するニュース一覧をgetNewsList()で取得
  // contents は microCMSの返り値で固定のプロパティ名。{ contents: [...], (記事データの配列が入る) }
  // contentsプロパティをnewsという新しい変数に分割代入している　contentsをnews（変数）と言い換えて使う
  const { contents: news, totalCount } = await getNewsList({
    // category[equals]：フィールド名[条件]　→　categoryフィールドが指定の値と等しい
    // ${category.id}：指定の値
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });

  // ⬛︎ const { contents: news } = await getNewsList()からnewsを渡される
  return (
    <>
      <p>
        <Category category={category} />
        の一覧
      </p>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
