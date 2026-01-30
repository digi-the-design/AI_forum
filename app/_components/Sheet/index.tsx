import styles from "./index.module.css";
//共通Reactの型定義
type Props = {
  children: React.ReactNode;
};

export default function Sheet({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
