import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import Hero from "@/app/_components/Hero_A";
import APIGoogleMap from "@/app/_components/APIGoogleMap";
import PageContents from "@/app/_components/PageContents";
import TopicsBanner from "@/app/_components/Topics_Banner";

export default function Page() {
  return (
    <>
      <Hero
        title="ABOUT"
        sub="人工知能フォーラムの企画概要"
        bgImage="/img/about.jpg"
        className={styles.background}
      />
      <PageContents>
        <div className={styles.text_container}>
          <h2 id="greeting" className={styles.about_title}>
            ご挨拶
          </h2>
          <p>
            人工知能（AI）は、コンピュータシステムが人間の知能を模倣する技術です。AIは、データの分析、パターン認識、予測、意思決定など、さまざまなタスクを自動化し、効率化することができます。AI技術は、機械学習、ディープラーニング、自然言語処理、コンピュータビジョンなど、多岐にわたる分野で進化を遂げています。
            <br />
            AIの応用範囲は広く、医療、金融、製造、交通、エンターテイメントなど、さまざまな業界で利用されています。例えば、医療分野では、AIを活用した診断システムが病気の早期発見を支援し、治療の精度を向上させています。金融分野では、AIを活用したリスク管理や詐欺検出システムが導入され、セキュリティの強化に貢献しています。
            AI技術の進化により、私たちの生活はますます便利で効率的になっています。しかし、AIの普及には倫理的な課題も伴います。プライバシーの保護や、AIによる雇用の影響など、社会全体で考慮すべき問題が存在します。これらの課題に対処するためには、AI技術の透明性と説明責任を確保し、適切な規制とガイドラインを設けることが重要です。
            <br />
            このフォーラムでは、AI技術の最新動向や応用事例、倫理的課題について議論し、AIの未来について考える場を提供します。参加者は、専門家の講演やパネルディスカッションを通じて、AIに関する知識を深め、実践的なスキルを身につけることができます。AI技術の進化を共に見守り、より良い未来を築くための一歩を踏み出しましょう。
          </p>
          <span className={styles.autherName}>代表</span>
        </div>{" "}
        <TopicsBanner />
      </PageContents>
    </>
  );
}
