import Layout from "@/components/common/Layout";
import styled from "@emotion/styled";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <>
      <NextSeo
        title="Blog | Hyunwoomemo"
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
      <Layout>
        <Wrapper>
          <MenuItem href="/blog/posts">Posts</MenuItem>
          <MenuItem href="blog/codesnipet">Code Snipet</MenuItem>
        </Wrapper>
      </Layout>
    </>
  );
};

export default index;

const Wrapper = styled.ul`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MenuItem = styled(Link)`
  width: 100%;
  background-color: var(--tag-background);
  border-radius: 10px;
  padding: 2rem;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
