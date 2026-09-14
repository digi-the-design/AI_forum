import styles from "./index.module.css";
import Link from "next/link";
export default function ContactForm() {
  return (
    <section className={styles.contact_form}>
      <Link href="/contact">
        <div className={styles.contact_form_container}>
          <div className={styles.contact}>
            <p>
              人工知能フォーラムに関するお問合せ、
              <br />
              人工知能に関するイベント等の企画など受け付けております。
              <br />
              ご興味のある方はお気軽にお問い合わせください。
            </p>
          </div>
          <div className={styles.form}>
            <button className={styles.btnlinestretches2}>
              人工知能フォーラムに関する
              <br className={styles.pc} />
              お問い合わせ
            </button>
          </div>
        </div>
      </Link>
    </section>
  );
}
