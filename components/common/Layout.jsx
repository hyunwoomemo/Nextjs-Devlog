import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import styled from "@emotion/styled";
import Footer from "./Footer";
import LoadingContext from "@/context/LoadingContext";
import SearchContext from "@/context/SearchContext";

const Layout = ({ children, data, choiceCt, posts, headerTitle, allPosts }) => {
  const { loading } = useContext(LoadingContext);
  const { search } = useContext(SearchContext);
  console.log(posts);
  return (
    <Base loading={loading.toString()} search={search}>
      <Header data={data} allPosts={allPosts} choiceCt={choiceCt} posts={posts} headerTitle={headerTitle} />
      <Children>{children}</Children>
      <Footer />
    </Base>
  );
};

const Base = styled.div`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  scroll-margin-top: 5rem;
  opacity: ${({ loading, search }) => (loading === "true" ? "0.5" : search ? "0.2" : "1")};
  transform: ${({ search }) => (search ? "scale(0.9)" : "scale(1)")};
  transition: all 0.3s;
  position: relative;
`;

const Children = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

export default Layout;
