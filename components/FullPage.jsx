import styled from "@emotion/styled";
import React from "react";

const Page = ({ children }) => {
  <PageItem>{children}</PageItem>;
};

const FullPage = ({ children }) => {
  return <Base>{children}</Base>;
};

const Base = styled.div`
  /* background-color: red; */
`;

const PageItem = styled.div`
  height: 100vh;
`;

export default FullPage;
