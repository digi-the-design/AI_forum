"use client";
//Swiper関連のインポート
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
//Swiperのスタイルインポート
import "swiper/css";
import "swiper/css/effect-fade";
import styles from "./index.module.css";
import Category from "@/app/_components/Category";
import Date from "@/app/_components/Date";
//TypeScript型定義インポート
import { News } from "@/app/_libs/microcms";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {
  news: News[];
};

//Props型のnewsプロパティをデストラクチャリング（分割代入）の構文{ news }で抽出し、News型の配列を新しい変数newsとして使う
export default function NewsList({ news }: Props) {
  const router = useRouter();
  if (news.length === 0) {
    return <p>記事がありません</p>;
  }
  return (
<<<<<<< HEAD
    <div className={styles.news}>
      <div className={styles.information_block}>
        <div className={styles.information_title}>
          <Link href={`/news`}>
            <div className={styles.inner_block}>
              <h2>NEWS</h2>
            </div>{" "}
=======
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
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
          </Link>
        </div>

        {/*Swiperコンポーネントを使用してニュース記事をスライド表示*/}
        <Swiper
          className="ticker"
          slidesPerView={1}
          spaceBetween={0}
          direction="horizontal"
          loop={true}
          allowTouchMove={false}
          speed={1000}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          /*effect="fade"
        fadeEffect={{ crossFade: true }}*/
        >
          {news.map((article) => (
            <SwiperSlide key={article.id}>
              <span
                onClick={() => router.push(`/news/${article.id}`)}
                className={styles.link}
              >
                <dl className={styles.information_content}>
                  <dt className={styles.newsItemTitle}>
                    <Date date={article.publishedAt ?? article.createdAt} />{" "}
                    <span className={styles.indicator}>
                      {article.indicator}
                    </span>
                  </dt>
                  <dd className={styles.meta}>{article.headline}</dd>
                </dl>
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
