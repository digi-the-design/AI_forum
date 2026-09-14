"use client";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TopicsTitle from "@/app/_components/Topics_Banner/Topics_title";
const items = [
  {
    id: "01",
    href: "/influence",
    title: "AIの進化とその影響 Progress of AI and influence",
    caption:
      "AI技術の進化は、私たちの生活や働き方に大きな変化をもたらしています。このセクションでは、AIの最新の進歩とそれが社会に与える影響について探ります。",
    img: "/img/ai_progress_influence.jpg",
  },
  {
    id: "02",
    href: "/future_society",
    title: "AIと未来社会 AI and future society",
    caption:
      "AI技術がどのように社会に統合され、私たちの生活をどのように変えるかについて求します。",
    img: "/img/ai_future.jpg",
  },
  {
    id: "03",
    href: "/ethic",
    title: "AIと倫理 AI and ethics",
    caption:
      "AI技術の倫理的な側面と、それが私たちの社会や法制度にどのような影響を与えるかについて探ります。",
    img: "/img/ai_ethics.jpg",
  },
];
export default function TopicsBanner() {
  const pathname = usePathname();
  return (
    <ul className={styles.thumbnail_list}>
      <TopicsTitle text="TOPICS" />
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <li
            key={item.id}
            className={`${styles.card} ${isActive ? styles.active : ""}`}
          >
            <Link href={item.href}>
              <div className={styles.card_inner}>
                <div className={styles.content}>
                  <div className={styles.heading_title}>
                    <h2>{item.title}</h2>
                    <p className={styles.caption}>{item.caption}</p>
                  </div>
                </div>
                <div className={styles.thumbnail}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={800}
                    height={300}
                    style={{
                      width: "100%",
                      height: "auto",
                      aspectRatio: "16 / 9",
                    }}
                  />
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
