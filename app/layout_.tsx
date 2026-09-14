import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import ParticlesBackground from "./_components/Particles";
import ScrollTopButton from "./_components/ScrollTopButton";
import type { Metadata } from "next";
//import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
//RootLayoutはNext.jsによってchildrenを自動的にpropsとして受け取る。
//React.ReactNodeとはどのような型でも受け取れる特殊な型でReactのデフォルト型定義に含まれている

export const metadata: Metadata = {
  title: {
    default: "AI Forum",
    template: "%s | AI Forum",
  },
  description: "AI Forum は生成AIやテクノロジーをテーマにしたコミュニティです。",
  keywords: ["AI", "Forum", "生成AI", "テクノロジー"],
  openGraph: {
    title: "AI Forum",
    description: "AI Forum は生成AIやテクノロジーをテーマにしたコミュニティです。",
    siteName: "AI Forum",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Forum",
    description: "AI Forum は生成AIやテクノロジーをテーマにしたコミュニティです。",
  },
};

export const sourceHanSans = localFont({
  src: [
    {
      path: "../public/fonts/SourceHanSans-VF.woff2",
      weight: "100 900", // Variable Font の範囲
      style: "normal",
    },
  ],
  display: "swap",
});
//型別の書き方で説明：type Props = { children: React.ReactNode; }; export default function RootLayout({ children }: Props) {〜}
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${sourceHanSans.className}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/pjv4dxn.css" />
      </head>
      <body>
        <div id="page-marker" style={{ height: 0 }} />
        <ParticlesBackground />
        <Header />
        {/*<HeaderMenu />*/}
        {children}
        <ScrollTopButton />
        <Footer />
      </body>
    </html>
  );
}
