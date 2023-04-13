import Layout from "@/components/Layout";
import PostList from "@/components/blog/PostList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import React from "react";

const index = ({ posts }) => {
  return (
    <Layout>
      <PostList data={posts} />
    </Layout>
  );
};

export default index;

export async function getServerSideProps() {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-02-22",
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

  const posts = await res.json();

  const postsName = posts.results?.map((post) => post.properties.이름.title[0].plain_text);

  console.log(`postsName : ${postsName}`);

  return {
    props: { posts },
  };
}
