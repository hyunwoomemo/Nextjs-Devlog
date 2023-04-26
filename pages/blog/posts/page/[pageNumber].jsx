import Layout from "@/components/Layout";
import PostList from "@/components/blog/PostList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import React from "react";

const Page = ({ posts, numPages, filterPosts }) => {
  console.log(filterPosts);
  return (
    <Layout data={posts}>
      <PostList data={posts} numPages={numPages} />
    </Layout>
  );
};

export default Page;

// getStaticPath() 로 page+1 static 파일 생성

// getStaticProps로 데이터 Page에 넘겨주고 Page에서는 데이터 받아와서렌더링

export async function getStaticPaths() {
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

  const postsPerPage = 6;

  const numPages = Math.ceil(allPosts.results.length / postsPerPage);

  const paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({ params: { pageNumber: i.toString() } });
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
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

  const offset = (params.pageNumber - 1) * postsPerPage;

  const posts = filterPosts.slice(offset, offset + postsPerPage);

  return {
    props: { filterPosts, posts, numPages },
  };
}
