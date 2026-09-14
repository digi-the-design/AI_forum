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
  current = 1, // 初期設定　（読み込み側ページから値を取得し変化）
  basePath,
  categorySlug,
  pagerNumbers = PAGENATION_LIMIT, // ここで最大表示数を読み込み
  pagerList,
  queryParam,
}: Props) {
  // ⬛︎ 表示するページ番号の上限設定（スライディング・ウィンドウ方式）
  // ⚪︎開始番号と終了番号を決定
  // 表示したいボタンの最大数の半分を計算　Math.floorは端数切り捨て計算　5 ÷ 2 = 2.5 → 2
  const half = Math.floor(pagerNumbers / 2); // 10 ÷ 2 = 5
  // 開始ページ番号の決定（1未満にならないようにガード）1と比較, 現在のページ番号から5引いた数で大きい方を代入
  let start = Math.max(1, current - half); // 1 , 8 - 5 = 3：3の方が大きいのでstartは3
  // 終了ページ番号の決定（最大ページ数を超えないようにガード）総ページ数と比較, startのページ番号+10から1引いた数で小さい方を代入
  let end = Math.min(pagerList, start + pagerNumbers - 1); // 12 , 3 + 10 - 1 = 12：12の方が小さいのでendは12

  // ⚪︎表示件数が足りない場合の補正処理
  // もし：12 - 8 + 1 = 5 < 10 なら
  if (end - start + 1 < pagerNumbers) {
    // 最初の番号 =  1 , 12 - 10 + 1 = 3 で 最初の番号を強制的に3に補正 （currentページャーが右に遷移しても値が固定される）
    start = Math.max(1, end - pagerNumbers + 1);
  }
  // 例)
  // 総ページ数12ページ
  // ページネーションの上限10
  // 初期表示から6ページャー目まで固定[1,2,3,4,5,6,7,8,9,10] start:1 / end:10
  // 7ページャー目だけスライド[2,3,4,5,6,7,8,9,10,11] start:2 / end:11
  // 8ページャー目から固定[3,4,5,6,7,8,9,10,11,12] start:3 / end:12

  /**
   * ページ番号に応じた遷移先URLを生成する関数
   *
   * @param p - 生成対象のページ番号（数値）
   * @returns 組み立てられたURL文字列
   */

  // ⬛︎ 画面に並べるページ番号の配列をループ処理で作成
  // 空の配列を用意
  const pages = [];
  // endの値に達するまで、1ずつ足しながらループ（繰り返し）処理する
  for (let i = start; i <= end; i++) {
    // iの数値をループ処理回数だけpages変数の配列に追加
    pages.push(i);
  }
  // 例)[1,2,3,4,5,6,7,8,9,10]配列

  // ⬛︎ href生成関数
  const getHref = (p: number) => {
    // 1ページ目の時は、URLの末尾に番号を付けずトップのURLを返す（SEO対策）
    if (p === 1) {
      return basePath;
    }
    // パス形式（例: /blog/search/キーワード/p/2）の場合
    return `${basePath}/${p}`;
  };

  return (
    <nav className={styles.navgation}>
      <ul className={styles.container}>
        {current > 1 && (
          /* 前のページ：リンクあり装飾なし */
          <li>
            <Link href={getHref(current - 1)} className={styles.prev}>
              Prev
            </Link>
          </li>
        )}
        {/* pはページ番号を渡す引数で、pages変数の各要素をループして生成される */}
        {pages.map((p) => (
          <li className={styles.list} key={p}>
            {/*　三項演算子　現在のページ番号以外？A(true):B(false) */}
            {current !== p ? (
              /* A:次のページ：リンクあり装飾なし */
              <Link href={getHref(p)} className={styles.item}>
                {p}
              </Link>
            ) : (
              /* B:現在のページ：リンクなし装飾付き */
              <span className={`${styles.item} ${styles.current}`}>{p}</span>
            )}
          </li>
        ))}
        {current < pagerList && (
          /* 次のページ：リンクあり装飾なし */
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
