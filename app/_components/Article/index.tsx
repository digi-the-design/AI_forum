import Image from "next/image";
import type { News } from "@/app/_libs/microcms";
import Category from "@/app/_components/Category";
import MembersIconName from "@/app/_components/MemberIconName";
import SnsIcon from "@/app/_components/SNSIcon";
import styles from "./index.module.css";
import parse from "html-react-parser";
import ButtonLink from "@/app/_components/ButtonLink";
type Props = {
  data: News;
};

export default function Article({ data }: Props) {
  const { members } = data;
  return (
    <div className={styles.content_block}>
      <div className={styles.text_container}>
        <div className={styles.image_block_title}>
          <Image
            src={data.thumbnail?.url || "/default-thumbnail.jpg"}
            alt={data.title}
            width={400}
            height={225}
            style={{ width: "100%", height: "auto", aspectRatio: "16 / 9" }}
          />
        </div>
        <div className={styles.title_block}>
          <h2>{data.title}</h2>
          <SnsIcon
            variant="blog"
            url={`http://localhost:3000/blog/${data.id}`}
            title={data.title}
          />
          <MembersIconName members={members} publishedAt={data.publishedAt} />
          <Category categories={data.categories} variant="secondary" />
        </div>
        <p className={styles.caption}>{data.description}</p>
        {data.content && typeof data.content === "string" ? (
          parse(data.content)
        ) : (
          <p>本文がありません。</p>
        )}{" "}
        <div className={styles.button_block}>
          <ButtonLink href="/blog" text="記事一覧へ" />
        </div>
      </div>
    </div>
  );
}
