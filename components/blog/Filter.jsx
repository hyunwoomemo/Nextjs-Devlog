import React, { useEffect } from "react";
import Portal from "../common/Portal";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import CategoryList from "./CategoryList";
import TagList from "./TagList";
import { useDispatch, useSelector } from "react-redux";
import { choiceCategory, choiceTag, close } from "@/slices/FilterSlice";
import { useRouter } from "next/router";

const Filter = ({ posts }) => {
  const router = useRouter();
  const category = posts.map((v) => v.properties.category.select?.name).filter((v, i, arr) => arr.indexOf(v) === i);

  const dispatch = useDispatch();
  const { selectedCategory, selectedTag, filterOpen } = useSelector((state) => state.FilterSlice);
  // filter true 인 경우 body 스크롤 방지
  useEffect(() => {
    if (typeof window !== "object") return;

    if (filterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  const handleSave = () => {
    selectedCategory && selectedTag
      ? router.push({
          pathname: "/blog/posts",
          query: {
            category: selectedCategory,
            tag: selectedTag,
          },
        })
      : selectedCategory
      ? router.push({
          pathname: "/blog/posts",
          query: {
            category: selectedCategory,
          },
        })
      : selectedTag
      ? router.push({
          pathname: "/blog/posts",
          query: {
            tag: selectedTag,
          },
        })
      : router.push({
          pathname: "/blog/posts",
        });
    dispatch(close());
  };

  useEffect(() => {
    return () => {
      dispatch(close());
    };
  }, []);

  return (
    <Portal selector="#portal">
      <Base filter={filterOpen}>
        <Wrapper>
          <CategoryList data={category} posts={posts} />
          <TagList posts={posts} />
        </Wrapper>
        <SaveBtn onClick={handleSave}>적용</SaveBtn>
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

  /* top: 65px; */
  margin: 0 auto;
  background-color: var(--main-background);
  height: 93vh;
  overflow-y: scroll;
  bottom: 0;

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
  max-width: 1100px;
  width: 100%;
  height: 100%;

  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SaveBtn = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 50px;
  height: 50px;
  font-size: 12px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--main-background);
`;

export default Filter;
