import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

//共通Reactの型定義
type Props = {
  children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
  return (
    <>
      <Hero title="News" sub="ニュース" />
      <Sheet>{children}</Sheet>
    </>
  );
}
