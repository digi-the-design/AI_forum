import type { News } from "@/app/_libs/microcms";
import Link from "next/link";
import MembersIcon from "@/app/_components/MembersIcon";
import { formatDate } from "@/app/_libs/utils";
import styles from "./index.module.css";

type Props = {
  members?: News["members"];
  publishedAt?: string;
};

export default function MemberIconName({ members, publishedAt }: Props) {
  if (!members) return null;

  return (
    <div className={styles.caption}>
      <Link href={`/blog/members/${members.slug}`}>
        <MembersIcon src={members.image?.url} size={30} />
        <p className={styles.author_name}>{members.name}</p>{" "}
      </Link>
      {publishedAt ? (
        <p className={styles.blog_date}>{formatDate(publishedAt)}</p>
      ) : null}
    </div>
  );
}
