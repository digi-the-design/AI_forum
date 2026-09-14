import type { Metadata } from "next";
import "@/app/globals.css";
import Hero from "@/app/_components/Hero_A";
import styles from "./page.module.css";


export const metadata: Metadata = {
  title: "NEWS | 新着ニュース記事一覧",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Hero
        title="NEWS"
        sub="新着ニュース記事一覧"
        bgImage="/img/ai_bg_08.jpg"
        className={styles.background}
      />
      {children}
    </>
  );
}
