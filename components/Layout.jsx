import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "@emotion/styled";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Base>
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
`;

const Children = styled.div`
  @media (min-width: 1280px) {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
  }
`;

export default Layout;
