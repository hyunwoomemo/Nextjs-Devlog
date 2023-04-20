import Layout from "@/components/Layout";
import Markdown2Html from "@/components/Markdown2Html";
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
import Toc from "@/components/Toc";
import remarkGfm from "remark-gfm";

const PostItem = ({ html_text, posts, toc }) => {
  return (
    <Layout data={posts}>
      <PostHeader data={posts}></PostHeader>
      {toc.json.length > 0 ? <Toc toc={toc}></Toc> : undefined}
      <Markdown2Html html={html_text} />
    </Layout>
  );
};

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
    params: { title: db.properties.이름.title[0].plain_text, id: db.id },
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
