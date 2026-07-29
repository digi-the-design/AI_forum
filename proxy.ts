import { NextRequest } from "next/server";
import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

// Basic認証用のハンドラー関数を生成
const authHandler = createNextAuthMiddleware();

/**
 * Next.js 16 仕様のプロキシ関数
 *
 * 【注意】Next.js 16以降、従来の `middleware.ts` 構文は非推奨となり、
 * ファイル名を `proxy.ts`、関数名を `proxy` に変更することが必須となりました。
 * 必ずこのように `export function proxy` の形式で関数を明示する必要があります。
 */
export function proxy(request: NextRequest) {
  // エラーチェック用コンソール
  console.log("PROXY HIT:", request.nextUrl.pathname);
  // 💡 【重要】authHandler の実行結果を必ず「return」してNext.jsに返却してください。
  // return を忘れると、認証エラー（401 Unauthorized）のレスポンスがブラウザに伝わらず、
  // Basic認証のポップアップが出ずに処理が素通りしてしまいます。
  return authHandler(request);
}

/**
 * プロキシを適用するルーティングの設定
 *
 * 指定したパス（ここでは /news とその配下のすべてのページ）に
 * アクセスがあった場合のみ、上記の Basic認証（proxy関数）が実行されます。
 */
export const config = {
  matcher: [
    "/news",
    "/news/:path*",
    // ② 以下の設定を追加（トップページや静的ファイル、Next.jsの内部ファイルを絶対に除外する）
    // "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$).*)",
  ],
};
