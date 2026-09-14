import styles from "./index.module.css";

type Props = {
  href?: string;
  text?: string;
  children?: React.ReactNode;
};

export default function ButtonLink({
  href = "/",
  text,
  children,
}: Props) {
  return (
    <a href={href} className={styles.button}>
      {children ?? text ?? "詳細を見る"}
    </a>
  );
}
