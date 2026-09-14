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
          {" "}
          <h2 id="access" className={styles.about_title}>
            アクセス
          </h2>
          <APIGoogleMap />
          <h4 className={styles.about_title}>東京オフィス</h4>
          <span>〒123-4567 東京都渋谷区</span>
          <span>info@example.com</span>
          <span>0120-345-6789</span>
        </div>
        <TopicsBanner />
      </PageContents>
    </>
  );
}
