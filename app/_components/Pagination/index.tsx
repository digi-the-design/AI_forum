import { NEWS_LIST_LIMIT } from "@/app/_constants";
import Link from "next/link";
import styles from "./index.module.css";
type Props = {
  totalCount: number;
  // ⬛︎ currentが渡されない場合の安全対策
  // ?:オプショナルプロパティ currentがある：naumber型、currentがない：undefined
  // ?:を定義しないとcurrentがundefindeのときにエラーになる
  // ページ番号は数値の為number型で定義
  current?: number;
  basePath?: string;
};

// ⬛︎ 第二引数current = 1は、親コンポーネントからcurrentプロパティが渡されない場合の値を1に設定
export default function Pagination({
  totalCount,
  current = 1,
  basePath = "/news", // ⬛︎ basePathのデフォルト値を/newsに設定
}: Props) {
  const pages = Array.from(
    { length: Math.ceil(totalCount / NEWS_LIST_LIMIT) },
    (_, i) => i + 1,
  );
  return (
    <nav>
      <ul className={styles.container}>
        {/* pはページ番号を渡す引数で、pages変数の各要素をループして生成される */}
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {/*　三項演算子　現在のページ番号以外とpの値は同じ？(true):(false) */}
            {current !== p ? (
              //basePathを先頭に追加して、ページ番号pをURLに組み込む
              <Link href={`${basePath}/p/${p}`} className={styles.item}>
                {p}
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>{p}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
