import styled from "@emotion/styled";
import Link from "next/link";
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

  return (
    <Base activeScroll={scrollTop > 5}>
      <Wrapper href="/blog/posts/categories">
        카테고리 ∣ <span>{category || "전체"}</span>
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
  padding: 1rem;

  @media (min-width: 769px) {
    padding: 2rem;
  }
`;

const Wrapper = styled(Link)`
  border: 1px solid gray;
  padding: 6px 7px;
  background-color: var(--choiceCategory-bgc);
  box-shadow: 0px 0px 3px gray;
  border-radius: 5px;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 6px 7px;
    font-size: 12px;
  }

  > span {
    color: var(--purple-color);
  }
`;

export default ChoiceCategory;
