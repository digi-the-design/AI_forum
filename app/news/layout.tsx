import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

//共通Reactの型定義
type Props = {
  children: React.ReactNode;
};
// ⬛︎ ページを動的：SSR（Server Side Rendering）に変更してmicroCMS即時反映（キャッシュなし）
// export const revalidate = 0;

// ⬛︎ ページを動的：ISR（Incremental Static Regeneration）に変更してmicroCMS反映遅延60秒（キャッシュあり）
export const revalidate = 60;

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}
