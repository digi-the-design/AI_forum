import styles from "./page.module.css";
import Image from "next/image";
import NewsList from "@/app/_components/NewsList";
import ButtonLink from "./_components/ButtonLink";
import { getNewsList } from "@/app/_libs/microcms";
import { TOP_NEWS_LIMIT } from "@/app/_constants";
//TypeScript型定義インポート
import { News } from "@/app/_libs/microcms";

//dataオブジェクトのプロパティにTypeScriptの型注釈を定義
//data:{ プロパティ: 型注釈の要素を持つ配列 }という書き方。
//dataがcontentsというプロパティを持つオブジェクトであり、そのcontentsプロパティがNews型の配列であることを示している。
//const data: { contents: News[] } = {
//contents: [
//{
//id: "1",
//title: "渋谷にオフィスを移転しました",
//category: {
// name: "更新情報",
//},
//publishedAt: "2023/05/19",
//createdAt: "2023/05/19",
//}
//],
//};
export default async function Home() {
  //name変数に文字列を代入 ※h1タグ内で使用中
  const name = "世界";
  //sliceメソッドで配列の最初の記事2件を取得
  //const sliceData = data.contents.slice(0, 2);

  // ⬛︎ APIからデータを取得する非同期処理を含む関数を呼び出し、取得したデータをdataに格納
  const data = await getNewsList({ limit: TOP_NEWS_LIMIT });

  return (
    <>
      <section className={styles.top}>
        <div>
          <h1 className={styles.title}>テクノロジーで{name}を変える</h1>
          <p className={styles.description}>
            私たちは市場をリードしているグローバルテックカンパニーです。
          </p>
        </div>
        <Image
          src="/img-mv.jpg"
          alt="img-mv"
          className={styles.bgimg}
          width={4000}
          height={1200}
        />
      </section>
      <section className={styles.news}>
        <h2 className={styles.newsTitle}>News</h2>
        {/* NewsListコンポーネントにsliceDataをnewsプロパティとして渡す 〜インポート元のNewsList({ news }: Props)〜　sliceDataにはdataの記事内容が入る */}
        {/* NewsListコンポーネントにはdata.contentsが渡される */}
        <NewsList news={data.contents} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっと見る</ButtonLink>
        </div>
      </section>
    </>
  );
}
