"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import styles from "./index.module.css";
import Category from "@/app/_components/Category";
import Date from "@/app/_components/Date";
import type { News } from "@/app/_libs/microcms";

type Props = {
  news: News[];
};

export default function NewsList({ news }: Props) {
  const router = useRouter();

  if (!news || news.length === 0) {
    return <p>記事がありません</p>;
  }

  return (
    <div className={styles.news}>
      <div className={styles.information_block}>
        <div className={styles.information_title}>
          <Link href="/news" className={styles.inner_block}>
            <h2>NEWS</h2>
          </Link>
        </div>

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
        >
          {news.map((article) => (
            <SwiperSlide key={article.id}>
              <span
                onClick={() => router.push(`/news/${article.id}`)}
                className={styles.link}
              >
                <dl className={styles.information_content}>
                  <dt className={styles.newsItemTitle}>
                    <Date date={article.publishedAt ?? article.createdAt} />
                    <span className={styles.indicator}>{article.indicator}</span>
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
