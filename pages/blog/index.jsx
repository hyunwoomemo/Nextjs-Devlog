import Layout from "@/components/Layout";
import ChoiceCategory from "@/components/blog/ChoiceCategory";
import PostList from "@/components/blog/PostList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const index = ({ posts }) => {
  return (
    <Layout data={posts}>
      <ChoiceCategory />
      <PostList data={posts} />
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

  const posts = await res.json();

  const postsName = posts.results?.map((post) => post.properties.이름.title[0].plain_text);

  console.log(`postsName : ${postsName}`);

  return {
    props: { posts },
  };
}
