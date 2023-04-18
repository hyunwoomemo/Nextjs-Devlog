import Layout from "@/components/Layout";
import Markdown2Html from "@/components/Markdown2Html";
import { POST_DATABASE_ID, PROJECT_DATABASE_ID, TOKEN } from "@/config";
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
import Toc from "@/components/Toc";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/router";
import ProjectPostHeader from "@/components/projects/ProjectPostHeader";

const ProjectDetailItem = ({ html_text, posts, toc }) => {
  const router = useRouter();
  console.log(posts);
  console.log(router.query.detail);
  return (
    <Layout>
      <ProjectPostHeader data={posts}></ProjectPostHeader>
      {toc.json.length > 0 ? <Toc toc={toc}></Toc> : undefined}
      <Markdown2Html html={html_text} />
    </Layout>
  );
};

export default ProjectDetailItem;

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

  const res = await fetch(`https://api.notion.com/v1/blocks/${PROJECT_DATABASE_ID}/children`, options);
  const dbs = await res.json();

  fetch("https://api.notion.com/v1/blocks/block_id/children?page_size=100", options);

  const paths = dbs.results.map((db) => ({
    params: { id: db.id, detail: fetch(`https://api.notion.com/v1/blocks/${db.id}/children`, options).results.filter((v) => v.type === "child_database")[0].id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  console.log(context.params.detail);
  if (!context.params) {
    return { props: { html_text: null, posts: null, toc: null } };
  }
  const notion = new Client({
    auth: TOKEN,
    notionVersion: "2022-06-28",
  });

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdblocks = await n2m.pageToMarkdown(context.params.detail);
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
      plugins: ["autolinker", "show-invisibles", "data-uri-highlight", "diff-highlight", "inline-color", "line-numbers", "command-line", "treeview"],
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
      page_size: 100,
    }),
  };

  const blockId = context.params.id;
  const response = await notion.blocks.children.list({
    block_id: blockId,
  });

  const childDbID = response.results.filter((v) => v.type === "child_database")[0].id;

  const res = await fetch(`https://api.notion.com/v1/databases/${childDbID}/query`, options);

  const posts = await res.json();

  return {
    props: { html_text, posts, toc }, // will be passed to the page component as props
  };
}
