import Layout from "@/components/Layout";
import CodeSnipetList from "@/components/blog/CodeSnipetList";
import { CODESNIPET_DATABASE_ID, TOKEN } from "@/config";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React, { useState } from "react";

const Home = ({ posts }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const keywordLength = posts?.filter(
    (v) => v.properties.Name.title[0].plain_text.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || v.properties.Tag.multi_select.map((v) => v.name.toLowerCase()).includes(keyword.toLowerCase())
  );

  return (
    <Layout>
      <Base>
        <Title>나의 코드 조각들</Title>
        <ImageWrapper active={keywordLength.length > 0 && keyword}>
          <Image
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            width={100}
            height={100}
            quality={100}
            layout="responsive"
            alt="cover"
          />
          {keywordLength.length > 0 && keyword ? <Text>{`${keywordLength.length}개`}</Text> : undefined}
        </ImageWrapper>
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

const ImageWrapper = styled.div`
  height: 150px;
  overflow: hidden;
  margin: 1rem 0;
  border-radius: 10px;
  position: relative;

  > img {
    opacity: ${({ active }) => (active ? "0.5" : undefined)};
  }
`;

const Text = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;

  background-color: var(--main-background);
  color: var(--text-color);
  padding: 10px 14px;
  border-radius: 5px;
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
