import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import styled from "@emotion/styled";
import Footer from "./Footer";
import LoadingContext from "@/context/LoadingContext";

const Layout = ({ children }) => {
  const { loading } = useContext(LoadingContext);
  return (
    <Base loading={loading}>
      <Header />
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

  opacity: ${({ loading }) => (loading ? "0.5" : "1")};
`;

const Children = styled.div`
  @media (min-width: 1280px) {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
  }
`;

export default Layout;
