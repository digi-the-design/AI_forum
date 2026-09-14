import Image from "next/image";
import styles from "./index.module.css";
import Blog from "@/app/_components/BlogThumbnail/Blog_title";

type Member = {
  name: string;
  position?: string;
  profile?: string;
  description?: string;
  image?: { url?: string };
};

type Props = {
  data: Member;
};

export default function BlogerDetail({ data }: Props) {
  return (
    <>
      <div className={styles.text_container}>
        <div className={styles.image_block_title}>
          <Image
            src={data.image?.url || "/default-thumbnail.jpg"}
            alt={data.name}
            width={200}
            height={100}
            style={{ width: "50%", height: "auto", aspectRatio: "16 / 9" }}
          />{" "}
          <div className={styles.title_block}>
            <h2>{data.name}</h2>
            <p className={styles.author_name}>{data.position}</p>
            <p className={styles.caption}>{data.profile}</p>
          </div>
        </div>
        <p className={styles.description}>{data.description}</p>
      </div>
      <Blog text={`${data.name}のブログ記事・論文`} />
    </>
  );
}
