import Layout from "@/components/Layout";
import CodeSnipetList from "@/components/blog/CodeSnipetList";
import { CODESNIPET_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import React, { useState } from "react";

const Home = ({ posts }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Layout>
      <Base>
        <Title>코드 조각들</Title>
        <Search placeholder="검색어를 입력하세요" onChange={handleSearch}></Search>
        <CodeSnipetList data={posts} keyword={keyword} />
      </Base>
    </Layout>
  );
};

export default Home;

const Base = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 20px;
`;

const Search = styled.input`
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;
  color: var(--text-color);
  font-size: 18px;

  background-color: var(--tag-background);
  border: 0;

  &::placeholder {
    color: var(--text-color);
    opacity: 0.5;
  }
`;

export async function getStaticProps() {
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

  const res = await fetch(`https://api.notion.com/v1/databases/${CODESNIPET_DATABASE_ID}/query`, options);

  const data = await res.json();

  const posts = data.results;

  return {
    props: { posts },
  };
}
