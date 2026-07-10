import { NextResponse, NextRequest } from "next/server";

// Next.js16.0Turbopackではmiddlewareがproxyとして動作するため、middlewareの代わりにこのproxyを使用してください
export function middleware(request: NextRequest) {
  // リクエストURLをログに出力することで、どのリクエストがプロキシされているかを確認
  console.log("middleware:" + request.url);
  // NextResponse.next()を返すことで、リクエストをそのまま次の処理に渡す
  return NextResponse.next();
}
// matcherで指定したパス(任意のページ、複数指定可能)に対してのみこのプロクシが適用されます
export const config = { matcher: "/api/:path*" };

