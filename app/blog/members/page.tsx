import { getMembersList } from "@/app/_libs/microcms";
//import authersIcon from "@/app/_components/authersIcon";
import Pagination from "@/app/_components/Pagination";
import MembersCard from "@/app/_components/MembersCard";
import BlogPageTitleH2 from "@/app/_components/BlogPageTitleH2";
import styles from "./page.module.css";

export const metadata = {
  title: "BLOG & REPORT | 投稿者一覧",
  description: "AIフォーラムの投稿者一覧ページです。",
};

export default async function Page({ params }) {
  // ページャーの現在のページ番号を取得
  const current = Number(params.current) || 1; // currentがundefinedの場合は1をデフォルト値として使用
  const { totalCount } = await getMembersList({
    limit: 10, //10件ずつ取得
    offset: 10 * (current - 1), // 10件 ×（ページ番号 - 1）＝ スキップする件数　0,10,20...
  });

  // 投稿者一覧を取得
  const { contents: members } = await getMembersList();
  return (
    <div className={styles.text_content}>
      <div
        className={`${styles.thumbnail_card} ${styles.thumbnail_card_blogtop}`}
      >
        <BlogPageTitleH2 text="投稿者一覧" />
        <div className={styles.container}>
          <ul
            className={`${styles.thumbnail_list} ${styles.thumbnail_list_blogtop}`}
          >
            {members.map((member) => (
                <MembersCard key={member.id} data={member} />
            ))}
          </ul>
        </div>
        <Pagination totalCount={totalCount} basePath="/blog/p" />
      </div>
    </div>
  );
}
