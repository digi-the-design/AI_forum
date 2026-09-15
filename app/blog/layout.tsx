//共通Reactの型定義
import TwoColumn from "@/app/_components/TwoColumn";
import SideColumn from "@/app/_components/SideColumn";
import Hero from "@/app/_components/Hero_B";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import styles from "./page.module.css";
import Link from "next/link";
import PageTransition from "@/app/_components/PageTransition";
//共通Reactの型定義
type Props = {
  children: React.ReactNode;
};

export const revalidate = 0;

export default function RootLayout({ children }: Props) {
  return (
    <>
      <PageTransition />
      <div className={styles.main_block}>
        <Hero
          title="BLOG & REPORT"
          sub="ブログ&レポート"
          bgImage="/img/blog_header.jpg"
          className={styles.blog}
          titles={styles.title}
        />
      </div>
      <Breadcrumbs />
      <TwoColumn main={children} sidecolumn={<SideColumn />} />
      {/*ブログの一覧ページとカテゴリーページではサムネイルを表示しないようにする*/}
    </>
  );
}
