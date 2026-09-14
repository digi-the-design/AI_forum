"use client";
import { client } from "@/app/_libs/microcms";
import styles from "./index.module.css";
// usePathnameフックを使用して、現在のページのパスを取得するためのインポート
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// ブログトップ: /blog
// ブログ記事: /blog/[slug]
// カテゴリー: /category/[slug]
// 検索結果: /search/[slug]
// ページャー: /blog/p/[page]

// ⚪︎全体の流れ
// ⬛︎ 現在のページパス判別ロジックでどのページタイプかを判別する。
// ⬛︎ 各ページタイプに応じて適切なスラッグを取得する。
// ⬛︎ APIからタイトルやカテゴリー名を取得する。
// ⬛︎ microCMSのAPIクライアントを使用して、スラッグを元にタイトルやカテゴリー名を取得するロジック
// ⬛︎ ブレッドクラムのアイテムを動的に生成するロジック。

// ⚪︎基本的な判別ロジック
// パスを分割してページタイプを判別
// 記事ページなら1番目の要素をslugとして使う :HOME > BLOG & REPORT
// それ以外の詳細ページなら2番目の要素をslugとして使う :HOME > BLOG & REPORT > slug
// ページャーなど該当しない場合は null にする :HOME > BLOG & REPORT > ブログアーカイブ02

