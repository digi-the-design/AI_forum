// ⬛︎ サーバーコンポーネント
// 非同期コンポーネントの読み込みを待機するために使用
import { Suspense } from "react";
// 検索フィールドのコンポーネントをインポート
import SearchFieldComponent from "./SearchFieldComponent";

// ⬛︎ Suspenseコンポーネントで非同期コンポーネントの読み込みを待機
export default function SearchField() {
  return (
    // サーバーコンポーネントとクライアントコンポーネントを分割して、初期ロードのパフォーマンスを向上させる
    <Suspense>
      {/* SearchFieldComponent関数 非同期コンポーネント(クライアントコンポーネント) */}
      <SearchFieldComponent />
    </Suspense>
  );
}
