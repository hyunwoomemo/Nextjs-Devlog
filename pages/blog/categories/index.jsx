import Layout from "@/components/Layout";
import CategoryList from "@/components/blog/CategoryList";
import PostList from "@/components/blog/PostList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import React, { useEffect, useState } from "react";

const index = ({ posts, postsCategory }) => {
  return (
    <Layout data={posts}>
      <CategoryList data={postsCategory} />
    </Layout>
  );
};

export default index;

export async function getStaticProps() {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts: [
        {
          property: "createdDate",
          direction: "descending",
        },
      ],

      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);

  const allPosts = await res.json();

  const posts = allPosts.results;

  const postsCategory = posts.results?.map((post) => post.properties.category.select.name).filter((v, i, arr) => arr.indexOf(v) === i);

  return {
    props: { posts, postsCategory },
  };
}
