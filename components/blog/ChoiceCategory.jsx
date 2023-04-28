import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ChoiceCategory = ({ category }) => {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }

    window.addEventListener("scroll", () => {
      setScrollTop(document.documentElement.scrollTop);
    });
  }, []);
  const router = useRouter();

  return (
    <Base activeScroll={scrollTop > 5} show={router.pathname === "/blog/posts"}>
      <Wrapper>
        <Item href="/blog/posts/categories">
          카테고리 : <span>{category || "전체"}</span>
        </Item>
        <Item href="/blog/posts/tags">
          태그 : <span>{category || "전체"}</span>
        </Item>
      </Wrapper>
    </Base>
  );
};

const Base = styled.div`
  font-size: 14px;
  position: sticky;
  top: 61px;
  z-index: 2;
  background-color: var(--main-background);

  ${({ show }) =>
    show
      ? css``
      : css`
          display: none;
        `}

  @media (min-width: 769px) {
  }
`;

const Wrapper = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: end;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 6px 7px;
    font-size: 12px;
  }
`;

const Item = styled(Link)`
  border: 1px solid gray;
  padding: 10px 1rem;
  border-radius: 5px;
`;

export default ChoiceCategory;
