import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import SideBlogMenu from "@/app/_components/SideBlogMenu";
import SideCategoryMenu from "@/app/_components/SideCategoryMenu";
import { getCategoryList } from "@/app/_libs/microcms";
import { getBlogList } from "@/app/_libs/microcms";
import SearchField from "@/app/_components/SearchField";
export const revalidate = 60;
export default async function SideColumn() {
  const { contents } = await getBlogList({ limit: 10 });
  const { contents: category } = await getCategoryList({ limit: 15 });
  return (
    <>
      {/* バナーエリア */}
      <div className={styles.banner_block}>
        <div>
          <Image
            src="/img/ai_rectangle_banner.jpg"
            alt="Rectangle Banner"
            width={300}
            height={250}
          />
        </div>
        <div>
          <Image
            src="/img/ai_banner_01.jpg"
            alt="Banner 01"
            width={300}
            height={100}
          />
        </div>
        <div>
          <Image
            src="/img/ai_banner_02.jpg"
            alt="Banner 02"
            width={300}
            height={100}
          />
        </div>
      </div>
      {/* タグブロック */}
      <div className={styles.tag_block}>
        <h3>KEYWORDS</h3>
        <ul>
          {category.map((category) => (
            <SideCategoryMenu
              key={category.id}
              id={category.id}
              title={category.name}
              link={`/blog/category/${category.id}`}
            />
          ))}
          <SearchField />
        </ul>
      </div>
      {/* ブログアーカイブ */}
      <div className={styles.blog_archives}>
        <h3>BLOG TOP10</h3>
        <ul>
          {contents.map((news) => (
            <SideBlogMenu data={news} key={news.id} />
          ))}
        </ul>
      </div>
    </>
  );
}
