import BreadCrumb from "@/components/BreadCrumb";
import Layout from "@/components/Layout";
import CategoryList from "@/components/blog/CategoryList";
import CategoryPostList from "@/components/blog/CategoryPostList";
import ChoiceCategory from "@/components/blog/ChoiceCategory";
import PostList from "@/components/blog/PostList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import React, { useEffect, useState } from "react";

const index = ({ posts, filterPosts, choiceCt }) => {
  return (
    <Layout data={posts} choiceCt={choiceCt}>
      <CategoryPostList data={filterPosts}></CategoryPostList>
    </Layout>
  );
};

export default index;

export async function getStaticPaths() {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json",
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
  const dbs = await res.json();

  const paths = dbs.results.map((db) => ({
    params: { id: db.id, category: db.properties.category?.select?.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
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

  const postsCategory = posts?.map((post) => post.properties.category.select.name).filter((v, i, arr) => arr.indexOf(v) === i);

  const choiceCt = context.params.category;

  const filterPosts = posts.filter((v) => v.properties.category?.select?.name === context.params.category);

  return {
    props: { posts, postsCategory, filterPosts, choiceCt },
  };
}
