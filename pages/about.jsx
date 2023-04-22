import Layout from "@/components/Layout";
import styled from "@emotion/styled";
import React from "react";

const about = () => {
  return (
    <Layout>
      <Base>About</Base>
    </Layout>
  );
};

export default about;

const Base = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
