import Image from "next/image";
import styles from "./index.module.css";

type Props = {
  title: string;
  sub: string;
  bgImage: string;
  className?: string;
};

export default function Hero({ title, sub, bgImage, className }: Props) {
  return (
    <section className={`${styles.container_mv}`}>
      <div
        className={`${styles.bgimg}`}
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className={`${styles.background} ${className || ""}`} />{" "}
        <div className={styles.text_block}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.sub}>
            {sub.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
