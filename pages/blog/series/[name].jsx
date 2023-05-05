import Layout from "@/components/common/Layout";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import { NextSeo } from "next-seo";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import PostList from "@/components/blog/PostList";
import SeriesPostsList from "@/components/blog/SeriesPostsList";

const SeriesItem = ({ selectPosts }) => {
  const title = selectPosts[0].properties.시리즈?.select?.name;

  return (
    <>
      <NextSeo
        title={`${title} | Hyunwoomemo`}
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
      <Layout headerTitle={title}>
        <SeriesPostsList posts={selectPosts}></SeriesPostsList>
      </Layout>
    </>
  );
};

export default SeriesItem;

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
      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);
  const dbs = await res.json();
  const filterDbs = dbs.results.filter((v) => v.properties.시리즈?.select?.name);

  const paths = filterDbs.map((db) => ({
    params: { name: db.properties.시리즈?.select?.name },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  if (!params) {
    return { props: { html_text: null, posts: null, toc: null } };
  }

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);

  const allPosts = await res.json();

  // 해당 컨텐츠
  const selectPosts = allPosts.results.filter((v) => v.properties.시리즈?.select?.name === params.name);

  return {
    props: { selectPosts }, // will be passed to the page component as props
  };
}
