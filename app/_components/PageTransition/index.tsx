"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  // 現在のURLパス（例: /about や /posts/1）を取得
  const pathname = usePathname();
  // アニメーション中かどうかのフラグ（trueでエフェクト開始）
  const [isTransition, setIsTransition] = useState(false);

  // -------------------------------------------------------------
  // 1. リンククリック時にページ遷移アニメーションを開始するエフェクト
  // -------------------------------------------------------------
  useEffect(() => {
    const handleInternalLinkClick = (event: MouseEvent) => {
      const target = event.target;

      // クリックされた要素がHTML要素ではない場合は何もしない
      if (!(target instanceof Element)) {
        return;
      }

      // クリックされた要素、またはその親要素から一番近い <a> タグを探す
      const anchor = target.closest("a");
      if (!anchor) {
        return;
      }

      const link = anchor as HTMLAnchorElement;

      // 以下のケース（別タブで開く、メール、電話、ページ内アンカーリンク）は
      // 通常の画面遷移ではないため、アニメーションを発火させずに除外する
      if (
        link.target === "_blank" ||
        link.href.startsWith("mailto:") ||
        link.href.startsWith("tel:") ||
        link.href.startsWith("#")
      ) {
        return;
      }

      // クリックされたリンクの絶対URLを生成
      const nextUrl = new URL(link.href, window.location.href);

      // 外部サイトへのリンクの場合は除外する
      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      // 💡【重要：今回の原因箇所】
      // 移動先のパスが「現在のパス」と全く同じ場合は除外する
      // ※ただし [slug] 同士の移動（/posts/a から /posts/b）は pathname が変わるため、
      // ここではなく layout.tsx の再マウントの仕組み（Templateへの移行など）が必要になります
      if (nextUrl.pathname === pathname) {
        return;
      }

      // すべての条件をクリア（＝サイト内の別ページへの遷移）したらアニメーションを開始
      setIsTransition(true);
    };

    // ドキュメント全体にクリックイベントを登録
    document.addEventListener("click", handleInternalLinkClick);

    // クリーンアップ関数：コンポーネント消滅時やパス変更時に古いイベントを削除
    return () => {
      document.removeEventListener("click", handleInternalLinkClick);
    };
  }, [pathname]); // ページ（pathname）が変わるたびにイベントを登録し直す

  // -------------------------------------------------------------
  // 2. ページ遷移が完了した後に、アニメーションを終了（非表示に）するエフェクト
  // -------------------------------------------------------------
  useEffect(() => {
    // 実際にページ遷移が完了し、pathname が切り替わったらタイマーをスタート。
    // 1秒（1000ms）かけてフェードアウトなどの演出が終わるのを待ってから、フラグを false に戻す
    const timer = window.setTimeout(() => setIsTransition(false), 1000);

    // クリーンアップ関数：タイマーの重複やメモリリークを防ぐ
    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname]); // 💡ページが切り替わった瞬間（pathnameの変化）をトリガーにする

  // アニメーション用の目隠し（またはフェード用）の div 要素をレンダリング
  // isTransition が true の間だけ「active」クラスが付与される
  return <div className={`page-transition ${isTransition ? "active" : ""}`} />;
}
