"use client";
import Image from "next/image";
import styles from "./index.module.css";
//import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRouter } from "next/navigation";
//import type { News } from "@/app/_libs/microcms";

export default function MembersCard({ data }) {
  const { id, name, position, profile, image } = data;
  const router = useRouter();
  //const { titleRef, imgRef, titlePlayed, imgPlayed } = useScrollAnimation();
  return (
    <li
      key={data.id}
      onClick={() => router.push(`/blog/members/${data.id}`)}
      className={styles.card}
      //ref={titleRef}
      //className={`${styles.box} bgextend bgLRextendTrigger ${titlePlayed ? "bgLRextend" : ""}`}
    >
      {/*//ref={imgRef}
        //className={`bgappearTrigger ${imgPlayed ? "bgappear" : ""}`}*/}
      <div className={styles.thumbnail}>
        <Image
          src={data.image?.url || "/thumbnail_dummy.jpg"}
          alt={data.name}
          width={400}
          height={225}
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.heading_title}>
          <h2>{data.name}</h2>
          <p className={styles.blog_date}>{data.position}</p>
        </div>
        <p>{data.profile}</p>
      </div>
    </li>
  );
}
