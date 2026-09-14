import { Children } from "react";
import styles from "./index.module.css";

export default function PageContents({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className={`${styles.additionalSection} ${styles.sectionMb}`}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <div className={styles.contentBlock}>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
