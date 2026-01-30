import styles from "./page.module.css";
import Image from "next/image";
import NewsList from "@/app/_components/NewsList";
import ButtonLink from "./_components/ButtonLink";
//TypeScript型定義インポート
import { News } from "@/app/_libs/microcms";

//dataオブジェクトのプロパティにTypeScriptの型注釈を定義
//data:{ プロパティ: 型注釈の要素を持つ配列 }という書き方。
//dataがcontentsというプロパティを持つオブジェクトであり、そのcontentsプロパティがNews型の配列であることを示している。
const data: { contents: News[] } = {
  contents: [
    {
      id: "1",
      title: "渋谷にオフィスを移転しました",
      category: {
        name: "更新情報",
      },
      publishedAt: "2023/05/19",
      createdAt: "2023/05/19",
    },
    {
      id: "2",
      title: "当社CEOが業界リーダーTOP30に選出されました",
      category: {
        name: "更新情報",
      },
      publishedAt: "2023/05/19",
      createdAt: "2023/05/19",
    },
    {
      id: "3",
      title: "テストの記事です",
      category: {
        name: "更新情報",
      },
      publishedAt: "2023/04/19",
      createdAt: "2023/04/19",
    },
  ],
};
export default function Home() {
  //name変数に文字列を代入 ※h1タグ内で使用中
  const name = "世界";
  //sliceメソッドで配列の最初の記事2件を取得
  const sliceData = data.contents.slice(0, 2);
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
        <NewsList news={sliceData} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっと見る</ButtonLink>
        </div>
      </section>
    </>
  );
}
