"use client";
import { client } from "@/app/_libs/microcms";
import styles from "./index.module.css";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
type Crumb = {
  label: string;
  href?: string;
};

export default function Breadcrumbs() {
  // ⬛︎ スラッグからタイトルを取得して、パンくずリストを生成するロジックを実装
  // ①usePathnameフックを使用して、現在のパス名(URL)を取得し、スラッグを抽出
  // ②useStateフックを使用して、タイトルを状態として管理
  // ③useEffectフックを使用して、スラッグが変更されたときにmicroCMSからタイトルを取得するロジックを実装
  // ④パンくずリストのアイテムを定義し、タイトルが取得できない場合はスラッグを表示するように設定
  // ⑤パンくずリストをレンダリングする JSX を返す
  // ⑥パス名を取得して、スラッグを抽出

  // usePathnameフックを使用して、現在のパス名を取得
  const pathname = usePathname();
  // split()メソッドを使用してパスを分割。filter()メソッドを使用して空文字列を除外。スラッグを取得
  const paths = pathname.split("/").filter(Boolean);
  // 例: /blog/[slug] の場合、paths[0] = "blog", paths[1] = "[slug]"
  // paths[1]がスラッグになるため、変数slugに格納
  const slug = paths[1]; // /blog/[slug]

  // ⬛︎ useState()を使用して、タイトルを状態として管理。const [count, setCount] = useState(0);
  // [title,setTitle]は、タイトルの状態とその更新関数を定義。
  // useState()は、タイトルの状態を管理するためのフック。タイトルが取得できない場合はnullになる。
  // const [現在の値, 更新関数] = useState<型>(初期値)の形式で使用される。初期値は(null)。
  // タイトルの状態を管理するために使用
  const [title, setTitle] = useState<string | null>(null);

  // ⬛︎ スラッグが変更されたときにタイトルを取得するロジックを実装
  // microCMSにリクエストを送り、microcmsからタイトルを取得するためにuseEffectフックを使用
  // スラッグが変更されたときにこのロジックが実行されるようにする
  useEffect(() => {
    // if文を使用して、スラッグが存在しない場合は処理を終了
    if (!slug) return;
    // microcms.tsからタイトルを取得するために、client.get()メソッドを使用してデータを取得
    client
      .get({
        // microCMSのendpointとcontentIdを指定して、データを取得
        endpoint: "blog", // ← microCMSのエンドポイント名がブログ
        contentId: slug, // ← contentIdがスラッグの記事を取得
      })
      // then()メソッドを使用して、取得したデータからタイトルを抽出し、setTitle関数を使用してタイトルの状態を更新
      .then((data) => setTitle(data.title))
      // catch()メソッドを使用して、エラーが発生した場合はコンソールにエラーメッセージを表示
      .catch((err) => console.error(err));
    // [slug]を依存配列に指定して、スラッグが変更されたときにこのエフェクトが再実行されるようにする
  }, [slug]);

  // ⬛︎ パンくずリストのアイテムを定義し、タイトルが取得できない場合はスラッグを表示するように設定
  // isBlogTop変数を定義して、現在のパスがブログのトップページかどうかを判定 pathname === "/blog";ならtrue、そうでなければfalseを返す
  // trueの場合はブログのトップページ、falseの場合はそれ以外のページを示す。これを使用して、パンくずリストのアイテムを条件分岐させることができる。
  const isBlogTop = pathname === "/blog";
  // items変数を定義して、パンくずリストのアイテムを設定。
  // ブログのトップページの場合は、HOMEとBLOG & REPORTの2つのアイテムを表示。
  // それ以外の場合は、HOME、BLOG & REPORT、タイトル（またはスラッグ）の3つのアイテムを表示
  // const name = true ? "タイトル" : "スラッグ"; // タイトルが取得できない場合はスラッグを表示する例
  const items = isBlogTop
    ? // trueの場合はブログのトップページ、falseの場合はそれ以外のページを示す。これを使用して、パンくずリストのアイテムを条件分岐させることができる。
      [
        { label: "HOME", href: "/" },
        { label: "BLOG & REPORT" }, // ← リンクなし
      ]
    : // falseの場合は、HOME、BLOG & REPORT、タイトル（またはスラッグ）の3つのアイテムを表示
      [
        { label: "HOME", href: "/" }, // 配列:index0
        { label: "BLOG & REPORT", href: "/blog" }, // 配列:index1
        { label: title ?? slug }, // 配列:index2
      ];
  return (
    <section>
      <div className={styles.blog_navigation + " " + styles.blog_nav_top}>
        <ul className={styles.breadcrumb}>
          {
            // ⬛︎ ぱんクズリストの最後のアイテムにリンクを付けない為のロジック
            items.map((item, i) => {
              // items.length(アイテム総数) - 1をiに格納。配列数-1が最後のアイテムのインデックス番号 (総数3-1=2：配列番号2)
              const isLast = i === items.length - 1;
              // isLast? isLastがtrueの場合はitem.labelを表示
              // isLast? isLastがfalseの場合は<a href={item.href}>{item.label}</a>を表示する。
              return (
                <li key={i}>
                  {isLast ? item.label : <a href={item.href}>{item.label}</a>}
                </li>
              );
            })
          }
        </ul>
      </div>
    </section>
  );
}
