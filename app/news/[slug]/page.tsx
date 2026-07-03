import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";
type Props = {
  // ⬛︎ Next.JS 15からのの仕様変更・修正
  // slugはページが格納されたフォルダ名[slug]で定義されたプロパティ名
  // paramsがPromiseで渡されるため、slug属性：型指定を格納しparamsを受取る
  // Promise；これから値が入る予定の箱（予約票）
  // Promise；<{ slug: string }> TypeScriptの「ジェネリクス」機能
  params: { slug: string };
  // microCMSのプレビュー機能対応。クエリパラメータを受け取るための型定義
  searchParams: { dk?: string };
};

// ⬛︎ ページを動的：SSR（Server Side Rendering）に変更してmicroCMS即時反映（キャッシュなし）
// export const revalidate = 0;

// ⬛︎ ページを動的：ISR（Incremental Static Regeneration）に変更してmicroCMS反映遅延60秒（キャッシュあり）
export const revalidate = 60;

// app/page.tsx の一番上、または適切な場所に追記
export default async function Page({ params, searchParams }: Props) {
  // microCMS側URL設定:{CONTENT_ID}?dk={DRAFT_KEY} をコード化:(slug,{draftkey:dk})
  const data = await getNewsDetail(params.slug, {
    draftKey: searchParams.dk,
  }).catch(notFound);
  //記事：Articleコンポーネント・一覧に戻るボタン：ButtonLinkコンポーネント追加
  return (
    <>
      {/*記事データ*/}
      <Article data={data} />
      <div className={styles.footer}>
        {/*一覧に戻るボタン*/}
        <ButtonLink href="/news">ニュース一覧へ</ButtonLink>
      </div>
    </>
  );
}
