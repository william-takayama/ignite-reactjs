import { GetStaticProps } from "next";
import { PostsPageComponent } from "../../components/PageComponents/Posts";
import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

export interface PostsPageProps {
  posts: Post[];
}

export default function PostsPage({ posts }: PostsPageProps) {
  return <PostsPageComponent posts={posts} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const prismicResponse = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    {
      fetch: ["post.title", "post.content"],
      pageSize: 100,
    }
  );

  const posts = prismicResponse.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find(
          (content: { type: string }) => content.type === "paragraph"
        )?.text ?? "",
      updatedAt: new Date(
        String(post.last_publication_date)
      ).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
