import Layout from "@/components/Layout";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const index = () => {
  return (
    <Layout>
      <Wrapper>
        <MenuItem href="/blog/posts">Posts</MenuItem>
        <MenuItem href="blog/codesnipet">Code Snipet</MenuItem>
      </Wrapper>
    </Layout>
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
