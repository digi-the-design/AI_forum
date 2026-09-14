"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./index.module.css";
import Menu from "@/app/_components/Menu/";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // css追加用状態管理useStateを定義
  // URLの内容更新で再レンダリングされるようにusePathnameを定義
  const pathname = usePathname();
  // スクロールでCSS追加を判別するための状態管理useStateを定義
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (window.scrollY > 360) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // ← 依存配列を空にして一度だけリスナー登録

  return (
    <header
      className={`${styles.scroll_header} ${isVisible ? styles.show : ""} `}
    >
      <Menu
        key={pathname}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
    </header>
  );
}
