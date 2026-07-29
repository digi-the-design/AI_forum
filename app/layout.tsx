import "./globals.css";
import type { Metadata } from "next";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
// Metadata設定
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    // %s:個別ページのタイトル用パラメータ
    template: "%s | シンプルなコーポレートサイト",
    default: "シンプルなコーポレートサイト",
  },
  description:
    "「Next.js＋ヘッドレスCMSではじめる！ かんたん・モダンWebサイト制作入門」で作成されるサイトです。",
  openGraph: {
    title: "シンプルなコーポレートサイト",
    description:
      "「Next.js＋ヘッドレスCMSではじめる！ かんたん・モダンWebサイト制作入門」で作成されるサイトです。",
    images: ["/ogp.png"],
  },
  alternates: {
    canonical: "http://localhost:3000",
  },
};

//RootLayoutはNext.jsによってchildrenを自動的にpropsとして受け取る。
//React.ReactNodeとはどのような型でも受け取れる特殊な型でReactのデフォルト型定義に含まれている

//型別の書き方で説明：type Props = { children: React.ReactNode; }; export default function RootLayout({ children }: Props) {〜}

export default function name({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
