import type { Metadata } from "next";
import styles from "./page.module.css";
import Hero from "@/app/_components/Hero_A";
import PageContents from "@/app/_components/PageContents";

export const metadata: Metadata = {
  title: "CONTACT | お問い合わせ",
  description: "人工知能フォーラムに関するお問い合わせフォームです。",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        </section>
      </PageContents>
    </>
  );
}
