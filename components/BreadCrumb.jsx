import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BreadCrumb = ({ postsCategory }) => {
  const router = useRouter();
  console.log(postsCategory);

  return (
    <Base style={{ display: router.pathname === "/" ? "none" : "block" }}>
      <BreadCrumbWrapper>
        <BreadCrumbItem href="/">home</BreadCrumbItem>
        <BreadCrumbItem href={router.pathname}>{router.pathname.replace("/", "")}</BreadCrumbItem>
        <BreadCrumbItem href="/blog">{router.pathname.replace("/", "")}</BreadCrumbItem>
      </BreadCrumbWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

const BreadCrumbWrapper = styled.ul`
  display: flex;
  gap: 1rem;
`;

const BreadCrumbItem = styled(Link)`
  &:after {
    content: "/";
    margin-left: 1rem;
  }

  &:last-of-type:after {
    content: "";
  }
`;

export default BreadCrumb;

export async function getStaticProps() {
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
          property: "category.select.name",
          direction: "descending",
        },
      ],

      page_size: 100,
    }),
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${POST_DATABASE_ID}/query`, options);

  const posts = await res.json();

  const postsCategory = posts.results?.map((post) => post.properties.category.select.name);

  return {
    props: { postsCategory },
  };
}
