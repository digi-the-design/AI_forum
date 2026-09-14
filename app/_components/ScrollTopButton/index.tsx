"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import Image from "next/image";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const marker = document.getElementById("page-marker");
    if (!marker) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // マーカーが画面内 = ページトップ付近 → ボタン非表示
          setIsVisible(false);
        } else {
          // マーカーが画面外 = スクロール済み → ボタン表示
          setIsVisible(true);
        }
      });
    };

    const observerOption = {
      root: null,
      threshold: 1,
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOption,
    );
    observer.observe(marker);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.scroll_to_top} ${isVisible ? styles.scroll_active : ""}`}
      onClick={scrollToTop}
      aria-label="ページトップへ戻る"
    >
      <Image
        src="/img/scroll.png"
        width={80}
        height={80}
        alt="Scroll To Top"
      />
    </button>
  );
}
