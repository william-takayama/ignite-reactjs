import Head from "next/head";
import Link from "next/link";
import React from "react";
import { PostsPageProps } from "../../../pages/posts";
import styles from "./styles.module.scss";

export function PostsPageComponent({ posts }: PostsPageProps) {
  return (
    <>
      <Head>
        <title>Posts | wst.news</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href="#">
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
