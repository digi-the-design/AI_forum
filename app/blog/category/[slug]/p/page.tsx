import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  redirect(`/blog/category/${encodeURIComponent(resolvedParams.slug)}`);
}
