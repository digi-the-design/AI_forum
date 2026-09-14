import { use } from "react";
import styles from "./index.module.css";
//TypeScriptカスタム型を別ファイルから定義インポート
import { Category as CategoryType } from "@/app/_libs/microcms";

type Props = {
  categories?: CategoryType[] | null;
  variant?: "primary" | "secondary";
};

export default function Category({ categories, variant }: Props) {
  const className = variant ? styles[variant] : styles.primary;

  // categories が null / undefined / 空配列なら非表示
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  // null が混ざる可能性があるため除外
  const validCategories = categories.filter((cat) => cat !== null);

  if (validCategories.length === 0) {
    return null;
  }

  return (
    <div className={styles.tag_block}>
      {validCategories.map((cat) => (
        <a
          href={`/blog/category/${cat.id}`}
          key={cat.id}
          className={styles.tag_link}
        >
          <span className={className}>{cat.name}</span>
        </a>
      ))}
    </div>
  );
}
