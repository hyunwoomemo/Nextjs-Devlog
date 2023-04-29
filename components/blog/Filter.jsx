import React, { useEffect } from "react";
import Portal from "../common/Portal";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import { useDispatch, useSelector } from "react-redux";

const Filter = ({ posts }) => {
  const category = posts?.map((v) => v.properties.category.select?.name).filter((v, i, arr) => arr.indexOf(v) === i);

  const { filterOpen } = useSelector((state) => state.FilterSlice);
  // filter true 인 경우 body 스크롤 방지
  useEffect(() => {
    if (typeof window !== "object") return;

    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <Portal selector="#portal">
      <Base filter={filterOpen}>
        <Wrapper>
          <CategoryList data={category} posts={posts} />
          <hr />
          <TagList posts={posts} />
        </Wrapper>
      </Base>
    </Portal>
  );
};

const Base = styled.div`
  width: 100vw;
  backdrop-filter: blur(5px);
  position: absolute;
  z-index: 10;
  transition: all 0.3s;
  background-color: var(--main-background);
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  overflow-y: auto;
  height: calc(100vh - 80px);
  max-width: 1100px;

  ${({ filter }) =>
    filter
      ? css`
          opacity: 1;
          pointer-events: all;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;
const Wrapper = styled.div`
  position: relative;
  max-width: 1100px;
  width: 100%;
  height: 100%;

  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 1rem;

  > hr {
    width: 100%;
  }
`;

export default Filter;
