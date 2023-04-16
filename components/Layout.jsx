import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import styled from "@emotion/styled";
import Footer from "./Footer";
import LoadingContext from "@/context/LoadingContext";
import BreadCrumb from "./BreadCrumb";

const Layout = ({ children, data }) => {
  const { loading } = useContext(LoadingContext);
  return (
    <Base loading={loading.toString()}>
      <Header data={data} />
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
  opacity: ${({ loading }) => (loading === "true" ? "0.5" : "1")};
`;

const Children = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

export default Layout;
