import { POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from "@/config";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import React, { useEffect, useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import Layout from "@/components/common/Layout";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Markdown2Html from "@/components/blog/Markdown2Html";
import ProjectPostList from "@/components/projects/ProjectPostList";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import ProjectMarkdown2Html from "@/components/projects/ProjectMarkdown2Html";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Link from "next/link";
import { NextSeo } from "next-seo";
import fs from "fs";
import path from "path";

const ProjectItem = ({ html_text, posts, title, projectData, projectId, readme }) => {
  const router = useRouter();

  const github = projectData.results?.filter((v) => v.id === router.query.id)[0].properties.Github.rich_text[0]?.href;

  const [action, setAction] = useState(false);
  const [showPost, setShowPost] = useState(false);

  const handleAction = (e) => {
    setAction(!action);
  };

  const handlePostAction = (e) => {
    e.stopPropagation();
    setAction(false);
    setShowPost(true);
  };
  const handlePageAction = (e) => {
    e.stopPropagation();
  };
  const handleGitAction = (e) => {
    e.stopPropagation();
  };

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
      <Container>
        <Layout headerTitle={title}>
          <Base>
            <ProjectMarkdown2Html html={readme}></ProjectMarkdown2Html>
            <ActionBtn onClick={(e) => handleAction(e)}>
              {!action ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path
                    fill-rule="evenodd"
                    d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <ActionItem action={action} onClick={handlePostAction}>
                포스트
              </ActionItem>
              <ActionItem action={action} onClick={handlePageAction}>
                서비스
                <br /> 페이지
              </ActionItem>
              <ActionItem action={action} onClick={handleGitAction}>
                {github ? (
                  <Link href={github} target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="github">
                      <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
                    </svg>
                  </Link>
                ) : (
                  <div onClick={() => alert("아직 github 저장소가 준비되어 있지 않습니다. 😂")}>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="github">
                      <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
                    </svg>
                  </div>
                )}
              </ActionItem>
            </ActionBtn>
          </Base>
          <ProjectPostList closeEvent={() => setShowPost(false)} active={showPost} data={posts} title={title} />
        </Layout>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  max-height: 100vh;
  overflow-x: hidden;
`;

const Base = styled.div``;

const ActionBtn = styled.div`
  position: fixed;
  width: 70px;
  height: 70px;
  bottom: 25px;
  right: 25px;
  padding: 10px;
  z-index: 10;
  background-color: var(--text-color);
  color: var(--main-background);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ActionItem = styled.div`
  position: absolute;
  background-color: var(--text-color);
  color: var(--main-background);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: all 0.3s;
  padding: 1rem;
  border-radius: 50%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  line-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 16px;
  }

  &:first-of-type {
    transform: ${({ action }) => (action ? "translate(-50%, -200%) scale(1)" : undefined)};
    opacity: ${({ action }) => (action ? "1" : "0")};
  }

  &:nth-of-type(2) {
    transform: ${({ action }) => (action ? "translate(-160%, -300%) scale(1)" : undefined)};
    opacity: ${({ action }) => (action ? "1" : "0")};
  }

  &:last-of-type {
    transform: ${({ action }) => (action ? "translate(-200%, -100%) scale(1)" : undefined)};
    opacity: ${({ action }) => (action ? "1" : "0")};
    padding: 0;
    svg {
      width: 100%;
      > path {
        fill: var(--main-background);
      }
    }
  }
`;

export default ProjectItem;

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
          property: "Name",
          direction: "ascending",
        },
      ],
      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);
  const dbs = await res.json();

  const paths = dbs.results.map((db) => ({
    params: { id: db.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
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

  const postRes = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);

  const posts = await postRes.json();

  const projectRes = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);

  const projectData = await projectRes.json();

  const title = projectData.results.filter((v) => v.id === params.id)[0].properties.Name.title[0].plain_text;
  const readmeName = projectData.results.filter((v) => v.id === params.id)[0].properties.readmeName?.rich_text[0]?.plain_text;

  const filePath = path.join(process.cwd(), `readme/${readmeName}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const readme = await unified().use(markdown).use(remarkGfm).use(remark2rehype).use(html).processSync(fileContents).value;

  return {
    props: {
      posts,
      title,
      projectData,
      readme,
    }, // will be passed to the page component as props
  };
}
