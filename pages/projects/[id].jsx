import { POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from "@/config";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import React, { useEffect, useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import Layout from "@/components/Layout";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Markdown2Html from "@/components/Markdown2Html";
import ProjectPostList from "@/components/projects/ProjectPostList";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import ProjectMarkdown2Html from "@/components/projects/ProjectMarkdown2Html";
import styled from "@emotion/styled";

const ProjectItem = ({ html_text, posts, title }) => {
  console.log(title);
  const [action, setAction] = useState(false);
  const [showPost, setShowPost] = useState(false);

  const handleAction = (e) => {
    setAction(!action);
  };

  const handlePostAction = (e) => {
    e.stopPropagation();
    setShowPost(true);
  };
  const handlePageAction = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setAction(true);
    setTimeout(() => {
      setAction(false);
    }, 1000);
  }, []);

  return (
    <Container>
      <Layout headerTitle={title}>
        <Base>
          <ProjectMarkdown2Html html={html_text} />
          <ActionBtn onClick={(e) => handleAction(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path
                fill-rule="evenodd"
                d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z"
                clip-rule="evenodd"
              />
            </svg>
            <ActionItem action={action} onClick={handlePostAction}>
              포스트
            </ActionItem>
            <ActionItem action={action} onClick={handlePageAction}>
              서비스
              <br /> 페이지
            </ActionItem>
          </ActionBtn>
        </Base>
      </Layout>
      <ProjectPostList closeEvent={() => setShowPost(false)} active={showPost} data={posts} title={title} />
    </Container>
  );
};

const Container = styled.div`
  max-height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Base = styled.div``;

const ActionBtn = styled.div`
  position: absolute;
  width: 70px;
  bottom: 25px;
  right: 25px;
  padding: 10px;
  background-color: var(--text-color);
  color: var(--main-background);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 50px;
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

  &:last-of-type {
    transform: ${({ action }) => (action ? "translate(-200%, -100%) scale(1)" : undefined)};
    opacity: ${({ action }) => (action ? "1" : "0")};
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
  const { Client } = require("@notionhq/client");

  const notion = new Client({
    auth: TOKEN,
    notionVersion: "2022-06-28",
  });

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(params.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const html_text = unified()
    .use(markdown)
    .use(remarkGfm)
    .use(require("unified-remark-prismjs"), {
      showLanguage: true, // show language tag
      enableCopy: true,
    })
    .use(remark2rehype)
    .use(html)
    .processSync(mdString).value;

  const postRes = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);

  const posts = await postRes.json();

  const projectRes = await fetch(`https://api.notion.com/v1/databases/${PROJECT_DATABASE_ID}/query`, options);

  const projectData = await projectRes.json();

  const title = projectData.results.filter((v) => v.id === params.id)[0].properties.Name.title[0].plain_text;

  return {
    props: {
      html_text,
      posts,
      title,
    }, // will be passed to the page component as props
  };
}
