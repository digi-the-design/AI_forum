import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

export const middleware = createNextAuthMiddleware();

// matcherで指定したパス(任意のページ、複数指定可能)に対してのみこのプロクシが適用されます
export const config = { matcher: ["/news/:path*"] };
