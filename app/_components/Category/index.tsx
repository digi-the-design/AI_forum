import styles from "./index.module.css";
import type { Category as CategoryType } from "@/app/_libs/microcms";

type Props = {
  categories?: CategoryType[] | null;
  category?: CategoryType | null;
  variant?: "primary" | "secondary";
};

export default function Category({
  categories,
  category,
  variant = "primary",
}: Props) {
  // 配列形式
  if (Array.isArray(categories) && categories.length > 0) {
    const validCategories = categories.filter((cat) => cat !== null);
    if (validCategories.length === 0) return null;

    const className = variant ? styles[variant] : styles.primary;

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

  // 単一カテゴリ形式
  if (category) {
    return <span className={styles.tag}>{category.name}</span>;
  }

  return null;
}
