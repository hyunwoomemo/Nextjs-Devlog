import { PROJECT_DATABASE_ID, TOKEN } from "@/config";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import React from "react";
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

const ProjectItem = ({ child_db, blockId, html_text }) => {
  return (
    <Layout>
      <ProjectMarkdown2Html html={html_text} />
    </Layout>
  );
};

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

  const blockId = params.id;
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  const childDbID = response.results.filter((v) => v.type === "child_database")[0]?.id;

  const res = await fetch(`https://api.notion.com/v1/databases/${childDbID}/query`, options);

  const child_db = await res.json();

  return {
    props: {
      child_db,
      blockId,
      response,
      html_text,
    }, // will be passed to the page component as props
  };
}
