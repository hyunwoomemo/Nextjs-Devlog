import { PROJECT_DATABASE_ID, TOKEN } from "@/config";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import React from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import styled from "@emotion/styled";
import Layout from "@/components/Layout";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Markdown2Html from "@/components/Markdown2Html";

const ProjectItem = ({ html_text }) => {
  console.log(html_text);
  return (
    <Layout>
      <Markdown2Html html={html_text}></Markdown2Html>
    </Layout>
  );
};

export default ProjectItem;

const Markdown = styled.div``;

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
  const notion = new Client({
    auth: TOKEN,
    notionVersion: "2022-06-28",
  });

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(params.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  const html_text = unified()
    .use(markdown)
    .use(require("unified-remark-prismjs"), {
      showLanguage: true, // show language tag
      enableCopy: true,
      plugins: ["autolinker", "show-invisibles", "data-uri-highlight", "diff-highlight", "inline-color", "line-numbers", "command-line", "treeview"],
    })
    .use(remark2rehype)
    .use(html)
    .processSync(mdString).value;

  return {
    props: { html_text }, // will be passed to the page component as props
  };
}
