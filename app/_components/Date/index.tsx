import styles from "./index.module.css";
import Image from "next/image";
import { formatDate } from "@/app/_libs/utils";
//TypeScriptの型定義
type Props = {
  date: string;
};
//dateプロパティをデストラクチャリング（分割代入）の構文{ date }で抽出し、string型の変数date作成
export default function Date({ date }: Props) {
  return (
    <span className={styles.date}>
      <Image src="/clock.svg" alt="" width={16} height={16} priority />
      {/*{ date }変数埋め込み構文 */}
      {formatDate(date)}
    </span>
  );
}
