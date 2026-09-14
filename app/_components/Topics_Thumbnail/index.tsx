import styles from "./index.module.css";
import BlogCard from "@/app/_components/BlogCard";
import Blog from "@/app/_components/BlogThumbnail/Blog_title";
import { getBlogList } from "@/app/_libs/microcms";
import { BLOG_THUMBNAIL_LIST } from "@/app/_constans";

export default async function BlogThumbnail() {
  // microCMSから最新3件のニュースを取得
  const { contents } = await getBlogList({ limit: BLOG_THUMBNAIL_LIST });
  return (
    <section className={styles.thumbnail_card}>
      <Blog text="BLOG" />
      <div className={styles.container}>
        <ul className={styles.thumbnail_list}>
          {contents.map((news) => (
            <BlogCard key={news.id} data={news} />
          ))}
        </ul>
      </div>
    </section>
  );
}
