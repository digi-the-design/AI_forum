"use client";
import styles from "./index.module.css";
export default function Blog({ text }: { text: string }) {
  return (
    <div className={styles.title_block_topics}>
      <span className={styles.title_topics}>{text}</span>
    </div>
  );
}
