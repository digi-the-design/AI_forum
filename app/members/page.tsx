import Image from "next/image";
import { getMembersList, Member } from "../_libs/microcms";
import { MEMBERS_LIST_LIMIT } from "../_constants";
import styles from "./page.module.css";
// ⬛︎ APIからデータを取得する非同期処理を含む関数をインポート

//SSG化するためブランク設定
//export const dynamic = "force-dynamic";
//export const fetchCache = "force-no-store";

export default async function Page() {
  // awaitで非同期処理を待ち、取得したデータをdataに格納
  //microCMSのAPIからデータを非同期通信で取得するgetMembersList関数を呼び出し、引数に{limit: 100}を渡している。引数に渡された数値はマジックナンバーで、APIから取得するデータの最大数を指定している。ここでは、最大100件のデータを取得するように指定している。
  const data = await getMembersList({ limit: MEMBERS_LIST_LIMIT });
  // 取得したデータをコンソールに出力
  return (
    <div className={styles.container}>
      {/* データがない場合の処理 三項演算子　*/}
      {data.contents.length === 0 ? (
        <p className={styles.empty}>メンバーが登録されていません。</p>
      ) : (
        <ul>
          {data.contents.map((member) => (
            <li key={member.id} className={styles.list}>
              <Image
                src={member.image.url}
                alt=""
                width={member.image.width}
                height={member.image.height}
                className={styles.image}
              />
              <dl>
                <dt className={styles.name}>{member.name}</dt>
                <dd className={styles.position}>{member.position}</dd>
                <dd className={styles.profile}>{member.profile}</dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
