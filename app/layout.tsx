import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";
import ParticlesBackground from "@/app/_components/Particles";
import ScrollTopButton from "@/app/_components/ScrollTopButton";
import { Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";
import PageTransition from "@/app/_components/PageTransition";

export const revalidate = 0;

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

export const letterGothic = localFont({
  src: [
    {
      path: "../public/fonts/LetterGothicStd.otf",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${noto.className} ${letterGothic.className}`}>
      <body>
        <PageTransition />
        <div id="page-marker" style={{ height: 0 }} />
        <ParticlesBackground />
        <Header />
        {children}
        <ScrollTopButton />
        <Footer />
      </body>
    </html>
  );
}
