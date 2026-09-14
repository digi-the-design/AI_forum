"use client";
import Image from "next/image";
import styles from "./index.module.css";
/*import { useScrollAnimation } from "@/hooks/useScrollAnimation";*/
export default function AdditionalSection({
  number,
  title_en,
  title_ja,
  text,
  img,
  reverse = false,
  future = false,
  link,
}) {
  //useScrollAnimationフックが返すオブジェクトから各Refと各Playedの状態を分割代入で取得
  //Refはobserveブロックの参照先、Playedはアニメーションが再生されたかどうかの状態
  //const { titleRef, textRef, imgRef, titlePlayed, textPlayed, imgPlayed } =
    //useScrollAnimation();
  return (
    <section className={styles.additional_section}>
      {/* 見出しブロック */}
      <div className={styles.title_block}>
        <div
        /* 参照用見出し 
          ref={titleRef}*/
        /* 参照用見出し 
          className={`${styles.w100} bgextend bgLRextendTrigger ${titlePlayed ? "bgLRextend" : ""}`}*/
        >
          <span className={`${styles.title}`}>
            {/* 
             bgappearTrigger ${
              titlePlayed ? "bgappear" : ""
            }`}*/}

            {number}
          </span>

          <div className={`${styles.bg_title_top} }`}>
            {/*bgappearTrigger ${
              titlePlayed ? "bgappear" : ""*/}
            {title_en}
          </div>
        </div>
      </div>

      {/* コンテンツブロック */}
      <div className={`${styles.container} ${reverse ? styles.reverse : ""}`}>
        {/* テキストブロック */}
        <div className={styles.additional_content}>
          <div>
            {/*
            ref={textRef}
            className={`bgextend bgLRextendTrigger_02 ${
              textPlayed ? "bgLRextend" : ""
            }`} */}
            <a href={link} className={styles.learnMoreBtn_block}></a>

            <div className={`${styles.content_block}`}>
              {/**  bgappearTrigger_02 ${
                textPlayed ? "bgappear" : ""
              }`}*/}

              <h2>{title_ja}</h2>
              <p>{text}</p>
              <span className={styles.learnMoreBtn}>もっと詳しく</span>
            </div>
          </div>
        </div>

        {/* 画像ブロック */}
        <div className={`${styles.image_block} ${future ? styles.future : ""}`}>
          <div className={`${styles.image_block_container} `}>
            {/*ref={imgRef}
            bgextend bgLRextendTrigger_03 ${
              imgPlayed ? "bgLRextend" : ""
            }*/}

            <Image
              src={img}
              alt={title_ja}
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
