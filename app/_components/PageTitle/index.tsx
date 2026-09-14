import Image from "next/image";
import styles from "./index.module.css";
type Props = {
  h2: string;
  sub: string;
  p: string;
};

export default function PageTitle({ h2, sub, p }: Props) {
  return (
    <section className={styles.topics_main}>
      <div className={`${styles.main_title_fluid} ${styles.fluid}`}></div>
      <div className={styles.main_title}>
        <h2 dangerouslySetInnerHTML={{ __html: h2 }} />
        <p className={styles.sub} dangerouslySetInnerHTML={{ __html: sub }} />
        <p dangerouslySetInnerHTML={{ __html: p }} />
      </div>
    </section>
  );
}
