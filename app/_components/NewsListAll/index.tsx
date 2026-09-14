"use client";
import styles from "./index.module.css";
import { formatDate } from "@/app/_libs/utils";
import Category from "@/app/_components/Category";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { News } from "@/app/_libs/microcms";
type Props = {
  data: News;
};
export default function NewsListAll({ data }: Props) {
  const router = useRouter();

  return (
    <li
      key={data.id}
      onClick={() => router.push(`/news/${data.id}`)}
      className={styles.card}
    >
      <div className={styles.content}>
        <div className={styles.date}>
          <p className={styles.news_date}>{formatDate(data.publishedAt)}</p>
        </div>
        <div className={styles.heading_title}>
          <h2>
            {data.headline}
            {data.indicator && (
              <span className={styles.indicator}>{data.indicator}</span>
            )}
          </h2>
          <p>{data.description}</p>
        </div>
      </div>
    </li>
  );
}
