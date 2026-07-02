import { notFound } from "next/navigation";
import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";
type Props = {
  params: { slug: string };
  searchParams: { dk?: string };
};

// ⬛︎ ページを動的：SSR（Server Side Rendering）に変更してmicroCMS即時反映（キャッシュなし）
// export const revalidate = 0;
// ⬛︎ ページを動的：ISR（Incremental Static Regeneration）に変更してmicroCMS反映遅延60秒（キャッシュあり）
export const dynamic = "force-dynamic";

// app/page.tsx の一番上、または適切な場所に追記
export default async function Page({ params, searchParams }: Props) {
  // params.slugに記事IDが入る
  const slug = params.slug;
  // searchParams.dkにドラフトキーが入る
  const draftKey = searchParams.dk;
  // microCMS側URL設定:{CONTENT_ID}?dk={DRAFT_KEY} をコード化:(slug,{draftkey:dk})
  const data = await getNewsDetail(slug, {
    draftKey,
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
