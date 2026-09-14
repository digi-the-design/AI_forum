import { notFound } from "next/navigation";
import { getCategoryList, getNewsList } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Pagination from "@/app/_components/Pagination";
// URLが/news/p/1のような形式でアクセスされたときに、currentは1になる
// currentはnews/p/[current]のフォルダ名で定義されたプロパティ名
// Next.js が params.current を作る → params = Promise.resolve({ current: "1" })
// Promiseからawaitしてparamsの中身を取得し解決
// currentをparseIntで数値に変換（1,2,3...）
// await getNewsList()でニュースリストを取得
// offset = limit * (current - 1)
// 1ページ目は0件スキップ、2ページ目は10件スキップ、3ページ目は20件スキップ

type Props = {
  // currentはURLのクエリパラメータから取得される文字列(フォルダ名[current])で定義されたプロパティ名
  // Next.jsが渡すURLは文字列の為、currentはstring型で定義
  params: Promise<{ current: string; id: string }>;
};

// app/page.tsx の一番上、または適切な場所に追記
export default async function Page({ params }: Props) {
  // クエリパラメータから現在のページ番号を取得
  // 文字列を整数に変換するためにparseInt関数を使用。10は10進数であることを指定

  // Next.js16の仕様変更でparamsはPromiseで渡されるため、awaitで解決してからcurrentを取得する
  const resolvedParams = await params;
  //strignで渡された値をparseInt()で数値に変更し10進数であることを指定
  const current = parseInt(resolvedParams.current, 10);
  // isNaN関数は、引数がNaN（Not-a-Number）であるかどうかを判断するためのJavaScriptの組み込み関数
  // current-1は、ページ番号が1から始まるため、0以下の値も不正とみなすために使用されている
  if (Number.isNaN(current) || current < 1) {
    // ページ番号が不正な場合は404エラーを返す
    notFound();
  }
  // APIからカテゴリの詳細を取得。カテゴリが存在しない場合は404エラーを返す
  const category = await getCategoryList(resolvedParams.id).catch(notFound);

  // ⬛︎ APIからニュースのリストを取得 limitは1ページあたりの件数、offsetはスキップする件数
  // getNewsList()が返すcontentsプロパティをnews変数に分割代入
  const { contents: news, totalCount } = await getNewsList({
    //カテゴリIDで絞り込み
    filters: `category[equals]${category.id}`,
    // constants/NEWS_LIST_LIMITから定数をインポート
    limit: NEWS_LIST_LIMIT, //10件ずつ取得
    // offsetは、current（現在のページ番号）に基き、1ページ目の場合は0件スキップ、2ページ目の場合は10件スキップ
    offset: NEWS_LIST_LIMIT * (current - 1), // 10件 ×（ページ番号 - 1）＝ スキップする件数　0,10,20...
  });
  // ニュースが存在しない場合は404エラーを返す
  if (news.length === 0) {
    notFound();
  }
  return (
    <>
      <NewsList news={news} />
      <Pagination
        totalCount={totalCount}
        current={current}
        // /news/category/カテゴリー名を追加
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
