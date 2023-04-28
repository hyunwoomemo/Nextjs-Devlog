import React, { useEffect } from "react";
import Portal from "../common/Portal";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import { useDispatch, useSelector } from "react-redux";
import { choiceCategory, choiceTag } from "@/slices/FilterSlice";

const Filter = ({ filter, posts }) => {
  const category = posts.map((v) => v.properties.category.select?.name).filter((v, i, arr) => arr.indexOf(v) === i);
  const tag = posts.map((post) => post.properties.tags.multi_select.map((v1) => v1.name)).flat();

  const dispatch = useDispatch();
  const { selectedCategory, selectedTag } = useSelector((state) => state.FilterSlice);
  // filter true 인 경우 body 스크롤 방지
  useEffect(() => {
    if (typeof window !== "object") return;

    if (filter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  return (
    <Portal selector="#portal">
      <Base filter={filter}>
        <Wrapper>
          <Title>Category</Title>
          <CategoryList data={category} posts={posts} />
          <Title>Tag</Title>
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
  bottom: -30px;
  z-index: 10;
  transition: all 0.3s;
  transform-origin: top;

  top: 90px;
  margin: 0 auto;
  background-color: var(--main-background);
  height: 100vh;
  overflow-y: scroll;

  ${({ filter }) =>
    filter
      ? css`
          transform: scale(1);
          pointer-events: all;
        `
      : css`
          transform: scale(0);
          pointer-events: none;
        `}
`;
const Wrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;

  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.div`
  padding: 1rem 0;
  font-size: 20px;
`;

export default Filter;
