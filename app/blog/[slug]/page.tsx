
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import styles from "./page.module.css";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ dk?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { dk } = await searchParams;
  const data = await getBlogDetail(slug, { draftKey: dk }).catch(notFound);

  return {
    title: `BLOG & REPORT | ${data.title}`,
    description: `BLOG & REPORT | ${data.description}`,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { dk } = await searchParams;
  const data = await getBlogDetail(slug, { draftKey: dk }).catch(notFound);
  return <Article data={data} />;
}
