import Link from "next/link";
import styles from "./index.module.css";
import { PAGENATION_LIMIT } from "@/app/_constans";

type Props = {
  totalCount: number;
  current?: number;
  basePath?: string;
  categorySlug?: string | null;
  pagerNumbers?: number;
  pagerList?: number;
  queryParam?: string;
};

export default function Pagination({
  totalCount,
  current = 1,
  basePath = "/news",
  categorySlug,
  pagerNumbers = PAGENATION_LIMIT,
  pagerList = Math.ceil(totalCount / pagerNumbers),
  queryParam,
}: Props) {
  const half = Math.floor(pagerNumbers / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(pagerList, start + pagerNumbers - 1);

  if (end - start + 1 < pagerNumbers) {
    start = Math.max(1, end - pagerNumbers + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const getHref = (p: number) => {
    if (p === 1) return basePath;
    return `${basePath}/${p}`;
  };

  return (
    <nav className={styles.navgation}>
      <ul className={styles.container}>
        {current > 1 && (
          <li>
            <Link href={getHref(current - 1)} className={styles.prev}>
              Prev
            </Link>
          </li>
        )}
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {current !== p ? (
              <Link href={getHref(p)} className={styles.item}>
                {p}
              </Link>
            ) : (
              <span className={`${styles.item} ${styles.current}`}>{p}</span>
            )}
          </li>
        ))}
        {current < pagerList && (
          <li>
            <Link href={getHref(current + 1)} className={styles.next}>
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
