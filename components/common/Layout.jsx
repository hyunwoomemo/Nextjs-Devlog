import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import styled from "@emotion/styled";
import Footer from "./Footer";
import LoadingContext from "@/context/LoadingContext";
import SearchContext from "@/context/SearchContext";
import { useRouter } from "next/router";

const Layout = ({ children, data, headerTitle, allPosts }) => {
  const { loading } = useContext(LoadingContext);
  const { search } = useContext(SearchContext);

  const router = useRouter();

  return (
    <Base loading={loading.toString()} search={search}>
      <Header data={data} allPosts={allPosts} headerTitle={headerTitle} />
      <Children>{children}</Children>
      <Footer />
    </Base>
  );
};

const Base = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  scroll-margin-top: 5rem;
  opacity: ${({ loading, search }) => (loading === "true" ? "0.5" : search ? "0.2" : "1")};
  /* transform: ${({ search }) => (search ? "scale(0.9)" : "scale(1)")}; */
  transition: all 0.3s;
  position: relative;
`;

const Children = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

export default Layout;
