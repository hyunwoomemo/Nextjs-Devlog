import { POST_DATABASE_ID, TOKEN } from "@/config";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BreadCrumb = () => {
  const router = useRouter();

  return (
    <Base style={{ display: router.pathname === "/" ? "none" : "block" }}>
      <BreadCrumbWrapper>
        <BreadCrumbItem href="/">home</BreadCrumbItem>
        <BreadCrumbItem href={router.pathname}>{router.pathname.replace("/", "")}</BreadCrumbItem>
        <BreadCrumbItem href="/blog">{router.pathname.replace("/", "")}</BreadCrumbItem>
      </BreadCrumbWrapper>
    </Base>
  );
};

const Base = styled.div`
  padding: 2rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
`;

const BreadCrumbWrapper = styled.ul`
  display: flex;
  gap: 1rem;
`;

const BreadCrumbItem = styled(Link)`
  &:after {
    content: "/";
    margin-left: 1rem;
  }

  &:last-of-type:after {
    content: "";
  }
`;

export default BreadCrumb;
