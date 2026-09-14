import { redirect } from "next/navigation";
// 検索結果ページのURLにリダイレクトするためのコンポーネント
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
// 検索結果ページのURLにリダイレクトする
  redirect(`/blog/search/${encodeURIComponent(slug)}`);
}
