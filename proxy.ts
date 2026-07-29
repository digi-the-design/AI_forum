import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // 1. 環境変数からユーザー名とパスワードを取得 (なければデフォルト値)
  // 💡 Vercelの「Environment Variables」に設定している値、または直接ここに文字を書いてもOKです
  const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || "your_username";
  const BASIC_AUTH_PASSWORD =
    process.env.BASIC_AUTH_PASSWORD || "your_password";

  // 2. リクエストヘッダーからブラウザの入力情報を取得
  const authHeader = request.headers.get("authorization");

  if (authHeader) {
    // Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ= の形式から文字を抜き出す
    const authValue = authHeader.split(" ")[1];
    const [user, password] = Buffer.from(authValue, "base64")
      .toString()
      .split(":");

    // ユーザー名とパスワードが一致した場合は、認証をスルーしてページを表示
    if (user === BASIC_AUTH_USER && password === BASIC_AUTH_PASSWORD) {
      return NextResponse.next();
    }
  }

  // 3. 一致しない、または未入力の場合は「401 Unauthorized（認証画面）」をブラウザに返却
  return new NextResponse("Authentication Required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// 💡 /news とその配下だけを厳格に対象に指定
export const config = {
  matcher: ["/news", "/news/:path*"],
};
