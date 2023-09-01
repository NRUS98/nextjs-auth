import { TPost } from "@/definitions/posts";
import styles from "./page.module.scss";
import { ROUTES } from "@/constants/routes";
import Link from "@/components/Link";
import { api } from "@/api";

export async function generateStaticParams() {
  const posts: TPost[] = await api.getPosts();

  return posts.map(post => ({
    slug: post.id
  }));
}

export default async function Post({ params }: { params: { id: string } }) {
  const post: TPost = await api.getPost(params.id);

  return (
    <div className={styles.main}>
      <Link href={ROUTES.POSTS}>Go back</Link>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.description}>{post.body}</p>
    </div>
  );
}
