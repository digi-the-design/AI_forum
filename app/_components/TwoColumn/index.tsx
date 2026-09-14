import styles from "./index.module.css";
import ConditionalThumbnail from "@/app/_components/ConditionalThumbnail";
import BlogThumbnail from "@/app/_components/BlogThumbnail";
export default async function TwoColumn({
  main,
  sidecolumn,
}: {
  main: React.ReactNode;
  sidecolumn: React.ReactNode;
}) {
  return (
    <>
      <section className={styles.blog_section}>
        <div className={styles.blog_container}>
          <div className={styles.text_content}>{main}</div>
        </div>
        <div className={styles.r_column}>{sidecolumn}</div>
      </section>
      <section>
        {" "}
        {/*className={styles.blog_section}*/}
        {/*ConditionalThumbnailがBlogThumbnailコンポーネントを入れる箱の役割*/}
        <ConditionalThumbnail>
          <BlogThumbnail />
        </ConditionalThumbnail>
      </section>
    </>
  );
}
