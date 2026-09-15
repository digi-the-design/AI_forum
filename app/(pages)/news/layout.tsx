import type { Metadata } from "next";
import "@/app/globals.css";
import Hero from "@/app/_components/Hero_A";
import styles from "./page.module.css";

type NewsLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  title: "NEWS | 新着ニュース記事一覧",
};

export const revalidate = 0;

export default function RootLayout({ children }: NewsLayoutProps) {
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
