"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.css";

export default function SearchFieldComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = e.currentTarget.elements.namedItem("q");

    if (q instanceof HTMLInputElement) {
      const keyword = q.value.trim();
      if (!keyword) return;

      const params = new URLSearchParams();
      params.set("q", keyword);
      router.push(`/news/search?${params.toString()}`);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.search}>
        <Image src="/img/search.svg" alt="検索" width={16} height={16} loading="eager" />
        <input
          type="text"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="キーワードを入力"
          className={styles.searchInput}
        />
      </label>
    </form>
  );
}
