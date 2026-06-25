import styles from "./index.module.css";
import Image from "next/image";
import Category from "@/app/_components/Category";
import Date from "@/app/_components/Date";
//TypeScript型定義インポート
import { News } from "@/app/_libs/microcms";
import Link from "next/link";
type Props = {
  news: News[];
};

//Props型のnewsプロパティをデストラクチャリング（分割代入）の構文{ news }で抽出し、News型の配列を新しい変数newsとして使う
export default function NewsList({ news }: Props) {
  if (news.length === 0) {
    return <p>記事がありません</p>;
  }
  return (
    <ul>
      {news.map((article) => (
        <li key={article.id} className={styles.list}>
          <Link href={`/news/${article.id}`} className={styles.link}>
            <div className={styles.link}>
              {/* もしarticle.thumbnailが存在する場合は、そのURLを使用して画像を表示し、存在しない場合は代わりにno-image.pngを表示する条件式（三項演算子）を使用している。これにより、記事にサムネイル画像がない場合でも、適切な代替画像が表示されるようになっている。*/}
              {article.thumbnail ? (
                <Image
                  src={article.thumbnail.url}
                  alt={article.title}
                  width={1200}
                  height={630}
                  className={styles.image}
                />
              ) : (
                <Image
                  src="/no-image.png"
                  alt="No image"
                  width={1200}
                  height={630}
                  className={styles.image}
                />
              )}
              <dl className={styles.content}>
                <dt className={styles.newsItemTitle}>{article.title}</dt>
                <dd className={styles.meta}>
                  {/*Categoryコンポーネント　categoryプロパティは型定義がされている箱でそこに値を格納する*/}
                  <Category category={article.category} />
                  {/*Dateコンポーネント publishedAtを使い、もしそれが null または undefined の場合に限り article.createdAt を代わりに使う*/}
                  <Date date={article.publishedAt ?? article.createdAt} />
                </dd>
              </dl>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
