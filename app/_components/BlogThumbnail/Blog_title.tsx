"use client";
import styles from "./index.module.css";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
export default function Blog({ text }: { text: string }) {
  const { titleRef, imgRef, titlePlayed, imgPlayed } = useScrollAnimation();
  return (
    <div
      //ref={titleRef}
      className={styles.title_block_blog}
      //${styles.box} bgextend bgLRextendTrigger
      //${titlePlayed ? "bgLRextend" : ""}`}
    >
      <span
        //ref={imgRef}
        className={ //{`$
          styles.title_blog
        }
        //bgappearTrigger ${imgPlayed ? "bgappear" : ""}`}
      >
        {text}
      </span>
    </div>
  );
}
