// ⬛︎ クライアントコンポーネント
// useSearchParamsを使用する為クライアントコンポーネントとして定義
"use client";
import Image from "next/image";
import styles from "./index.module.css";
// next.jsでクライアント側の画面遷移や履歴操作を行うためのフック
import { useRouter, useSearchParams } from "next/navigation";

// ⬛︎ 検索処理の流れ
// ①：フォーム送信からReactがhandleSubmit関数を呼び出す
// ②：handleSubmit(e)が実行される
// ③：e.currentTarget.elelments.namedItem("q")でinputの値を取得
// ④：URLSearchParams()でクエリパラメータを作成
// ⑤：router.push()で検索結果ページに遷移

// ⬛︎ SearchFieldComponent関数 (クライアントコンポーネント)
export default function SearchField() {
  // useRouterフックを定数に代入して、ルーターオブジェクトを取得
  const router = useRouter();
  // useSearchParamsフックを使用して、検索結果表示ページで現在の検索キーワード（?q=値）をキャッチする
  // useRouterフックをを定数に代入して、ルーターオブジェクトを取得
  const router = useRouter();
  // useSearchParamsフックを使用して、検索キーワード（現在のURLのクエリパラメータ）を取得
  const searchParams = useSearchParams();
  // ⬛︎ フォームの送信イベント処理関数
  // 引数eはReactのフォームの送信で、currentTargetがHTMLFormElement型であることを保証
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // フォームのデフォルトの送信動作をキャンセル
    e.preventDefault();
    // 定数qに、フォームinput要素からname:"q"の入力フィールドを取得
    // currentTargetはイベントが発生した要素を指す（form）
    const q = e.currentTarget.elements.namedItem("q");
    // qがHTMLInputElementであるかを確認（型安全のため）
    if (q instanceof HTMLInputElement) {
      const keyword = q.value.trim();
      if (keyword) {
        // ルーターオブジェクトのpushメソッドを使用して、指定されたURLに遷移
        router.push(`/blog/search/${encodeURIComponent(keyword)}`);
      }
    }
  };

  return (
    // ⬛︎ フォーム要素。onSubmitイベントにhandleSubmit関数を指定
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.search}>
          <Image
            src="/img/search.svg"
            alt="検索"
            width={16}
            height={16}
            loading="eager"
          />
          <input
            type="text"
            // 識別子を指定
            name="q"
            // 新しく生成されたURLに追加された?qの値を自動で入力欄にセットするためのプロパティ
            defaultValue={searchParams.get("q") ?? ""}
            placeholder="キーワードを入力"
            className={styles.searchInput}
          />
        </label>
      </form>
    </>
      // 定数paramsにインスタンス化したURLSearchParams()を代入し、クエリパラメータを設定
      const params = new URLSearchParams();
      // 定数paramsにset()メソッドで、クエリパラメータ"q"に、trim()された入力フィールドの値を設定
      params.set("q", q.value.trim());
      // ルーターオブジェクトのpushメソッドを使用して、指定されたURLに遷移
      router.push(`/news/search?${params.toString()}`);
    }
  };
  return (
    // ⬛︎ フォーム要素。onSubmitイベントにhandleSubmit関数を指定
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.search}>
        <Image
          src="/search.svg"
          alt="検索"
          width={16}
          height={16}
          loading="eager"
        />
        <input
          type="text"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="キーワードを入力"
          className={styles.searchInput}
        />
      </label>
    </form>
  );
}
