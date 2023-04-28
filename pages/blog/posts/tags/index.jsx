import Layout from "@/components/common/Layout";
import CategoryList from "@/components/blog/CategoryList";
import PostList from "@/components/blog/PostList";
import TagList from "@/components/blog/TagList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import React, { useEffect, useState } from "react";

const index = ({ posts, postsTag }) => {
  const uniqueTag = postsTag.filter((v, i, arr) => arr.indexOf(v) === i);
  return (
    <Layout data={posts}>
      <TagList data={uniqueTag} posts={posts} />
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

  const postsTag = posts?.map((post) => post.properties.tags.multi_select.map((v1) => v1.name)).flat();

  return {
    props: { posts, postsTag },
  };
}
