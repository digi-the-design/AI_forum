"use client";
import styles from "./index.module.css";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
export default function TopMessage() {
  //useScrollAnimationフックが返すオブジェクトから各Refと各Playedの状態を分割代入で取得
  const { imgRef, imgPlayed } = useScrollAnimation();
  return (
    <section className={styles.additional_bg_section}>
      <div
        ref={imgRef}
        className={`bgextend bgLRextendTrigger ${imgPlayed ? "bgLRextend" : ""}`}
      >
        <div className={`bgappearTrigger ${imgPlayed ? "bgappear" : ""}`}>
          <div className={styles.container_bg}></div>

          <div className={styles.container_bg_02}>
            <p className={styles.message}>
              AI（人工知能）の進化が私たちを変えるか？
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
