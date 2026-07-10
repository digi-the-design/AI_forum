// middleware.tsインポートすることで、Basic認証を有効にすることができます
import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

// Basic認証のユーザー名とパスワードを設定します
export const middleware = createNextAuthMiddleware();

// matcherで指定したパス(任意のページ、複数指定可能)に対してのみこのプロクシが適用されます
export const config = { matcher: ["/news", "/news/:path*"] };
