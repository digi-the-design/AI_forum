import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import ParticlesBackground from "@/app/_components/Particles";
import ScrollTopButton from "@/app/_components/ScrollTopButton";
import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import PageTransition from "@/app/_components/PageTransition";
=======
// GA
import { GoogleAnalytics } from "@next/third-parties/google";
//import { GoogleTagManager } from "@next/third-parties/google";
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

>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
//RootLayoutはNext.jsによってchildrenを自動的にpropsとして受け取る。
//React.ReactNodeとはどのような型でも受け取れる特殊な型でReactのデフォルト型定義に含まれている
export const letterGothic = localFont({
  src: [
    {
      path: "../public/fonts/LetterGothicStd.otf",
      weight: "100 900", // Variable Font の範囲
      style: "normal",
    },
  ],
  display: "swap",
});
//型別の書き方で説明：type Props = { children: React.ReactNode; }; export default function RootLayout({ children }: Props) {〜}
const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "AI Forum",
    template: "%s",
  },
  description:
    "AI Forum は、最新のAI情報や技術、議論を共有するコミュニティサイトです。",
  keywords: ["AI", "人工知能", "技術情報", "フォーラム"],
  authors: [{ name: "AI Forum" }],
  openGraph: {
    title: "AI Forum",
    description:
      "AI Forum は、最新のAI情報や技術、議論を共有するコミュニティサイトです。",
    siteName: "AI Forum",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Forum",
    description:
      "AI Forum は、最新のAI情報や技術、議論を共有するコミュニティサイトです。",
  },
};

export default function name({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<<<<<<< HEAD
    <html lang="ja" className={`${noto.className} ${letterGothic.className}`}>
=======
    <html lang="en">
      {/* gtmId追加 
      <GoogleTagManager gtmId="GTM-5PZMCGPF" />*/}
>>>>>>> 40c3be1403b976f1fb3415aeb900f6c88a98bf4a
      <body>
        <PageTransition />
        <div id="page-marker" style={{ height: 0 }} />
        <ParticlesBackground />
        <Header />
        {/*<HeaderMenu />*/}
        {children}
        <ScrollTopButton />
        <Footer />
      </body>
      {/* gaId追加 */}
      <GoogleAnalytics gaId="G-90W0C3VPJE" />
    </html>
  );
}
