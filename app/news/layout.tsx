import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

//共通Reactの型定義
type Props = {
  children: React.ReactNode;
};

// ⬛︎ News配下のページ共通でキャッシュを60秒間有効にする設定を追加。これにより、ページの表示速度を向上させつつ、最新のデータを取得できるようになる
// SSR（Server Side Rendering）に変更してmicroCMS即時反映（キャッシュなし）
// export const revalidate = 0;
// ISR（Incremental Static Regeneration）に変更してmicroCMS反映遅延60秒（キャッシュあり）
export const revalidate = 60;

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}
