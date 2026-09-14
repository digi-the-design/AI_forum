"use client"; // usePathnameの判定だけを行う
import { usePathname } from "next/navigation";
export default function ConditionalThumbnail({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // 一覧ページ、カテゴリページ、ページネーションの時は何も表示しない（nullを返す）
  const isListPage =
    pathname === "/blog" || // ブログ記事一覧（/blogと完全一致）
    pathname.includes("/category") || // カテゴリー記事ー覧（/categoryが一部含まれる）
    pathname.includes("/search") || // 記事検索結果ー覧（/searchが一部含まれる）
    pathname.includes("/p/"); // ブログ・カテゴリー記事一覧ページネーション（/pが一部含まれる）
  if (isListPage) return null; // もしisListPageがtrueならnullを返す（何も表示しない）
  // 詳細ページの時だけ、外から入ってきたサーバーコンポーネント（サムネイル）を表示する
  return <section style={{ width: "100%" }}>{children}</section>;
}

// ⬛︎ URL例示
// ⚪BlogThumbnail非表示
// ブログ記事一覧ページ
// http://localhost:3000/blog
// 条件:===（/blog）完全一致

// ⚪BlogThumbnail非表示
// カテゴリー記事一覧ページ
// http://localhost:3000/blog/category/press-release
// 条件:includes（/category）一部含まれる

// ⚪BlogThumbnail非表示
// 記事検索結果一覧ページ
// http://localhost:3000/blog/search/AI
// 条件:includes（/search）一部含まれる

// ⚪BlogThumbnail非表示
// ブログ・カテゴリー記事一覧ページネーション付き
// http://localhost:3000/blog/category/press-release/p/2
// 条件:includes（/p）一部含まれる

// ●BlogThumbnail表示
// ブログ記事詳細ページ（/blog/記事スラッグ）
// http://localhost:3000/blog/g0lgr51mcl
// 条件:指定なし（上記の条件に当てはまらない場合は表示する）



// ⬛︎ クライアントコンポーネントである理由
// usePathname()はクライアントコンポーネントでしか使えないため。
// BlogThumbnailコンポーネントはサーバーコンポーネント
// URLパス判別用コンポーネントとしてConditionalThumbnailをクライアントコンポーネントとしている。

// ⬛︎ 構成
// TwoColumnコンポーネントにConditionalThumbnailコンポーネント配置
// ConditionalThumbnailコンポーネントの中にBlogThumbnailコンポーネントを入れる構成
// <ConditionalThumbnail><BlogThumbnail /></ConditionalThumbnail>

// TwoColumn（Server / 主にレイアウト用）
//   ConditionalThumbnail（Client / パス監視のみ）//ここで表示・非表示判定
//    BlogThumbnail（Server / ブログ記事データ取得）