export default function Breadcrumbs() {
  // ⬛︎ ブレッドクラムのパス判別ロジック
  // 現在のページルートパスを取得・分割して、必要な情報を取得
  const pathname = usePathname();
  // split("/")でパスを分割し、filter(Boolean)で空の文字列を除外して配列として取得する。
  const paths = pathname.split("/").filter(Boolean);

  // 例) url:"/blog/search/AI" を ["blog","search","AI"] に変換。
  // isSearchPageが"true"になる
  // paths[1]は"search"、paths[2]は"AI"となる。

  // ページャーかどうかを判定するために、2番目[1]の要素が "p" かどうかを確認
  const isPager = paths[1] === "p"; // /blog/p/[page]
  // カテゴリーページかどうかを判定。2番目[1]の要素が "category" かどうかを確認
  const isCategoryPage = paths[1] === "category"; // /blog/category/[slug]
  // ブログ記事ページかどうかを判定。2番目[1]の要素が "blog" かどうかを確認
  const isBlogPage = paths[0] === "blog" && !isPager; // /blog/[slug]
  // メンバー一覧ページかどうかを判定。2番目[1]の要素が "members" かつスラッグがない場合
  const isMembersPage = paths[1] === "members" && !paths[2]; // /blog/members
  // メンバー詳細ページかどうかを判定。2番目[1]の要素が "members" かつスラッグがある場合
  const isMembersDetailPage = paths[1] === "members" && Boolean(paths[2]); // /blog/members/[slug]
  // 検索結果ページかどうかを判定。2番目[1]の要素が "category" かどうかを確認
  const isSearchPage = paths[1] === "search"; // /blog/search/[slug]

  // ⬛︎ 各ページタイプに応じて適切なスラッグ値を取得する。
  // /blog/[slug] の場合は paths[1]
  // /blog/category/[slug] の場合は paths[2] を使う
  // /blog/members/[slug] の場合は paths[2] を使う
  // /blog/search/[slug] の場合は paths[2] を使う
  // slug = カテゴリー || メンバー詳細? なら[2] or ブログ記事? なら[1]。それ以外は null。
  const slug =
    isCategoryPage || isMembersDetailPage || isSearchPage
      ? paths[2] // /blog/category/[slug] と /blog/members/[slug] の場合は paths[2] を使用
      : isBlogPage
        ? paths[1] // /blog/[slug] の場合は paths[1] を使用
        : null;

  // ブログ記事ページとカテゴリーページの両方で、スラッグを元にタイトルやカテゴリー名を取得するための状態
  // labeel:状態の名前。
  // setLabel:状態を更新する関数。
  // useState:状態を管理するためのフック。<string | null>は型指定。初期値はnull
  const [label, setLabel] = useState<string | null>(null);

  // ⬛︎ APIからタイトルやカテゴリー名を取得するタイトル取得ロジック
  useEffect(
    () => {
      // ブログ記事ページとカテゴリーページの両方で、スラッグを元にタイトルやカテゴリー名を取得するためのロジック(ぱんクズリスト末端の非リンク化のため)
      // ページャーまたは検索結果ページの場合は microCMS を叩かないようにする return を追加
      if (isPager || isSearchPage) return;
      // スラッグがない場合は処理を中断する return を追加
      if (!slug) return;

      // APIエンドポイントを決定するロジック
      // ブログ記事ページかカテゴリーページ、メンバー詳細ページの場合に、スラッグを元にタイトルやカテゴリー名を取得するためのエンドポイントを決定
      // 01:カテゴリー？の場合："categories"
      // 02:メンバー詳細？の場合："members"
      // 03:その他（ブログトップやメンバー一覧など）の場合："blog"
      const endpoint = isCategoryPage
        ? "categories"
        : isMembersDetailPage
          ? "members"
          : "blog";

      // microCMSのAPIクライアントを使用
      // .get()メソッドを使用
      // endpointとcontentIdを指定して、APIからデータを取得する。contentIdにはスラッグを指定することで、特定のコンテンツのデータを取得する
      const fetchLabel = async () => {
        try {
          const data = await client.get({
            endpoint: endpoint,
            contentId: slug,
          });
          // APIから取得したデータを処理する。isCategoryPageまたはisMembersDetailPageがtrueの場合はdata.nameを、そうでない場合はdata.titleをlabel状態にセットする
          const nextLabel =
            isCategoryPage || isMembersDetailPage ? data.name : data.title;
          setLabel(nextLabel);
        } catch (err) {
          // API からのデータ取得に失敗した場合は、エラーをコンソールに出力するロジック
          console.error("データが取得出来ませんでした:", err);
        }
      };
      fetchLabel();
    },
    // useEffect()では使用しているスコープ外の変数をすべて依存配列の中に格納する必要がある。
    // これにより、これらの値が変わるたびにuseEffect内の処理が再実行されるようになる
    [
      slug,
      isCategoryPage,
      isPager,
      isBlogPage,
      isMembersPage,
      isMembersDetailPage,
      isSearchPage,
    ],
  );

  // ⬛︎ ブレッドクラムのアイテムを動的に生成するロジック。
  // ブログトップページ、ページャー、カテゴリーページ、ブログ記事ページのそれぞれに応じて、適切なアイテムの配列を生成する

  // ⚪︎基本ロジック
  // 条件式を使用して、各ページタイプに応じたアイテムの配列を生成する。
  // isBlogTop ?[] : isPager ? [] : isCategoryPage ? [] :isMembersPage ? [] : []
  // 条件?真のときの値 : 条件?次の条件?真のときの値 : 条件?次の条件?真のときの値 : 最後の値

  // ブログトップページかどうかを判定するロジック。パスが "/blog" と完全に一致するかどうかを確認する
  const isBlogTop = pathname === "/blog";

  const items = isBlogTop
    ? // ブログトップページの場合は、HOME と BLOG & REPORT の2つのアイテムを生成する
      [{ label: "HOME", href: "/" }, { label: "BLOG & REPORT" }]
    : // ブログアーカイブ01〜
      isPager
      ? [
          { label: "HOME", href: "/" },
          { label: "BLOG & REPORT", href: "/blog" },
          { label: `論文記事一覧 ${paths[2]}` }, // ← ページ番号
        ]
      : // カテゴリーページ
        isCategoryPage
        ? [
            { label: "HOME", href: "/" },
            { label: "BLOG & REPORT", href: "/blog" },
            { label: `「${label ?? slug}」記事一覧` },
          ]
        : // 検索結果ページ
          isSearchPage
          ? [
              { label: "HOME", href: "/" },
              { label: "BLOG & REPORT", href: "/blog" },
              { label: `「${decodeURIComponent(slug ?? "")}」の検索結果一覧` },
            ]
          : // メンバー一覧ページ
            isMembersPage
            ? [
                { label: "HOME", href: "/" },
                { label: "BLOG & REPORT", href: "/blog" },
                { label: `投稿者一覧` },
              ] // メンバー詳細ページ
            : isMembersDetailPage
              ? [
                  { label: "HOME", href: "/" },
                  { label: "BLOG & REPORT", href: "/blog" },
                  { label: `投稿者一覧`, href: "/blog/members" },
                  { label: label ?? slug },
                ]
              : // ブログ記事ページ
                [
                  { label: "HOME", href: "/" },
                  { label: "BLOG & REPORT", href: "/blog" },
                  { label: label ?? slug },
                ];

  return (
    <section>
      <div className={styles.blog_navigation + " " + styles.blog_nav_top}>
        <ul className={styles.breadcrumb}>
          {items.map((item, i) => {
            // 配列の最後の要素かどうかを配列番号{i}で判定
            const isLast = i === items.length - 1;
            // isLast ?：リストの最後の要素はリンクにせず、テキストのみ表示するための条件分岐
            // key={i}：map()関数などで複数要素を生成する場合はkey属性を設定して各リストアイテムを一意に識別する
            return (
              <li key={i}>
                {/* ? 最後の配列ならテキストリンクなし:それ以外ならテキストリンクあり */}
                {isLast ? item.label : <a href={item.href}>{item.label}</a>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
