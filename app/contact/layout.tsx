<<<<<<< HEAD
import type { Metadata } from "next";
import styles from "./page.module.css";
import Hero from "@/app/_components/Hero_A";
import PageContents from "@/app/_components/PageContents";

export const metadata: Metadata = {
  title: "CONTACT | お問い合わせ",
  description: "人工知能フォーラムに関するお問い合わせフォームです。",
};

export default function ContactLayout({ children }) {
  return (
    <>
      <Hero
        title="CONTACT"
        sub="お問い合わせ"
        bgImage="/img/ai_bg_02.jpg"
        className={styles.contact_main}
      />
      <PageContents>
        <section>
          <div className={styles.form_main_block}>
            <h1>人工知能フォーラムに関するお問い合わせ</h1>
          </div>
          <div className={styles.form_input_block}>
            <div className={styles.form_block}>{children}</div>
          </div>
        </section>{" "}
      </PageContents>
=======
import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/Sheet";

// 共通Metadataに追加
export const metadata = {
  title: "お問い合わせ",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <>
      <Hero title="Contact" sub="お問い合わせ" />
      <Sheet>{children}</Sheet>
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
    </>
  );
}
