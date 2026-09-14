"use client";
import styles from "./index.module.css";
type Props = {
  id: string;
  title: string;
  link: string;
};
export default function SideCategoryMenu({ id, title, link }: Props) {
  return (
    <li key={id} className={styles.sidemenu_container}>
      <a href={link}>
        <div className={styles.thumbnail}></div>
        <div className={styles.content}>
          <p>{title}</p>
        </div>
      </a>
    </li>
  );
}
