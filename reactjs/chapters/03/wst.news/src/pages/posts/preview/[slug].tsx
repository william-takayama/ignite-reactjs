import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession } from "next-auth/client";
import { RichText } from "prismic-dom";
import React from "react";
import { PostPageComponent } from "../../../components/PageComponents/Posts/PostPageComponent";
import { getPrismicClient } from "../../../services/prismic";

export interface PostPreviewPageProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewPageProps) {
  return <PostPageComponent type="preview" post={post} />;
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

// every page that is static is a page that is not protected
// then everyone has access to it
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;

  const prismic = getPrismicClient();

  const postResponse = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(postResponse.data.title),
    content: RichText.asHtml(postResponse.data.content.splice(0, 3)),
    updatedAt: new Date(
      String(postResponse.last_publication_date)
    ).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, // 30 minutes
  };
};
