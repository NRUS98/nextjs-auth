import { TPost } from "@/definitions/posts";
import styles from "./page.module.scss";
import { firstLetterUpperCase } from "@/utils/string";
import Link from "@/components/Link";
import { api } from "@/api";

export default async function Posts() {
  const posts: TPost[] = await api.getPosts();

  return (
    <div className={styles.main}>
      {posts.map(post => (
        <Link href={`/posts/${post.id}`} key={post.id} className={styles.link}>
          {firstLetterUpperCase(post.title)}
        </Link>
      ))}
    </div>
  );
}
