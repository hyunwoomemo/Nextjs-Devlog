import Layout from "@/components/common/Layout";
import ChoiceCategory from "@/components/blog/ChoiceCategory";
import PostList from "@/components/blog/PostList";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";

const index = ({ posts, numPages, allPosts }) => {
  console.log(allPosts);
  return (
    <>
      <NextSeo
        title="Posts | Hyunwoomemo"
        description="프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다."
        openGraph={{
          type: "website",
          url: "https://hyunwoomemo.vercel.app/",
          title: "Hyunwoomemo's Devlog",
          description: "프론트엔드 개발자의 기술 블로그, 다양한 주제의 글로 새로운 지식을 기록합니다.",
          images: [
            {
              url: "https://user-images.githubusercontent.com/105469077/234896480-32d59948-f5fb-4232-823b-38bb12bb34d6.png",
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <Layout data={posts} allPosts={allPosts} headerTitle="Posts">
        <PostList allPosts={allPosts} firstPagePosts={posts} numPages={numPages} />
      </Layout>
    </>
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

  const data = await res.json();

  const allPosts = data.results.filter((v) => v.properties.미완료.checkbox !== true);

  const postsPerPage = 6;

  const numPages = Math.ceil(allPosts.length / postsPerPage);

  const posts = allPosts.slice(0, postsPerPage);

  return {
    props: { allPosts, posts, numPages },
  };
}
