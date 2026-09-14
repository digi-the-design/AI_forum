import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import Category from "@/app/_components/Category";
import MembersIconName from "@/app/_components/MemberIconName";
import styles from "./index.module.css";
import parse from "html-react-parser";
import { formatDate } from "@/app/_libs/utils";
import ButtonLink from "@/app/_components/ButtonLink";
type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  const { members } = data;
  return (
    <div className={styles.text_container}>
      <div className={styles.title_block}>
        <div className={styles.title_block_date_indicator}>
          <p className={styles.news_date}>{formatDate(data.publishedAt)}</p>
          {data.indicator && (
            <span className={styles.indicator}>{data.indicator}</span>
          )}
        </div>
        <h2>{data.headline}</h2>
        <p className={styles.caption}>{data.description}</p>{" "}
      </div>
      {data.content && typeof data.content === "string" ? (
        parse(data.content)
      ) : (
        <p>本文がありません。</p>
      )}
      <div className={styles.button_block}>
        <ButtonLink href="/news" text="記事一覧へ" />
      </div>
    </div>
  );
}
