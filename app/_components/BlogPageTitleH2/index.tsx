import styles from "./index.module.css";
export default function BlogPageTitleH2({
  text,
  totalCount,
  displayedCount,
}: {
  text: string;
  totalCount?: number;
  displayedCount?: number;
}) {
  return (
    <>
      <div className={styles.title_block_blog}>
        <h2>{text}</h2>
        {typeof totalCount === "number" &&
          typeof displayedCount === "number" && (
            <p>
              {totalCount}件中 {displayedCount}件を表示
            </p>
          )}
      </div>
    </>
  );
}
