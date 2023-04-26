import Layout from "@/components/Layout";
import ChoiceCategory from "@/components/blog/ChoiceCategory";
import PostList from "@/components/blog/PostList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const index = ({ posts, numPages }) => {
  return (
    <Layout data={posts}>
      <PostList data={posts} numPages={numPages} />
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
  const filterPosts = allPosts.results.filter((v) => v.properties.project.checkbox !== true);

  const postsPerPage = 6;

  const numPages = Math.ceil(filterPosts.length / postsPerPage);

  const posts = filterPosts.slice(0, postsPerPage);

  return {
    props: { allPosts, posts, numPages },
  };
}
