import Layout from "@/components/Layout";
import Markdown2Html from "@/components/Markdown2Html";
import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import { Client } from "@notionhq/client/build/src";
import { NotionToMarkdown } from "notion-to-md/build";
import React from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import remark from "remark";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import PostHeader from "@/components/blog/PostHeader";
import { useRouter } from "next/router";
import markdownToc from "markdown-toc";
import Link from "next/link";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";

const PostItem = ({ html_text, posts, toc }) => {
  console.log(toc);
  return (
    <Layout>
      <PostHeader data={posts}></PostHeader>
      <Toc>
        <TocTitle>✍🏻 Table Of Contents</TocTitle>
        <TocWrapper>
          {toc.json.map((t) => {
            return (
              <Link href={`#${t.slug}`} key={t.i} style={{ paddingLeft: t.lvl === 1 ? 0 : t.lvl * 10 }}>
                {t.content}
              </Link>
            );
          })}
        </TocWrapper>
      </Toc>
      <Markdown2Html html={html_text} />
    </Layout>
  );
};

export default PostItem;

const Toc = styled.div`
  padding: 2rem;
`;

const TocTitle = styled.h1`
  font-size: 20px;
  padding: 1rem 2rem;
  background-color: var(--toc-title-bgc);
  border-radius: 5px 5px 0 0;
`;

const TocWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  background-color: var(--toc-bgc);
  color: gray;
  border-radius: 0 0 5px 5px;
`;

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
    params: { id: db.id, title: db.properties.이름.title[0].plain_text.toString().toLowerCase().replace(/%20/g, "-") },
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

  const toc = markdownToc(mdString, {
    filter: (header, depth) => {
      return depth === 2 || depth === 3;
    },
    maxdepth: 3,
  });

  const html_text = unified()
    .use(markdown)
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
      "Notion-Version": "2022-02-22",
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

  const posts = await res.json();

  return {
    props: { html_text, posts, toc }, // will be passed to the page component as props
  };
}
