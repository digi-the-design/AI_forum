import type { Metadata } from "next";
import styles from "@/app/page.module.css";
import NewsList from "@/app/_components/NewsList";
import AdditionalSection from "@/app/_components/AdditionalSection";
import TopMessage from "@/app/_components/TopMessage";
import { getNewsList } from "@/app/_libs/microcms";
import { NEWS_LIST_LIMIT } from "@/app/_constans";

export const metadata: Metadata = {
  title: "人工知能フォーラム | AI_FORUM",
  description: "人工知能と未来社会、AIの進化と倫理について考えるサイトです。",
};

//dataオブジェクトのプロパティにTypeScriptの型注釈を定義
//data:{ プロパティ: 型注釈の要素を持つ配列 }という書き方。
//dataがcontentsというプロパティを持つオブジェクトであり、そのcontentsプロパティがNews型の配列であることを示している。

export default async function Home() {
  //name変数に文字列を代入 ※h1タグ内で使用中
  const name = "人工知能";
  //sliceメソッドで配列の最初の記事2件を取得
  // const sliceData = data.contents.slice(0, 6);
  // ⬛︎ APIからデータを取得する非同期処理を含む関数を呼び出し、取得したデータをdataに格納
  const data = await getNewsList({ limit: NEWS_LIST_LIMIT });
  return (
    <>
      <section className={styles.top}>
        <div className={styles.top_inner}>
          <h1 className={styles.title}>AI_{name}を考える</h1>
          <p className={styles.description}>Think about AI</p>
        </div>
        <video
          className={styles.bgimg}
          src="https://5syi392zikxrmvgw.public.blob.vercel-storage.com/tokyo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={styles.overlay}></div>
      </section>
      <section className={styles.news}>
        <NewsList news={data.contents} />
      </section>
      <section className={styles.main}>
        <div className={`${styles.main_title_fluid} ${styles.fluid}`}></div>
        <div className={styles.main_title}>
          {/*--<div className={title">Learning CODE with AI</div>--
          <h2>
            {name}を巡る
            <br className={styles.pc} />
          </h2>*/}
          <p className={styles.main_text}>
            私たちは単にプログラミング技術を学ぶだけでなく、
            <br className={styles.pc} />
            AIが人間の未来にどのような影響を与えるかを探求します。
            <br className={styles.pc} />
            技術の進化が都市の発展にどのように貢献するかを理解することで、
            <br className={styles.pc} />
            私たちと共により良い未来を築くための一歩を踏み出しましょう。
          </p>
        </div>
      </section>
      <section className={styles.additional_section}>
        <AdditionalSection
          number="01"
          title_en="PROGRESS OF AI AND INFLUENCE"
          title_ja="AIの進化とその影響"
          text="AI技術の進化は、私たちの生活や働き方に大きな変化をもたらしています。このセクションでは、AIの最新の進歩とそれが社会に与える影響について探ります。"
          img="/img/progress_influence.jpg"
          reverse={false}
          link="/influence"
        />
        <AdditionalSection
          number="02"
          title_en="AI AND FUTURE SOCIETY"
          title_ja="AIと未来社会"
          text="AI技術がどのように社会に統合され、私たちの生活をどのように変えるかについて探求します。"
          img="/img/ai_future.jpg"
          reverse={true} // ← ここだけ左右反転
          future={true} // ← ここで特別スタイルを適用
          link="future_society"
        />
        <TopMessage />
        <AdditionalSection
          number="03"
          title_en="AI AND ETHICS"
          title_ja="AIと倫理"
          text="AI技術の倫理的な側面と、それが私たちの社会や法制度にどのような影響を与えるかについて探ります。"
          img="/img/ai_ethics.jpg"
          reverse={false}
          link="ethic"
        />
      </section>
    </>
  );
}
