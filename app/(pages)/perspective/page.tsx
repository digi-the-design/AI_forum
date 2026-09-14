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
          <h2 id="perspective" className={styles.about_title}>
            沿革
          </h2>

          <section className={styles.timeline_section}>
            <ul className={styles.timeline_list}>
              <li className={styles.timeline_item}>
                <span className={styles.timeline_circle}>
                  <time className={styles.timeline_year}></time>
                </span>
                <div className={styles.timeline_content}>
                  <span className={styles.timeline_label}>2018</span>
                  <h3 className={styles.timeline_title}>
                    人工知能フォーラムの発足
                  </h3>
                  <p className={styles.timeline_text}>
                    AIの社会実装と技術理解を深めるため、研究者・実務者の交流の場として設立しました。
                  </p>
                </div>
              </li>
              <li className={styles.timeline_item}>
                <span className={styles.timeline_circle}>
                  <time className={styles.timeline_year}></time>
                </span>
                <div className={styles.timeline_content}>
                  <span className={styles.timeline_label}>2019</span>
                  <h3 className={styles.timeline_title}>
                    第一回公開セミナー開催
                  </h3>
                  <p className={styles.timeline_text}>
                    機械学習・自然言語処理・倫理をテーマにした第一回公開セミナーを開始しました。
                  </p>
                </div>
              </li>
              <li className={styles.timeline_item}>
                <span className={styles.timeline_circle}>
                  <time className={styles.timeline_year}></time>
                </span>
                <div className={styles.timeline_content}>
                  <span className={styles.timeline_label}>2020</span>
                  <h3 className={styles.timeline_title}>
                    産学官連携イベント開始
                  </h3>
                  <p className={styles.timeline_text}>
                    企業、大学、自治体と連携し、AI活用の実証や政策議論の場を広げました。
                  </p>
                </div>
              </li>
              <li className={styles.timeline_item}>
                <span className={styles.timeline_circle}>
                  <time className={styles.timeline_year}></time>
                </span>
                <div className={styles.timeline_content}>
                  <span className={styles.timeline_label}>2022</span>
                  <h3 className={styles.timeline_title}>
                    地域連携フォーラムへ進化
                  </h3>
                  <p className={styles.timeline_text}>
                    産業課題と社会的影響を視野に入れた定例フォーラムとして活動領域を拡大しました。
                  </p>
                </div>
              </li>
              <li className={styles.timeline_item}>
                <span className={styles.timeline_circle}>
                  <time className={styles.timeline_year}></time>
                </span>
                <div className={styles.timeline_content}>
                  <span className={styles.timeline_label}>2024</span>
                  <h3 className={styles.timeline_title}>
                    AIと社会の共創を推進
                  </h3>
                  <p className={styles.timeline_text}>
                    透明性、説明責任、倫理と実装をつなぐ対話型イベントを継続しながら、次世代の学びを支えています。
                  </p>
                </div>
              </li>
              <li className={styles.timeline_item}>
                <span className={styles.timeline_circle}>
                  <time className={styles.timeline_year}></time>
                </span>
                <div className={styles.timeline_content}>
                  <span className={styles.timeline_label}>2026</span>
                  <h3 className={styles.timeline_title}>
                    公式サイト人工知能フォーラム
                  </h3>
                  <p className={styles.timeline_text}>
                    論文投稿形式で人工知能と社会に与える影響などを議論して行きます。
                  </p>
                </div>
              </li>
            </ul>
          </section>
        </div>

        <TopicsBanner />
      </PageContents>
    </>
  );
}
