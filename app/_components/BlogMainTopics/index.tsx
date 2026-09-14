import Image from "next/image";
import styles from "./index.module.css";

type Props = {
  title: string;
  sub: string;
  bgImage: string;
};

export default function BlogMainTopics({ title, sub }: Props) {
  return (
    <section className={styles.topics_main}>
      <div className={styles.main_title}>
        <h2 className={styles.main_title}>{title}</h2>
        <p>{sub}</p>
      </div>
    </section>
  );
}
