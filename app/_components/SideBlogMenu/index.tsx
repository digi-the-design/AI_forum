"use client";
import styles from "./index.module.css";
import { formatDate } from "@/app/_libs/utils";
import MembersIcon from "@/app/_components/MembersIcon";
import type { News } from "@/app/_libs/microcms";
import Image from "next/image";
type Props = {
  data: News;
};

export default function SideBlogMenu({ data }: Props) {
  return (
    <li key={data.id} className={styles.sidemenu_container}>
      <a href={`/blog/${data.id}`} className={styles.sidemenu_link}>
        <div className={styles.thumbnail}>
          <Image
            src={data.thumbnail?.url ?? "/img/thumbnail_dummy.jpg"}
            alt={data.title}
            width={110}
            height={80}
            style={{ width: "auto", height: "auto", aspectRatio: "16 / 9" }}
          />
        </div>
        <div className={styles.content}>
          <h4>{data.title}</h4>
          <div className={styles.caption}>
            <MembersIcon src={data.members?.image?.url} size={30} />
            <p className={styles.author_name}>{data.members?.name}</p>
          </div>
          <span className={styles.blog_date}>
            {formatDate(data.publishedAt)}
          </span>
        </div>
      </a>
    </li>
  );
}
