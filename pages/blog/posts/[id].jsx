import Layout from "@/components/common/Layout";
import Markdown2Html from "@/components/blog/Markdown2Html";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import { Client } from "@notionhq/client/build/src";
import { NotionToMarkdown } from "notion-to-md/build";
import React, { useEffect, useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import PostHeader from "@/components/blog/PostHeader";
import markdownToc from "markdown-toc";
import rehypeSlug from "rehype-slug";
import Toc from "@/components/blog/Toc";
import remarkGfm from "remark-gfm";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import SeriesInPosts from "@/components/blog/SeriesInPosts";

const PostItem = ({ html_text, posts, toc }) => {
  const router = useRouter();
  const filterPosts = posts.filter((v) => v.id === router.query.id);
  const title = filterPosts[0].properties.Name.title[0].plain_text;
  const img = filterPosts[0].cover?.file?.url || filterPosts[0].cover?.external.url;
  const [scrollTop, setScrollTop] = useState(0);
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    setScrollTop(document.documentElement.scrollTop);
  };

  useEffect(() => {
    if (typeof window !== "object") return;

    window.addEventListener("scroll", handleScroll);
    setOffset(document.documentElement.scrollHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setOffset]);

  // 해당 컨텐츠의 시리즈 네임
  const seriesName = filterPosts[0].properties?.시리즈?.select?.name !== undefined ? filterPosts[0].properties?.시리즈?.select?.name : null;

  // 가져온 시리즈의 포스트들
  const seriesPosts = posts.filter((v) => v.properties?.시리즈?.select?.name === seriesName);

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
              url: img || "https://user-images.githubusercontent.com/105469077/234896480-32d59948-f5fb-4232-823b-38bb12bb34d6.png",
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <Layout data={posts}>
        <PostHeader data={posts}></PostHeader>
        {seriesName ? <SeriesInPosts seriesName={seriesName} seriesPosts={seriesPosts}></SeriesInPosts> : undefined}
        {toc.json.length > 0 ? <Toc toc={toc}></Toc> : undefined}
        <Markdown2Html html={html_text} />
        <TopBtn active={scrollTop > offset * 0.3} onClick={() => scrollTo({ top: 0, behavior: "smooth" })}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </TopBtn>
      </Layout>
    </>
  );
};

const TopBtn = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  right: 15px;
  width: 40px;
  border-radius: 50%;
  padding: 10px;
  background-color: var(--text-color);
  color: var(--main-background);
  transition: all 0.3;
  svg {
    stroke: var(--main-background);
  }

  ${({ active }) =>
    active
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

export default PostItem;
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

  const paths = dbs.results.map((db) => ({
    params: { title: db.properties.Name.title[0].plain_text, id: db.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  if (!params) {
    return { props: { html_text: null, posts: null, toc: null } };
  }
  const notion = new Client({
    auth: TOKEN,
    notionVersion: "2022-06-28",
  });

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(params.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const toc = markdownToc(mdString, {
    filter: (header, depth) => {
      return depth === 2 || depth === 3;
    },
    maxdepth: 3,
  });

  const html_text = unified()
    .use(markdown)
    .use(remarkGfm)
    .use(require("unified-remark-prismjs"), {
      showLanguage: true, // show language tag
      enableCopy: true,
    })
    .use(remark2rehype)
    .use(rehypeSlug)
    .use(html)
    .processSync(mdString).value;

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

  return {
    props: { html_text, posts, toc }, // will be passed to the page component as props
  };
}
