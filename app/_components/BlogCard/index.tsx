"use client";
import styles from "./index.module.css";
//import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { formatDate } from "@/app/_libs/utils";
import Category from "@/app/_components/Category";
import MembersIcon from "@/app/_components/MembersIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { News } from "@/app/_libs/microcms";
type Props = {
  data: News;
};
export default function BlogCard({ data }: Props) {
  const {
    members,
  } = data;
  const router = useRouter();

  //const { titleRef, imgRef, titlePlayed, imgPlayed } = useScrollAnimation();
  // 投稿者一覧を取得
  return (
    <li
      key={data.id}
      onClick={() => router.push(`/blog/${data.id}`)}
      className={styles.card}
      //ref={titleRef}
      //className={`${styles.box} bgextend bgLRextendTrigger ${titlePlayed ? "bgLRextend" : ""}`}
    >
      {/*//ref={imgRef}
        //className={`bgappearTrigger ${imgPlayed ? "bgappear" : ""}`}*/}
      <div className={styles.thumbnail}>
        <Image
          src={data.thumbnail?.url || "/thumbnail_dummy.jpg"}
          alt={data.title}
          width={400}
          height={225}
          style={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.heading_title}>
          <h2>{data.title}</h2>{" "}
          <div className={styles.caption}>
            <MembersIcon src={members?.image?.url} size={30} />
            <p className={styles.author_name}>{members?.name}</p>
            <p className={styles.blog_date}>{formatDate(data.publishedAt)}</p>
          </div>
          <Category categories={data.categories} variant="secondary" />
        </div>
        <p>{data.description}</p>
      </div>
    </li>
  );
}
